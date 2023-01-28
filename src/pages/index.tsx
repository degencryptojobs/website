import JobCard from "@/components/JobCard";
import { Landing } from "@/components/Landing";
import { SearchBar } from "@/components/SearchBar";
import { type NextPage } from "next";
import { useRef } from "react";
import { api } from "../utils/api";

const Home: NextPage = () => {
  const searchRef = useRef<HTMLInputElement>(null);

  if (searchRef?.current) {
    console.log(searchRef?.current.value);
  }

  const { data: jobs } = api.airtable.getJobs.useQuery();

  const jobsMutation = api.airtable.getJobsBySearchString.useMutation();

  const getJobCards = () => {
    if (!jobsMutation.isLoading && jobsMutation.data) {
      return jobsMutation.data.map((job) => {
        return (
          <div key={job.id} className="w-full">
            <JobCard job={job} />
          </div>
        );
      });
    }
    if (!jobs) return <div>Loading...</div>;
    const jobCards = jobs.map((job) => {
      return (
        <div key={job.id} className="w-full">
          <JobCard job={job} />
        </div>
      );
    });
    return jobCards;
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchRef.current!.value) {
      jobsMutation.mutate({ searchString: searchRef.current!.value });
    }
  };

  return (
    <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
      <Landing />
      <SearchBar
        searchRef={searchRef}
        handleSearchSubmit={handleSearchSubmit}
      />
      <div className="flex flex-col items-center justify-center gap-6 px-4">
        {getJobCards()}
      </div>
    </div>
  );
};

export default Home;
