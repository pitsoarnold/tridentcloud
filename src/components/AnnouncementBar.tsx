import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { X } from "lucide-react";
import { useFoundingStatus as useStatus } from "@/lib/useFoundingStatus";

const dismissalKey = "fcp-bar-dismissed-until";
const dismissalDuration = 7 * 24 * 60 * 60 * 1000;

export function AnnouncementBar() {
  const { isActive, isFull, isLoading } = useStatus();
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    const dismissedUntil = Number(window.localStorage.getItem(dismissalKey));
    setDismissed(Number.isFinite(dismissedUntil) && Date.now() < dismissedUntil);
  }, []);

  const dismiss = () => {
    window.localStorage.setItem(dismissalKey, String(Date.now() + dismissalDuration));
    setDismissed(true);
  };

  if (isLoading || !isActive || isFull || dismissed) return null;

  return (
    <div className="founding-announcement">
      <div className="site-container founding-announcement-inner">
        <p className="founding-announcement-copy">
          🎉 Founding Client Programme — First 10 clients get special pricing.{" "}
          <Link to="/founding-clients">Learn more →</Link>
        </p>
        <button
          className="founding-announcement-dismiss"
          type="button"
          onClick={dismiss}
          aria-label="Dismiss announcement for 7 days"
        >
          <X aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
