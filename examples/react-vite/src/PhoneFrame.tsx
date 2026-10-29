import type { ReactNode } from "react";

export function PhoneFrame({
  children,
  fullScreen = false,
}: {
  children: ReactNode;
  fullScreen?: boolean;
}) {
  return (
    <div className={`phoneFrame${fullScreen ? " phoneFrameRecording" : ""}`}>
      <span className="phoneButton phoneAction" aria-hidden="true" />
      <span className="phoneButton phoneVolumeUp" aria-hidden="true" />
      <span className="phoneButton phoneVolumeDown" aria-hidden="true" />
      <span className="phoneButton phonePower" aria-hidden="true" />
      <div className="phoneScreen">
        {!fullScreen && (
          <div className="phoneStatusBar" aria-hidden="true">
            <span className="phoneTime">9:41</span>
            <span className="dynamicIsland" />
            <span className="phoneStatusIcons">
              <svg viewBox="0 0 18 12" width="17" height="11">
                <rect x="0" y="8" width="3" height="4" rx="1" />
                <rect x="5" y="5.5" width="3" height="6.5" rx="1" />
                <rect x="10" y="3" width="3" height="9" rx="1" />
                <rect x="15" y="0" width="3" height="12" rx="1" />
              </svg>
              <svg viewBox="0 0 16 12" width="15" height="11">
                <path d="M8 2.2c2.3 0 4.4.9 6 2.4l1.3-1.4A10.5 10.5 0 0 0 8 .2 10.5 10.5 0 0 0 .7 3.2L2 4.6a8.6 8.6 0 0 1 6-2.4Zm0 3.9c1.3 0 2.5.5 3.4 1.3l1.3-1.4A6.8 6.8 0 0 0 8 4.1 6.8 6.8 0 0 0 3.3 6l1.3 1.4C5.5 6.6 6.7 6.1 8 6.1Zm0 3.8c.4 0 .8.2 1.1.4L8 11.6l-1.1-1.3c.3-.2.7-.4 1.1-.4Z" />
              </svg>
              <span className="phoneBattery">
                <span />
              </span>
            </span>
          </div>
        )}
        {children}
        {!fullScreen && <span className="homeIndicator" aria-hidden="true" />}
      </div>
    </div>
  );
}
