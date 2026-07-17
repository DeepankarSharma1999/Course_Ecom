"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const LiveChatWidget = dynamic(() => import("@/components/live-chat-widget").then((m) => m.LiveChatWidget), { ssr: false });
const ExitIntentPopup = dynamic(() => import("@/components/exit-intent-popup").then((m) => m.ExitIntentPopup), { ssr: false });

// FIX-10/12: engagement widgets (chat + exit-intent) mount after the browser
// goes idle, keeping their JS (incl. framer-motion) out of the critical path.
export function DeferredWidgets() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const w = window as Window & { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number; cancelIdleCallback?: (id: number) => void };
    const start = () => setReady(true);
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(start, { timeout: 4000 });
      return () => w.cancelIdleCallback?.(id);
    }
    const t = window.setTimeout(start, 3000);
    return () => window.clearTimeout(t);
  }, []);

  if (!ready) return null;
  return (
    <>
      <ExitIntentPopup />
      <LiveChatWidget />
    </>
  );
}
