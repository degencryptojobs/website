import { Hero } from "@/components/Hero";
import JobCard from "@/components/JobCard";
import { LoadingSpinner } from "@/components/LoadSpinner";
import { SearchBar } from "@/components/SearchBar";
import { SocialProofs } from "@/components/SocialProofs";
import type { Job } from "@/types";
import { type NextPage } from "next";
import type { FormEvent } from "react";
import { useRef, useState } from "react";
import { api } from "../utils/api";

const searchTagList = [
  "Remote",
  "Solidity",
  "Analyst",
  "Community-manager",
  "Data",
  "Design",
  "Developer",
  "Ethereum",
  "Finance",
  "Frontend",
  "Fullstack",
  "Growth",
  "Marketing",
  "Product",
  "Security",
  "Solidity",
  "UX",
  "Web3",
];

const Home: NextPage = () => {
  const searchRef = useRef<HTMLInputElement>(null);
  const [searchJobs, setSearchJobs] = useState<Job[]>([]);
  const [searchTag, setSearchTag] = useState<string>("");

  const { data: jobs } = api.airtable.getJobs.useQuery();

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      searchRef.current!.value &&
      searchRef.current!.value.length > 0 &&
      jobs
    ) {
      const filteredJobs = jobs.filter((job) => {
        const { title, company, location, tagString } = job;
        const searchValue = searchRef.current!.value.toLowerCase();
        return (
          title.toLowerCase().includes(searchValue) ||
          company[0].toLowerCase().includes(searchValue) ||
          location.toLowerCase().includes(searchValue) ||
          tagString?.toLowerCase().includes(searchValue)
        );
      });
      setSearchJobs(filteredJobs);
      return;
    }
    setSearchJobs([]);
  };

  return (
    <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
      <Hero />
      {jobs && <SocialProofs jobs={jobs} />}
      <SearchBar
        searchRef={searchRef}
        handleSearchSubmit={handleSearchSubmit}
      />
      <div className="flex flex-wrap items-center justify-center gap-2 px-4">
        {searchTagList.map((tag) => {
          const colors = searchTag === tag ? "bg-blue-500" : "bg-blue-200";
          return (
            <div
              key={tag}
              className={`cursor-pointer rounded-full ${colors} px-3 py-1 text-xs font-bold uppercase text-slate-700`}
              onClick={() => {
                if (searchTag === tag) {
                  setSearchJobs([]);
                  setSearchTag("");
                  return;
                }
                if (jobs) {
                  const filteredJobs = jobs.filter((job) => {
                    const { tagString } = job;
                    return tagString?.toLowerCase().includes(tag.toLowerCase());
                  });
                  setSearchTag(tag);
                  setSearchJobs(filteredJobs);
                  return;
                }
                setSearchJobs([]);
              }}
            >
              {tag}
            </div>
          );
        })}
      </div>

      {!jobs && (
        <div className="flex flex-col justify-center gap-6 px-4">
          <LoadingSpinner />
        </div>
      )}
      {searchJobs.length > 0 && jobs && (
        <div className="flex flex-col items-center justify-center gap-6 px-4">
          {searchJobs.map((job) => (
            <div key={job.id} className="w-full">
              <JobCard job={job} />
            </div>
          ))}
        </div>
      )}
      {searchJobs.length === 0 && jobs && (
        <div className="flex flex-col items-center justify-center gap-6 px-4">
          {jobs.map((job) => (
            <div key={job.id} className="w-full">
              <JobCard job={job} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
