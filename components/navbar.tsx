"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

const navigation = [
  { label: "Product", href: "#product" },
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
];

const mobileMenuId = "primary-mobile-navigation";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const updateScrollState = () => setHasScrolled(window.scrollY > 8);

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 768px)");
    const closeOnDesktop = () => {
      if (desktopQuery.matches) setIsMenuOpen(false);
    };

    desktopQuery.addEventListener("change", closeOnDesktop);
    return () => desktopQuery.removeEventListener("change", closeOnDesktop);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);
  const transition = shouldReduceMotion ? { duration: 0 } : { duration: 0.18, ease: "easeOut" as const };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-200",
        hasScrolled ? "border-line/90 bg-white/90 backdrop-blur-md" : "border-transparent bg-white/80",
      )}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
        <Link href="/" className="text-xl font-semibold tracking-[-0.05em] text-ink" aria-label="Pathwise home">
          pathwise<span className="text-accent">.</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
          {navigation.map((item) => (
            <a key={item.href} href={item.href} className="text-sm font-medium text-muted transition-colors hover:text-ink">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <a
            href="#get-started"
            className="inline-flex h-10 items-center justify-center rounded-lg bg-ink px-4 text-sm font-semibold text-white transition-colors hover:bg-ink/85"
          >
            Start exploring
          </a>
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-lg text-ink transition-colors hover:bg-ink/5 md:hidden"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
          aria-controls={mobileMenuId}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id={mobileMenuId}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={transition}
            className="border-t border-line bg-white md:hidden"
          >
            <nav className="mx-auto flex max-w-7xl flex-col px-5 py-5 sm:px-8" aria-label="Mobile navigation">
              {navigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className="border-b border-line py-4 text-base font-medium text-ink"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#get-started"
                onClick={closeMenu}
                className="mt-5 inline-flex h-11 items-center justify-center rounded-lg bg-ink px-4 text-sm font-semibold text-white"
              >
                Start exploring
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
