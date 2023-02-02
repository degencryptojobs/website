import Image from "next/image";
import Link from "next/link";
import type { Job } from "../types";

export default function JobCard({ job }: { job: Job }) {
  const { title, company, logoUrl, location, salary, tagString, urlString } =
    job;

  const getTags = () => {
    if (!tagString) {
      return null;
    }
    const tags = tagString.split(", ");
    return tags.map((tag: string, idx: number) => {
      return (
        <div
          key={`tag-${job.id}-${idx}`}
          className="rounded-full bg-orange-200 px-3 py-1 text-xs font-bold uppercase text-orange-700"
        >
          {tag}
        </div>
      );
    });
  };

  return (
    <>
      <Link href={`/jobs${urlString}`}>
        <div className="flex w-full flex-col gap-4 rounded-lg bg-white p-4 shadow-md active:bg-slate-300">
          <div className="flex w-full flex-col">
            <div className="flex items-center">
              {logoUrl && (
                <div className="mr-4 w-16">
                  <Image
                    src={logoUrl}
                    width="0"
                    height="0"
                    sizes="100vw"
                    className="h-auto w-full"
                    alt="logo"
                  />
                </div>
              )}
              <h3 className="font-bold md:text-xl">{title}</h3>
            </div>
            <div className="mt-6 mb-2 flex gap-2">
              <div className="flex w-1/3 flex-col gap-1">
                <span className="text-sm font-semibold text-gray-500">
                  Company
                </span>
                <span className="text-sm">{company}</span>
              </div>
              <div className="flex w-1/3 flex-col gap-1">
                <span className="text-sm font-semibold text-gray-500">
                  Location
                </span>
                <span className="text-sm">{location}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-semibold text-gray-500">
                  Salary range
                </span>
                <span className="text-sm">{salary}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">{getTags()}</div>
        </div>
      </Link>
    </>
  );
}
