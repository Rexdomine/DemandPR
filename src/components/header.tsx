"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { navigation, site } from "@/content/site";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    if (!isOpen) {
      if (wasOpenRef.current) toggleRef.current?.focus();
      wasOpenRef.current = false;
      return;
    }

    wasOpenRef.current = true;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>("button, a[href]"),
      );
      const first = focusable[0];
      const last = focusable.at(-1);
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const close = () => setIsOpen(false);

  return (
    <>
      <header className="site-header">
        <div className="shell header-inner">
          <Link className="brand" href="/" aria-label="Demand PR home">
            <Image
              className="brand-logo"
              src="/brand/demandpr-logo.svg"
              width="1296"
              height="388"
              alt=""
              priority
              unoptimized
            />
          </Link>

          <nav className="desktop-nav" aria-label="Primary navigation">
            {navigation.map((item) => (
              <Link href={item.href} key={item.label}>
                {item.label}
              </Link>
            ))}
          </nav>
          <Link
            className="button button-small header-cta"
            href={site.headerCta.href}
          >
            {site.headerCta.label}
          </Link>

          <button
            ref={toggleRef}
            className="menu-toggle"
            type="button"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label="Open navigation"
            onClick={() => setIsOpen(true)}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
      </header>

      {isOpen ? (
        <div
          className="mobile-menu"
          id="mobile-menu"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
        >
          <div className="mobile-menu-top">
            <span className="eyebrow">Navigate</span>
            <button
              ref={closeRef}
              className="menu-close"
              type="button"
              aria-label="Close navigation"
              onClick={close}
            >
              ×
            </button>
          </div>
          <nav aria-label="Mobile navigation">
            {navigation.map((item, index) => (
              <Link href={item.href} key={item.label} onClick={close}>
                <span aria-hidden="true">0{index + 1}</span>
                {item.label}
              </Link>
            ))}
          </nav>
          <Link className="button" href={site.headerCta.href} onClick={close}>
            {site.headerCta.label}
          </Link>
        </div>
      ) : null}
    </>
  );
}
