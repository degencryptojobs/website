import { LoadingSpinner } from "@/components/LoadSpinner";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { api } from "../../utils/api";

export default function JobPage() {
  const router = useRouter();
  const prettyUrl = router.query.jobId as string;

  const { data: job } = api.jobs.getByPrettyUrl.useQuery({ prettyUrl });
  const { data: company } = api.companies.get.useQuery({ companyId: job?.company || '' });

  const jobSection = () => {
    if (!job) {
      return (
        <div>
          <LoadingSpinner />
        </div>
      );
    } else {
      return (
        <div className="mt-10">
          <h3 className="py-4 text-xl font-bold">{job.title}</h3>
          {company?.logo.url && (
            <div className="flex items-center gap-4">
              <Image
                src={company?.logo.url}
                width="240"
                height="240"
                alt="logo"
                className="h-12 w-12"
              />
            </div>
          )}
          <div className="flex w-full">
            <div className="my-4 flex w-full flex-col gap-2 sm:w-1/2">
              <div className="flex flex-col gap-1">
                <span className="text-md font-semibold text-gray-400">
                  Company
                </span>
                <span className="text-md">{company && (company.name)}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-md font-semibold text-gray-400">
                  Location
                </span>
                <span className="text-md">{job.location}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-md font-semibold text-gray-400">
                  Salary range
                </span>
                <span className="text-md">{job.salary}</span>
              </div>
              <div className="">
                <Link href={job.link}>
                  <button className="my-2 rounded-md bg-slate-100 p-2 font-semibold text-slate-900">
                    Apply here
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-md font-semibold text-gray-400">
              Description
            </span>
            <span className="text-md">{job.description}</span>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="container my-4 flex flex-col gap-4 rounded-lg bg-gray-800 p-4 text-slate-100">
      {jobSection()}
    </div>
  );
}
