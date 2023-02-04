import type { Job } from "@/types";

type Props = {
  jobs: Job[];
};

export const SocialProofs = ({ jobs }: Props) => {
  const jobNum = jobs.length;
  const companies = new Set(jobs.map((job) => job.company[0])).size;
  const locations = new Set(jobs.map((job) => job.location)).size;
  return (
    <div className="flex w-full flex-col items-center justify-center gap-6 px-4 text-base sm:text-2xl">
      <div className="grid w-full grid-cols-3">
        <div className="flex flex-col text-center">
          <span className="font-bold text-slate-50">{companies}</span>
          <span className="font-bold text-teal-300">COMPANIES</span>
        </div>
        <div className="flex flex-col text-center">
          <span className="font-bold text-slate-50">{jobNum * 2}</span>
          <span className="font-bold text-teal-300">JOBS</span>
        </div>
        <div className="flex flex-col text-center">
          <span className="font-bold text-slate-50">{locations}</span>
          <span className="font-bold text-teal-300">LOCATIONS</span>
        </div>
      </div>
    </div>
  );
};
