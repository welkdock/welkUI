import { useEffect, useState } from "react";
import { WelkAvatar, WelkBadge, WelkButton, WelkDivider } from "@welkui/react";
import { repository } from "./siteContent";

interface Contributor {
  id: number;
  login: string;
  avatar_url: string;
  contributions: number;
}

function isContributor(value: unknown): value is Contributor {
  if (typeof value !== "object" || value === null) return false;
  return (
    "id" in value &&
    typeof value.id === "number" &&
    "login" in value &&
    typeof value.login === "string" &&
    /^[a-z\d](?:[a-z\d-]*[a-z\d])?(?:\[bot\])?$/i.test(value.login) &&
    "avatar_url" in value &&
    typeof value.avatar_url === "string" &&
    value.avatar_url.startsWith("https://avatars.githubusercontent.com/") &&
    "contributions" in value &&
    typeof value.contributions === "number" &&
    Number.isSafeInteger(value.contributions) &&
    value.contributions >= 0
  );
}

async function loadContributors(signal: AbortSignal): Promise<Contributor[]> {
  const contributors = new Map<number, Contributor>();
  let page = 1;
  let hasNextPage = true;
  while (hasNextPage) {
    const response = await fetch(
      `https://api.github.com/repos/welkdock/welkUI/contributors?per_page=100&page=${page}`,
      { signal, headers: { Accept: "application/vnd.github+json" } },
    );
    if (!response.ok) {
      throw new Error(
        response.status === 403 || response.status === 429
          ? "GitHub is limiting requests. Please try again later."
          : "GitHub contributors could not be loaded. Please try again.",
      );
    }
    if (response.status === 204) break;
    const data: unknown = await response.json();
    if (!Array.isArray(data) || !data.every(isContributor)) {
      throw new Error("GitHub returned an unexpected contributors response.");
    }
    for (const contributor of data) {
      contributors.set(contributor.id, contributor);
    }
    hasNextPage = /rel="next"/.test(response.headers.get("Link") ?? "");
    page += 1;
  }
  return [...contributors.values()].sort(
    (a, b) =>
      b.contributions - a.contributions || a.login.localeCompare(b.login),
  );
}

type ContributorState =
  | { status: "loading" }
  | { status: "success"; contributors: Contributor[] }
  | { status: "error"; message: string };

export function Contributors() {
  const [state, setState] = useState<ContributorState>({ status: "loading" });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    loadContributors(controller.signal).then(
      (contributors) => {
        if (!controller.signal.aborted) {
          setState({ status: "success", contributors });
        }
      },
      (error: unknown) => {
        if (!controller.signal.aborted) {
          setState({
            status: "error",
            message:
              error instanceof Error
                ? error.message
                : "GitHub contributors could not be loaded. Please try again.",
          });
        }
      },
    );
    return () => controller.abort();
  }, [attempt]);

  return (
    <section className="section">
      <WelkBadge variant="success">BUILT TOGETHER</WelkBadge>
      <h1>The people behind the panels.</h1>
      <p>Thank you to the contributors shaping WelkUI.</p>
      {state.status === "loading" && (
        <p role="status">Loading contributors from GitHub...</p>
      )}
      {state.status === "error" && (
        <div>
          <p role="alert">{state.message}</p>
          <WelkButton
            onClick={() => {
              setState({ status: "loading" });
              setAttempt((current) => current + 1);
            }}
          >
            Try again
          </WelkButton>
        </div>
      )}
      {state.status === "success" && (
        <>
          {state.contributors.length === 0 ? (
            <p role="status">No contributors have been listed on GitHub yet.</p>
          ) : (
            <>
              <h2>Top contributors</h2>
              <ol className="topContributors" aria-label="Top contributors">
                {state.contributors.slice(0, 3).map((contributor, index) => (
                  <li key={contributor.id} className="surface contributor">
                    <WelkAvatar
                      alt={contributor.login}
                      src={contributor.avatar_url}
                      size="lg"
                    />
                    <div>
                      <WelkBadge size="sm">#{index + 1}</WelkBadge>
                      <h3>
                        <a href={`https://github.com/${contributor.login}`}>
                          {contributor.login}
                        </a>
                      </h3>
                      <p>
                        {contributor.contributions.toLocaleString()} repository{" "}
                        {contributor.contributions === 1
                          ? "contribution"
                          : "contributions"}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
              {state.contributors.length > 3 && (
                <>
                  <h2>And the rest of our crew</h2>
                  <ul
                    className="contributorAvatars"
                    aria-label="More contributors"
                  >
                    {state.contributors.slice(3).map((contributor) => (
                      <li key={contributor.id}>
                        <a
                          href={`https://github.com/${contributor.login}`}
                          aria-label={`${contributor.login}: ${contributor.contributions.toLocaleString()} contributions`}
                          title={`${contributor.login} · ${contributor.contributions.toLocaleString()} contributions`}
                        >
                          <WelkAvatar
                            alt={contributor.login}
                            src={contributor.avatar_url}
                            size="sm"
                            growOnHover
                          />
                        </a>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </>
          )}
        </>
      )}
      <p className="finePrint">
        Loaded live from GitHub and ranked by repository contributions. GitHub
        may cache these counts.{" "}
        <a href={`${repository}/graphs/contributors`}>
          View contributors on GitHub
        </a>
        .
      </p>
      <WelkDivider />
      <h2>Want to join the story?</h2>
      <p>
        Report an issue, suggest a component, or send a pull request. Small
        improvements count.
      </p>
      <p>
        <a href={`${repository}/blob/main/CONTRIBUTING.md`}>
          Read the contribution guide
        </a>{" "}
        / <a href={`${repository}/issues`}>Browse issues</a>
      </p>
    </section>
  );
}
