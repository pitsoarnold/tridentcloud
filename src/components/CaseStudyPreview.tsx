import { useState } from "react";

interface Props {
  url: string;
  title: string;
}

export function CaseStudyPreview({ url, title }: Props) {
  const [loaded, setLoaded] = useState(false);
  
  // Clean the URL and force HTTPS to prevent mixed-content blocks
  const cleanUrl = url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  const secureUrl = `https://${cleanUrl}`;

  return (
    <div className="rounded-xl overflow-hidden border border-neutral-800 bg-neutral-950 shadow-2xl">
      <div className="flex items-center gap-2 px-4 py-2.5 bg-neutral-900 border-b border-neutral-800">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/80" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <span className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <div className="flex-1 mx-4 px-3 py-1 rounded-md bg-neutral-800 text-[11px] text-neutral-400 font-mono truncate">
          {cleanUrl}
        </div>
        <a
          href={secureUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] text-neutral-500 hover:text-white transition-colors"
        >
          Open ↗
        </a>
      </div>
      <div className="relative aspect-[16/10] bg-neutral-950">
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center text-xs text-neutral-500">
            Loading live preview…
          </div>
        )}
        <iframe
          src={secureUrl}
          title={title}
          className="w-full h-full border-0"
          loading="lazy"
          onLoad={() => setLoaded(true)}
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        />
      </div>
    </div>
  );
}