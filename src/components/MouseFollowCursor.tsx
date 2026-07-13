// src/components/MouseFollowCursor.tsx
import { useEffect, useRef } from "react";

// Qué tan rápido "alcanza" cada círculo al mouse.
// Más alto = menos retraso. Más bajo = más retraso.
const SMALL_EASE = 0.98;
const LARGE_EASE = 0.4;

const cursorStyles = `
  .mouse-follow-dot {
    position: fixed;
    top: 0;
    left: 0;
    width: 10px;
    height: 10px;
    border-radius: 9999px;
    background: rgba(255, 255, 255, 0.65);
    pointer-events: none;
    z-index: 9999;
    opacity: 0;
    transition: opacity 300ms ease, width 200ms ease, height 200ms ease;
    will-change: transform;
  }
  .mouse-follow-ring {
    position: fixed;
    top: 0;
    left: 0;
    width: 32px;
    height: 32px;
    border-radius: 9999px;
    border: 1px solid rgba(255, 255, 255, 0.35);
    background: transparent;
    pointer-events: none;
    z-index: 9998;
    opacity: 0;
    transition: opacity 400ms ease, width 250ms ease, height 250ms ease;
    will-change: transform;
  }
  @media (pointer: coarse) {
    .mouse-follow-dot,
    .mouse-follow-ring {
      display: none;
    }
  }
`;

export function MouseFollowCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const target = useRef({ x: 0, y: 0 });
  const dotPos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>();
  const hasMoved = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;

      target.current.x = e.clientX;
      target.current.y = e.clientY;

      if (!hasMoved.current) {
        hasMoved.current = true;
        dotPos.current = { x: e.clientX, y: e.clientY };
        ringPos.current = { x: e.clientX, y: e.clientY };
      }

      if (dotRef.current) dotRef.current.style.opacity = "1";
      if (ringRef.current) ringRef.current.style.opacity = "1";
    };

    const handleLeave = () => {
      if (dotRef.current) dotRef.current.style.opacity = "0";
      if (ringRef.current) ringRef.current.style.opacity = "0";
    };

    const animate = () => {
      dotPos.current.x += (target.current.x - dotPos.current.x) * SMALL_EASE;
      dotPos.current.y += (target.current.y - dotPos.current.y) * SMALL_EASE;
      ringPos.current.x += (target.current.x - ringPos.current.x) * LARGE_EASE;
      ringPos.current.y += (target.current.y - ringPos.current.y) * LARGE_EASE;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotPos.current.x}px, ${dotPos.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    window.addEventListener("pointermove", handleMove);
    document.addEventListener("mouseleave", handleLeave);
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="mouse-follow-dot" aria-hidden="true" />
      <div ref={ringRef} className="mouse-follow-ring" aria-hidden="true" />
      <style>{cursorStyles}</style>
    </>
  );
}
