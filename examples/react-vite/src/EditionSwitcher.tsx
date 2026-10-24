import { useEffect, useRef } from "react";
import { editions, editionPath, type Edition } from "./editions";
import { navigate } from "./router";

export function EditionSwitcher({
  edition,
  path,
}: {
  edition: Edition;
  path: string;
}) {
  const ref = useRef<HTMLDetailsElement>(null);
  const selected = editions[edition];

  useEffect(() => {
    const closeOutside = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !ref.current?.contains(event.target)
      ) {
        ref.current?.removeAttribute("open");
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (
        event.key === "Escape" &&
        event.target instanceof Node &&
        ref.current?.contains(event.target)
      ) {
        ref.current.removeAttribute("open");
        ref.current.querySelector("summary")?.focus();
      }
    };
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  return (
    <details
      className="editionSwitcher"
      ref={ref}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          event.currentTarget.removeAttribute("open");
        }
      }}
    >
      <summary aria-label={`Choose edition: ${selected.label}`}>
        <img src={selected.icon} alt="" width={24} height={24} />
        {selected.label}
        <span className="editionChevron" aria-hidden="true" />
      </summary>
      <div className="editionOptions" role="group" aria-label="Website edition">
        {(["flutter", "react"] as const).map((key) => (
          <button
            key={key}
            type="button"
            aria-pressed={edition === key}
            onClick={() => {
              ref.current?.removeAttribute("open");
              navigate(editionPath(path, key));
            }}
          >
            <img src={editions[key].icon} alt="" width={24} height={24} />
            {editions[key].label}
          </button>
        ))}
      </div>
    </details>
  );
}
