import { useState } from "react";

export function WhatsAppButton() {
  const [hovering, setHovering] = useState(false);

  return (
    <a
      href="https://wa.me/56994101429"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className={`wa-btn ${hovering ? "wa-btn--pop" : "wa-btn--unpop"}`}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <svg className="wa-btn__ring" viewBox="0 0 200 200" aria-hidden="true">
        <defs>
          <path
            id="wa-circle"
            d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0"
          />
        </defs>
        <text
          fill="#ffffff"
          style={{
            fontFamily: "ui-sans-serif, system-ui, sans-serif",
            fontSize: "16px",
            fontWeight: 700,
            letterSpacing: "3px",
          }}
        >
          <textPath href="#wa-circle" startOffset="0">
            CONTACTAR • CONTACTAR • CONTACTAR • CONTACTAR •
          </textPath>
        </text>
      </svg>

      <span
        className={`wa-btn__circle ${hovering ? "wa-btn__circle--pop" : "wa-btn__circle--unpop"}`}
        aria-hidden="true"
      />

      <span
        className={`wa-btn__icon ${hovering ? "wa-btn__icon--pop" : "wa-btn__icon--unpop"}`}
        aria-hidden="true"
      >
        <svg viewBox="0 0 32 32" width="32" height="32" fill="currentColor">
          <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.78 1.23 1.82 2.506 3.41 4.554 4.34.616.287 2.035.976 2.722.976.616 0 1.9-.53 2.15-1.19.244-.658.244-1.216.173-1.332-.058-.115-.244-.187-.53-.33ZM16.078 24.264a8.244 8.244 0 0 1-4.24-1.174l-.302-.187-3.16.82.842-3.078-.2-.315a8.11 8.11 0 0 1-1.246-4.354c0-4.484 3.665-8.135 8.15-8.135 4.484 0 8.135 3.65 8.135 8.135 0 4.484-3.65 8.135-8.135 8.135l-.043-.01Zm6.917-15.052a9.786 9.786 0 0 0-6.917-2.865c-5.4 0-9.782 4.383-9.782 9.767 0 1.734.458 3.42 1.318 4.898L6.5 25.5l4.598-1.204a9.836 9.836 0 0 0 4.68 1.194h.014c5.386 0 9.767-4.382 9.767-9.782a9.702 9.702 0 0 0-2.865-6.917Z" />
        </svg>
      </span>
    </a>
  );
}
