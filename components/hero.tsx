"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronRight, Sparkles } from "lucide-react";
import { ProductDashboard } from "@/components/product-dashboard/product-dashboard";

const entrance = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const transition = shouldReduceMotion ? { duration: 0 } : { duration: 0.5, ease: "easeOut" as const };

  return (
    <section className="overflow-hidden bg-[radial-gradient(circle_at_50%_0%,#f1f4ff_0%,#ffffff_44rem)] pt-28 sm:pt-36" aria-labelledby="hero-heading">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: shouldReduceMotion ? 0 : 0.09 }}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.p
            variants={entrance}
            transition={transition}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-white/80 px-3 py-1.5 text-xs font-semibold tracking-[0.12em] text-muted uppercase shadow-[0_1px_2px_rgba(21,24,29,0.04)]"
          >
            <Sparkles size={14} className="text-accent" aria-hidden="true" />
            AI-powered career intelligence
          </motion.p>
          <motion.h1
            id="hero-heading"
            variants={entrance}
            transition={transition}
            className="mt-6 text-balance text-5xl font-semibold tracking-[-0.065em] text-ink sm:text-6xl lg:text-7xl"
          >
            Find the work that fits. Move toward it faster.
          </motion.h1>
          <motion.p variants={entrance} transition={transition} className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-7 text-muted sm:text-lg">
            Pathwise turns your experience, goals, and preferences into a clear view of the roles worth pursuing and the next best step to take.
          </motion.p>
          <motion.div variants={entrance} transition={transition} className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href="#product"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-ink px-5 text-sm font-semibold text-white transition-colors hover:bg-ink/85"
            >
              Start exploring jobs
              <ArrowRight size={17} aria-hidden="true" />
            </a>
            <a
              href="#how-it-works"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-line bg-white px-5 text-sm font-semibold text-ink transition-colors hover:border-ink/25 hover:bg-ink/[0.02]"
            >
              See how it works
              <ChevronRight size={17} aria-hidden="true" />
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          id="product"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.34, duration: 0.65, ease: "easeOut" }}
          className="relative mx-auto mt-14 max-w-6xl scroll-mt-28 sm:mt-20"
        >
          <div className="absolute inset-x-[12%] -top-8 -z-10 h-32 rounded-full bg-accent/10 blur-3xl" aria-hidden="true" />
          <ProductDashboard />
        </motion.div>
      </div>
    </section>
  );
}
