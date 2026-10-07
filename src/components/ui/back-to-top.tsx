"use client";

import { Icon } from "./icon";

export function BackToTop() {
  return (
    <a
      className="footer-top"
      href="#top"
      onClick={(event) => {
        if (event.detail !== 0) return;
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: "instant" });
        window.history.replaceState(window.history.state, "", "#top");
        document
          .querySelector<HTMLAnchorElement>(".site-header a")
          ?.focus({ preventScroll: true });
      }}
    >
      <span>Back to top</span>
      <span className="footer-top-icon">
        <Icon name="up" />
      </span>
    </a>
  );
}
