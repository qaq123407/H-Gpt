import { useEffect, useState } from "react";

export function useStreamingText(text: string, active: boolean, onDone: () => void) {
  const [displayed, setDisplayed] = useState(active ? "" : text);

  useEffect(() => {
    if (!active) {
      setDisplayed(text);
      return;
    }

    setDisplayed("");
    let index = 0;
    const timer = window.setInterval(() => {
      index += 3;
      setDisplayed(text.slice(0, index));

      if (index >= text.length) {
        window.clearInterval(timer);
        onDone();
      }
    }, 24);

    return () => window.clearInterval(timer);
  }, [active, onDone, text]);

  return displayed;
}
