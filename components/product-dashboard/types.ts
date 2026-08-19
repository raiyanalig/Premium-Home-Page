export type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  workplace: "Remote" | "Hybrid";
  type: "Full-time";
  match: number;
  skills: string[];
  matchReasons: string[];
  status: "Saved" | "Applied" | "Interview" | "Rejected";
};
