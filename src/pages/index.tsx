import JobCard from "@/components/JobCard";
import { Landing } from "@/components/Landing";
import { LoadingSpinner } from "@/components/LoadSpinner";
import { SearchBar } from "@/components/SearchBar";
import type { Job } from "@/types";
import { type NextPage } from "next";
import type { FormEvent } from "react";
import { useRef, useState } from "react";
import { api } from "../utils/api";

const Home: NextPage = () => {
  const searchRef = useRef<HTMLInputElement>(null);
  const [searchJobs, setSearchJobs] = useState<Job[]>([]);

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
      <Landing />
      <SearchBar
        searchRef={searchRef}
        handleSearchSubmit={handleSearchSubmit}
      />
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
