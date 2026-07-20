import { useEffect } from "react";

// Wraps children of `.paint-hover` elements into per-character spans and
// paints characters near the cursor with a contrasting theme color.
// Base orange → paints black, otherwise → paints orange.
export function PaintHover() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const ORANGE = "#0a0a0a";
    const DARK = "#0F0F10";
    type Item = { el: HTMLElement; alt: string };
    let items: Item[] = [];

    const rgbToHex = (rgb: string) => {
      const m = rgb.match(/\d+/g);
      if (!m) return "";
      return "#" + m.slice(0, 3).map((n) => Number(n).toString(16).padStart(2, "0")).join("");
    };

    function scan() {
      const targets = Array.from(document.querySelectorAll<HTMLElement>(".paint-hover"));
      const next: Item[] = [];
      for (const t of targets) {
        if (!t.dataset.paintReady) {
          const walker = document.createTreeWalker(t, NodeFilter.SHOW_TEXT);
          const texts: Text[] = [];
          let n: Node | null;
          while ((n = walker.nextNode())) texts.push(n as Text);
          for (const tn of texts) {
            if (!tn.data.trim()) continue;
            const parent = tn.parentElement;
            if (!parent) continue;
            const frag = document.createDocumentFragment();
            for (const c of tn.data) {
              if (c === " " || c === "\n" || c === "\t") {
                frag.appendChild(document.createTextNode(c));
                continue;
              }
              const s = document.createElement("span");
              s.textContent = c;
              s.setAttribute("data-paint-char", "");
              s.style.transition = "color 320ms cubic-bezier(0.22,1,0.36,1)";
              frag.appendChild(s);
            }
            parent.replaceChild(frag, tn);
          }
          t.dataset.paintReady = "1";
        }
        // Compute alt color PER character from its own inherited color.
        t.querySelectorAll<HTMLElement>("[data-paint-char]").forEach((el) => {
          const parentEl = el.parentElement;
          if (!parentEl) return;
          const baseHex = rgbToHex(getComputedStyle(parentEl).color).toLowerCase();
          if (!baseHex) return;
          const r = parseInt(baseHex.slice(1, 3), 16);
          const g = parseInt(baseHex.slice(3, 5), 16);
          const b = parseInt(baseHex.slice(5, 7), 16);
          const isOrange = Math.abs(r - 0xd9) < 35 && Math.abs(g - 0x77) < 35 && Math.abs(b - 0x57) < 35;
          const alt = isOrange ? DARK : ORANGE;
          next.push({ el, alt });
        });
      }
      items = next;
    }

    scan();
    const mo = new MutationObserver(() => { scan(); });
    mo.observe(document.body, { childList: true, subtree: true });

    let raf = 0;
    let mx = -9999, my = -9999;
    const R = 70;
    const R2 = R * R;
    function update() {
      raf = 0;
      for (const it of items) {
        const r = it.el.getBoundingClientRect();
        const dx = r.left + r.width / 2 - mx;
        const dy = r.top + r.height / 2 - my;
        it.el.style.color = dx * dx + dy * dy < R2 ? it.alt : "";
      }
    }
    function onMove(e: PointerEvent) {
      mx = e.clientX; my = e.clientY;
      if (!raf) raf = requestAnimationFrame(update);
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      mo.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return null;
}
