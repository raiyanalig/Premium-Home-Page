import { Check, Sparkles } from "lucide-react";
import type { Job } from "./types";

export function MatchIndicator({ job }: { job: Job }) {
  return (
    <section className="rounded-xl border border-line bg-[#f9faff] p-4 sm:p-5" aria-labelledby="match-heading">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-[0.12em] text-accent uppercase"><Sparkles size={15} aria-hidden="true" />AI match</p>
          <h3 id="match-heading" className="mt-2 text-base font-semibold tracking-[-0.025em] text-ink">Why this role fits you</h3>
        </div>
        <span className="rounded-full bg-white px-2.5 py-1 text-sm font-semibold text-ink shadow-[0_1px_2px_rgba(21,24,29,0.06)]">{job.match}%</span>
      </div>
      <ul className="mt-4 space-y-3">
        {job.matchReasons.map((reason) => (
          <li key={reason} className="flex gap-2 text-sm leading-5 text-muted"><Check size={16} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />{reason}</li>
        ))}
      </ul>
    </section>
  );
}
