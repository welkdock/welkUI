import { useState, useSyncExternalStore } from "react";
import { WelkBadge } from "@welkui/react";
import { PhoneFrame } from "./PhoneFrame";
import buttonRecording from "../../../assets/videos/flutter/WelkButton.web.mp4";
import drawerRecording from "../../../assets/videos/flutter/WelkDrawer.web.mp4";
import accordionRecording from "../../../assets/videos/flutter/WelkAccordion.web.mp4";

const recordings = [
  {
    name: "WelkButton",
    badge: "01 / ACTION",
    variant: "default",
    title: "A button worth pressing",
    description:
      "Bold outlines, satisfying presses and a color for every action. Watch the button variants, sizes and states come to life in the Flutter app.",
    src: buttonRecording,
  },
  {
    name: "WelkDrawer",
    badge: "02 / REVEAL",
    variant: "info",
    title: "Make an entrance",
    description:
      "Give navigation and extra content their own moment. See the comic-styled drawer slide into the app without taking you out of the story.",
    src: drawerRecording,
  },
  {
    name: "WelkAccordion",
    badge: "03 / DISCOVER",
    variant: "success",
    title: "A little more to the story",
    description:
      "Keep the first chapter short and let people explore the rest. Watch expandable panels reveal more, one tap at a time.",
    src: accordionRecording,
  },
] as const;

function subscribeToMotion(onChange: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function Recording({ name, src }: { name: string; src: string }) {
  const reducedMotion = useSyncExternalStore(
    subscribeToMotion,
    prefersReducedMotion,
    () => true,
  );
  const [failed, setFailed] = useState(false);

  return (
    <PhoneFrame fullScreen>
      {failed ? (
        <p className="phoneMessage" role="alert">
          This recording could not be loaded.{" "}
          <a href={`/flutter/components/${name}/`}>
            Try the {name} live preview
          </a>
          .
        </p>
      ) : (
        <video
          key={reducedMotion ? "manual" : "autoplay"}
          aria-label={`${name} app screen recording`}
          src={src}
          autoPlay={!reducedMotion}
          loop
          muted
          playsInline
          controls
          preload="metadata"
          onError={() => setFailed(true)}
        >
          Your browser does not support embedded video.{" "}
          <a href={src}>Download the {name} recording</a>.
        </video>
      )}
    </PhoneFrame>
  );
}

export function FlutterRecordings() {
  return (
    <div className="flutterRecordings">
      {recordings.map((recording) => (
        <article className="flutterRecording" key={recording.name}>
          <div className="flutterRecordingDevice">
            <Recording name={recording.name} src={recording.src} />
          </div>
          <div className="flutterRecordingCopy">
            <WelkBadge variant={recording.variant}>{recording.badge}</WelkBadge>
            <h3>{recording.title}</h3>
            <p>{recording.description}</p>
            <a href={`/flutter/components/${recording.name}/`}>
              Explore {recording.name}
            </a>
            <p className="finePrint">
              Recorded in the Flutter app. Use the video controls to pause or
              replay.
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
