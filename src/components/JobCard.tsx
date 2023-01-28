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
          className="leading-sm mr-2 inline-flex gap-2 rounded-full bg-orange-200 px-3 py-1 text-xs font-bold uppercase text-orange-700"
        >
          {tag}
        </div>
      );
    });
  };

  return (
    <>
      <Link href={`/jobs/${urlString}`}>
        <div className="flex w-full flex-col gap-4 rounded-lg bg-white p-4 shadow-md">
          <h3 className="text-xl font-bold">{title}</h3>
          <div>
            {logoUrl && (
              <div className="center flex flex-col gap-2">
                <Image
                  src={logoUrl}
                  width="240"
                  height="240"
                  className="h-20 w-20"
                  alt="logo"
                />
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-semibold text-gray-500">
                Company
              </span>
              <span className="text-sm">{company}</span>
            </div>
            <div className="flex flex-col gap-1">
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
            <div className="">{getTags()}</div>
          </div>
        </div>
      </Link>
    </>
  );
}
