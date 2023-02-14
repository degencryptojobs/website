import { Hero } from "@/components/Hero";
import JobCard from "@/components/JobCard";
import { LoadingSpinner } from "@/components/LoadSpinner";
import { SearchBar } from "@/components/SearchBar";
import { SocialProofs } from "@/components/SocialProofs";
import type { Job } from "@/types";
import { api } from "@/utils/api";
import { type NextPage } from "next";
import { useRef, useState } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';

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
  const [moreJobs, setMoreJobs] = useState<Job[]>([]);

  const { data: jobs } = api.jobs.getFirstPage.useQuery();
  const jobsMutation = api.jobs.getPage.useMutation({
    onSuccess: (data) => {
      setMoreJobs([...moreJobs, ...data]);
    }
  })
  const jobSearchMutation = api.jobs.getJobsBySearchString.useMutation({
    onSuccess: (data) => {if (
      searchRef.current!.value &&
      searchRef.current!.value.length > 0 &&
      jobs
    ) {
      setSearchJobs(data);
    }
    setSearchJobs([]);
    }
  });
  const jobTagMutation = api.jobs.getJobsByTag.useMutation({
    onSuccess: (data) => {
      setSearchJobs(data);
    }
  });

  return (
    <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
      <Hero />
      {jobs && <SocialProofs jobs={jobs} />}
      <SearchBar
        searchRef={searchRef}
        handleSearchSubmit={() => jobSearchMutation.mutate({
          searchString: searchRef.current!.value,
        })}
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
                  setSearchTag(tag);
                  jobTagMutation.mutate({ tag })
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
          <InfiniteScroll
            dataLength={moreJobs.length}
            next={() => jobsMutation.mutate({ start: moreJobs.length + 50})}
            hasMore={true || false}
            loader={<div className="loader" key={0}>Loading ...</div>}
            className="flex flex-col items-center justify-center gap-6"
          >
            {moreJobs.map((job) => (
              <div key={job.id} className="w-full">
                <JobCard job={job} />
              </div>
            ))}
          </InfiniteScroll>
        </div>
      )}
    </div>
  );
};

export default Home;
