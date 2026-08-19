"use client";

import { Bell, ChevronDown, MapPin, Search, SlidersHorizontal } from "lucide-react";

type DashboardHeaderProps = {
  query: string;
  workplace: "All" | "Remote" | "Hybrid";
  onQueryChange: (query: string) => void;
  onWorkplaceChange: (workplace: "All" | "Remote" | "Hybrid") => void;
};

export function DashboardHeader({ query, workplace, onQueryChange, onWorkplaceChange }: DashboardHeaderProps) {
  return (
    <header className="border-b border-line bg-white px-4 py-4 sm:px-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-2.5">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-ink text-sm font-semibold text-white">p</div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold tracking-[-0.025em] text-ink">Discover roles</p>
            <p className="hidden text-xs text-muted sm:block">Curated around your direction</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" className="hidden size-9 items-center justify-center rounded-lg text-muted transition-colors hover:bg-[#f5f6f8] hover:text-ink sm:inline-flex" aria-label="View notifications">
            <Bell size={17} aria-hidden="true" />
          </button>
          <button type="button" className="flex items-center gap-2 rounded-lg py-1 pl-1 pr-2 text-left transition-colors hover:bg-[#f5f6f8]" aria-label="Open profile menu">
            <span className="flex size-7 items-center justify-center rounded-full bg-[#e8edff] text-xs font-semibold text-accent">AM</span>
            <ChevronDown size={15} className="text-muted" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <label className="relative min-w-0 flex-1">
          <span className="sr-only">Search jobs</span>
          <Search size={17} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" aria-hidden="true" />
          <input
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search roles, skills, or companies"
            className="h-10 w-full rounded-lg border border-line bg-[#fbfbfc] pl-9 pr-3 text-sm text-ink placeholder:text-muted/80 focus:border-accent focus:bg-white focus:outline-none"
          />
        </label>
        <div className="grid grid-cols-2 gap-2 sm:flex">
          <label className="relative">
            <span className="sr-only">Filter by location</span>
            <MapPin size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" aria-hidden="true" />
            <select
              value={workplace}
              onChange={(event) => onWorkplaceChange(event.target.value as "All" | "Remote" | "Hybrid")}
              className="h-10 w-full appearance-none rounded-lg border border-line bg-white py-0 pl-8 pr-7 text-sm font-medium text-ink focus:border-accent focus:outline-none sm:w-28"
            >
              <option value="All">Any place</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
            </select>
            <ChevronDown size={15} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-muted" aria-hidden="true" />
          </label>
          <button type="button" className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-line bg-white px-3 text-sm font-medium text-ink transition-colors hover:border-ink/20 hover:bg-[#fbfbfc]">
            <SlidersHorizontal size={16} aria-hidden="true" />
            Filters
          </button>
        </div>
      </div>
    </header>
  );
}
