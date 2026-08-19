"use client";

import { ArrowUpRight, Bookmark, Check, MapPin } from "lucide-react";
import type { Job } from "./types";

type JobCardProps = {
  job: Job;
  isSelected: boolean;
  hasApplied: boolean;
  onSelect: (job: Job) => void;
  onApply: (job: Job) => void;
};

export function JobCard({ job, isSelected, hasApplied, onSelect, onApply }: JobCardProps) {
  return (
    <article className={`group rounded-xl border bg-white p-4 transition-all duration-200 ${isSelected ? "border-accent shadow-[0_10px_24px_rgba(59,91,219,0.12)]" : "border-line hover:-translate-y-0.5 hover:border-[#cdd4e0] hover:shadow-[0_8px_20px_rgba(21,24,29,0.07)]"}`}>
      <button type="button" onClick={() => onSelect(job)} className="block w-full text-left" aria-pressed={isSelected}>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-base font-semibold tracking-[-0.025em] text-ink">{job.title}</h3>
            <p className="mt-1 text-sm text-muted">{job.company}</p>
          </div>
          <span className="shrink-0 rounded-full bg-[#eef7f0] px-2 py-1 text-xs font-semibold text-[#307044]">{job.match}% match</span>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs font-medium text-muted">
          <span className="inline-flex items-center gap-1"><MapPin size={14} aria-hidden="true" />{job.location}</span>
          <span>{job.workplace}</span>
          <span>{job.type}</span>
        </div>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {job.skills.map((skill) => <span key={skill} className="rounded-md bg-[#f4f5f7] px-2 py-1 text-[11px] font-medium text-muted">{skill}</span>)}
        </div>
      </button>
      <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted"><Bookmark size={14} className="text-accent" aria-hidden="true" />{job.status}</span>
        <button
          type="button"
          onClick={() => onApply(job)}
          className="inline-flex h-8 items-center gap-1 rounded-md bg-ink px-2.5 text-xs font-semibold text-white transition-colors hover:bg-ink/85"
          aria-label={`${hasApplied ? "Applied to" : "Apply to"} ${job.title} at ${job.company}`}
        >
          {hasApplied ? <Check size={14} aria-hidden="true" /> : <ArrowUpRight size={14} aria-hidden="true" />}
          {hasApplied ? "Applied" : "Apply"}
        </button>
      </div>
    </article>
  );
}
