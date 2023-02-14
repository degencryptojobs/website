import { api } from "@/utils/api";
import Image from "next/image";
import Link from "next/link";
import type { Job } from "../types";

const daysAgo = (date: string) => {
  const today = new Date();
  const jobDate = new Date(date);
  const diffTime = Math.abs(today.getTime() - jobDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

const getFirstLetter = (str: string) => {
  const letter = str.match(/[a-zA-Z]/)!.pop() as string;
  if (letter !== letter.toUpperCase()) return letter.toUpperCase();
  return letter;
};

export default function JobCard({ job }: { job: Job }) {
  const {
    title,
    company: companyId,
    date,
    location,
    salary,
    tags,
    pretty_url,
  } = job;

  const {data: company} = api.companies.get.useQuery({companyId})

  const getTags = (limit = 0) => {
    if (!tags) {
      return null;
    }
    const tagsArray = tags.split(", ");
    return tagsArray.map((tag: string, idx: number) => {
      if (limit > 0 && idx >= limit) {
        return null;
      }
      return (
        <div
          key={`tag-${job.id}-${idx}`}
          className="rounded-full bg-blue-200 px-3 py-1 text-xs font-bold uppercase text-slate-700"
        >
          {tag}
        </div>
      );
    });
  };

  return (
    <>
      <Link href={`/jobs${pretty_url}`}>
        <div className="w-full flex-col gap-4 rounded-lg bg-gray-600 p-4 text-white shadow-md active:bg-slate-300">
          <div className="flex w-full flex-col">
            <div className="flex items-center">
              {company && company.logo && (
                <div className="mr-4 w-20 bg-white">
                  <Image
                    src={company.logo.url}
                    width="0"
                    height="0"
                    sizes="100vw"
                    className="h-auto w-full"
                    alt="logo"
                  />
                </div>
              )}
              {company && !company.logo && (
                <div className="mr-4 flex h-20 w-20 items-center justify-center rounded-full bg-blue-800 text-center text-5xl font-bold text-white">
                  {company && (getFirstLetter(company.name))}
                </div>
              )}
              <h3 className="font-bold md:text-xl">{title}</h3>
            </div>
            <div className="mt-6 mb-2 flex gap-2">
              <div className="flex w-1/3 flex-col gap-1">
                <span className="text-sm font-semibold text-gray-300">
                  Company
                </span>
                <span className="text-sm">{company && (company.name)}</span>
              </div>
              <div className="flex w-1/3 flex-col gap-1">
                <span className="text-sm font-semibold text-gray-300">
                  Location
                </span>
                <span className="text-sm">{location}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-semibold text-gray-300">
                  Salary range
                </span>
                <span className="text-sm">{salary}</span>
              </div>
            </div>
          </div>
          <div className="hidden gap-2 sm:flex sm:flex-wrap">{getTags()}</div>
          <div className="mt-4 flex gap-1">
            <span className="text-sm italic">
              Posted {daysAgo(date)} days ago
            </span>
          </div>
        </div>
      </Link>
    </>
  );
}
