"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { BarChart3, Compass, FileText, Lightbulb } from "lucide-react";
import { useState } from "react";
import { jobs } from "./data";
import { ApplicationStatus } from "./application-status";
import { DashboardHeader } from "./dashboard-header";
import { JobCard } from "./job-card";
import { MatchIndicator } from "./match-indicator";
import type { Job } from "./types";

export function ProductDashboard() {
  const [query, setQuery] = useState("");
  const [workplace, setWorkplace] = useState<"All" | "Remote" | "Hybrid">("All");
  const [selectedJob, setSelectedJob] = useState<Job>(jobs[0]);
  const [appliedJobIds, setAppliedJobIds] = useState<string[]>([]);
  const shouldReduceMotion = useReducedMotion();
  const filteredJobs = jobs.filter((job) => {
    const term = query.trim().toLowerCase();
    const matchesQuery = !term || [job.title, job.company, job.location, ...job.skills].join(" ").toLowerCase().includes(term);
    return matchesQuery && (workplace === "All" || job.workplace === workplace);
  });

  const applyToJob = (job: Job) => {
    setSelectedJob(job);
    setAppliedJobIds((applied) => applied.includes(job.id) ? applied : [...applied, job.id]);
  };

  return (
    <section className="overflow-hidden rounded-2xl border border-line bg-[#fbfbfc] shadow-[0_24px_70px_rgba(21,24,29,0.12)] sm:rounded-3xl" aria-label="Pathwise product dashboard preview">
      <DashboardHeader query={query} workplace={workplace} onQueryChange={setQuery} onWorkplaceChange={setWorkplace} />
      <div className="grid lg:grid-cols-[11rem_minmax(0,1fr)]">
        <aside className="hidden border-r border-line bg-white p-4 lg:block" aria-label="Dashboard navigation">
          <p className="px-2 pb-4 text-[10px] font-semibold tracking-[0.13em] text-muted uppercase">Workspace</p>
          <nav className="space-y-1 text-sm font-medium">
            <span className="flex items-center gap-2 rounded-lg bg-[#f1f4ff] px-2.5 py-2 text-accent"><Compass size={16} aria-hidden="true" />Discover</span>
            <span className="flex items-center gap-2 px-2.5 py-2 text-muted"><FileText size={16} aria-hidden="true" />Applications</span>
            <span className="flex items-center gap-2 px-2.5 py-2 text-muted"><BarChart3 size={16} aria-hidden="true" />Career map</span>
          </nav>
          <div className="mt-12 rounded-lg bg-ink p-3 text-white">
            <Lightbulb size={16} className="text-[#aebeff]" aria-hidden="true" />
            <p className="mt-3 text-xs font-semibold">Your next move</p>
            <p className="mt-1 text-[11px] leading-4 text-white/65">Focus your search on roles that expand your product scope.</p>
          </div>
        </aside>

        <div className="min-w-0 p-4 sm:p-6">
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold tracking-[0.12em] text-accent uppercase">Recommended for you</p>
              <h2 className="mt-1 text-xl font-semibold tracking-[-0.04em] text-ink sm:text-2xl">Work worth your attention</h2>
            </div>
            <p className="text-sm text-muted">Based on your goals and experience</p>
          </div>

          <div className="mt-5 grid gap-4 xl:grid-cols-[minmax(0,1fr)_18rem]">
            <div className="space-y-3">
              <AnimatePresence mode="popLayout">
                {filteredJobs.map((job) => (
                  <motion.div
                    key={job.id}
                    layout
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.18 }}
                  >
                    <JobCard job={job} isSelected={selectedJob.id === job.id} hasApplied={appliedJobIds.includes(job.id)} onSelect={setSelectedJob} onApply={applyToJob} />
                  </motion.div>
                ))}
              </AnimatePresence>
              {filteredJobs.length === 0 && <p className="rounded-xl border border-dashed border-line p-6 text-center text-sm text-muted">No roles match this search yet. Try a broader term.</p>}
            </div>
            <div className="space-y-4">
              <MatchIndicator job={selectedJob} />
              <ApplicationStatus />
              <aside className="rounded-xl bg-ink p-4 text-white sm:p-5" aria-labelledby="insight-heading">
                <p className="text-xs font-semibold tracking-[0.12em] text-white/55 uppercase">Career insight</p>
                <h3 id="insight-heading" className="mt-2 text-sm font-semibold">A focused search makes tradeoffs clearer.</h3>
                <p className="mt-2 text-sm leading-5 text-white/70">Compare each role against the work you want more of, not just the next title on your resume.</p>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
