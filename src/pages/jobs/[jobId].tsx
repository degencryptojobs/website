import { LoadingSpinner } from "@/components/LoadSpinner";
import Image from "next/image";
import { useRouter } from "next/router";
import { api } from "../../utils/api";

export default function JobPage() {
  const router = useRouter();
  const jobId = router.query.jobId as string;

  const { data: job } = api.airtable.getJobById.useQuery({ jobId });

  const jobSection = () => {
    if (!job) {
      return (
        <div>
          <LoadingSpinner />
        </div>
      );
    } else {
      return (
        <div>
          <h3 className="pb-4 text-xl font-bold">{job.title}</h3>
          {job.logoUrl && (
            <div className="flex items-center gap-4">
              <Image
                src={job.logoUrl}
                width="240"
                height="240"
                alt="logo"
                className="h-12 w-12"
              />
            </div>
          )}
          <div className="my-4 flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <span className="text-md font-semibold text-gray-500">
                Company
              </span>
              <span className="text-md">{job.company}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-md font-semibold text-gray-500">
                Location
              </span>
              <span className="text-md">{job.location}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-md font-semibold text-gray-500">
                Salary range
              </span>
              <span className="text-md">{job.salary}</span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-md font-semibold text-gray-500">
              Description
            </span>
            <span className="text-md">{job.description}</span>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="container my-4 flex flex-col gap-4 rounded-lg bg-white p-4">
      {jobSection()}
    </div>
  );
}
