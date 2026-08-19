import { Check, CircleDotDashed, Send, X } from "lucide-react";

const stages = [
  { label: "Saved", icon: CircleDotDashed, className: "bg-[#f3f4f6] text-[#59606d]" },
  { label: "Applied", icon: Send, className: "bg-[#eef3ff] text-accent" },
  { label: "Interview", icon: Check, className: "bg-[#eef7f0] text-[#307044]" },
  { label: "Rejected", icon: X, className: "bg-[#faf0f0] text-[#a55050]" },
];

export function ApplicationStatus() {
  return (
    <section className="rounded-xl border border-line bg-white p-4 sm:p-5" aria-labelledby="pipeline-heading">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold tracking-[0.12em] text-muted uppercase">Your pipeline</p>
          <h3 id="pipeline-heading" className="mt-1 text-base font-semibold tracking-[-0.025em] text-ink">Application status</h3>
        </div>
        <span className="text-xs font-medium text-muted">Keep momentum visible</span>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {stages.map(({ label, icon: Icon, className }) => (
          <div key={label} className="rounded-lg border border-line p-2.5">
            <span className={`flex size-7 items-center justify-center rounded-md ${className}`}><Icon size={15} aria-hidden="true" /></span>
            <p className="mt-2 text-xs font-semibold text-ink">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
