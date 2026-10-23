import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Contributors } from "../../examples/react-vite/src/Contributors";

const contributor = (id: number, contributions: number) => ({
  id,
  login: `hero-${id}`,
  avatar_url: `https://avatars.githubusercontent.com/u/${id}`,
  contributions,
});
const response = (data: unknown, headers?: HeadersInit) =>
  new Response(JSON.stringify(data), { headers });

afterEach(() => vi.unstubAllGlobals());

describe("Live contributors", () => {
  it("loads all pages, ranks the top three and shows the rest as small avatars", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(
        response([contributor(1, 2), contributor(2, 30), contributor(3, 10)], {
          Link: '<https://api.github.com/repos/welkdock/welkUI/contributors?per_page=100&page=2>; rel="next"',
        }),
      )
      .mockResolvedValueOnce(response([contributor(4, 20), contributor(5, 1)]));
    vi.stubGlobal("fetch", fetchMock);
    render(<Contributors />);
    expect(screen.getByRole("status")).toHaveTextContent("Loading");
    const top = await screen.findByRole("list", { name: "Top contributors" });
    expect(
      within(top)
        .getAllByRole("link")
        .map((link) => link.textContent),
    ).toEqual(["hero-2", "hero-4", "hero-3"]);
    expect(within(top).getAllByRole("img")[0].className).toContain("lg");
    const rest = screen.getByRole("list", { name: "More contributors" });
    expect(within(rest).getAllByRole("link")).toHaveLength(2);
    expect(
      within(rest).getByRole("link", { name: "hero-1: 2 contributions" }),
    ).toHaveAttribute("href", "https://github.com/hero-1");
    expect(within(rest).getAllByRole("img")[0].className).toContain("sm");
    expect(fetchMock.mock.calls[1][0]).toContain("page=2");
  });

  it("shows rate limits explicitly and allows retrying", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(new Response(null, { status: 403 }))
      .mockResolvedValueOnce(response([contributor(1, 1)]));
    vi.stubGlobal("fetch", fetchMock);
    render(<Contributors />);
    expect(await screen.findByRole("alert")).toHaveTextContent(
      "limiting requests",
    );
    fireEvent.click(screen.getByRole("button", { name: "Try again" }));
    expect(await screen.findByRole("link", { name: "hero-1" })).toBeVisible();
    expect(screen.getByText("1 repository contribution")).toBeVisible();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it.each([response([]), new Response(null, { status: 204 })])(
    "shows an empty state without placeholder contributors",
    async (result) => {
      vi.stubGlobal("fetch", vi.fn().mockResolvedValue(result));
      render(<Contributors />);
      expect(
        await screen.findByText(/No contributors have been listed/),
      ).toBeVisible();
      expect(screen.queryByRole("list")).not.toBeInTheDocument();
    },
  );

  it.each([
    () => Promise.reject(new TypeError("Failed to fetch")),
    () => Promise.resolve(response([{ login: "invalid" }])),
    () => Promise.resolve(new Response(null, { status: 500 })),
  ])("shows request and invalid-response failures", async (result) => {
    vi.stubGlobal("fetch", vi.fn().mockImplementation(result));
    render(<Contributors />);
    expect(await screen.findByRole("alert")).not.toBeEmptyDOMElement();
    expect(screen.getByRole("button", { name: "Try again" })).toBeVisible();
  });

  it("aborts pending requests on unmount", async () => {
    let signal: AbortSignal | undefined;
    vi.stubGlobal(
      "fetch",
      vi.fn((_url: string, options: RequestInit) => {
        signal = options.signal ?? undefined;
        return new Promise<Response>(() => {});
      }),
    );
    const view = render(<Contributors />);
    await act(async () => view.unmount());
    expect(signal?.aborted).toBe(true);
  });
});
