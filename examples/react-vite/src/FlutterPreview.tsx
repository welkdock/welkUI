import { useEffect, useRef, useState } from "react";
import { WelkButton } from "@welkui/react";
import { flutterPreviewUrl, getPreviewUrl } from "./flutterWidgets";
import { PhoneFrame } from "./PhoneFrame";

export function FlutterPreview({
  name,
  previewRoute,
  baseUrl = flutterPreviewUrl,
}: {
  name: string;
  previewRoute: string;
  baseUrl?: string;
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "ready">("idle");
  const viewport = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const src = baseUrl ? getPreviewUrl(baseUrl, previewRoute) : null;

  useEffect(() => {
    const element = viewport.current;
    if (!element) return;
    const resize = () => {
      const width = element.getBoundingClientRect().width;
      if (width > 0) setScale(width / 390);
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flutterPreview">
      <PhoneFrame>
        <div
          ref={viewport}
          className="phoneViewport"
          aria-busy={status === "loading"}
        >
          {!src ? (
            <p className="phoneMessage">
              Live mobile preview coming soon. The example app has not been
              deployed yet.
            </p>
          ) : status === "idle" ? (
            <div className="phoneMessage">
              <WelkButton onClick={() => setStatus("loading")}>
                ▶ Run live preview
              </WelkButton>
              <p className="finePrint">
                Loads the Flutter example app (a few MB) only when you click.
              </p>
            </div>
          ) : (
            <>
              {status === "loading" && (
                <p className="phoneMessage phoneLoading" role="status">
                  Starting the Flutter preview...
                </p>
              )}
              <iframe
                style={{
                  width: 390,
                  height: `${100 / scale}%`,
                  transform: `scale(${scale})`,
                  transformOrigin: "top left",
                }}
                src={src}
                title={`${name} live mobile preview`}
                sandbox="allow-scripts allow-same-origin"
                referrerPolicy="strict-origin-when-cross-origin"
                onLoad={() => setStatus("ready")}
              />
            </>
          )}
        </div>
      </PhoneFrame>
      <p className="finePrint">
        Live preview (390px viewport, scaled to fit). Native Android and iOS
        rendering, scrolling and haptics can differ slightly.
        {src && (
          <>
            {" "}
            <a href={src} target="_blank" rel="noreferrer">
              Open preview in a new tab
            </a>
            .
          </>
        )}
      </p>
    </div>
  );
}
