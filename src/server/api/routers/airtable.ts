import type { Attachment } from "airtable";
import { z } from "zod";
import type { Job } from "../../../types";
import { base } from "../../airtable";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const airtableRouter = createTRPCRouter({
  getJobs: publicProcedure.query(async () => {
    const table = base("Jobs Copy");
    const results = await table
      .select({ sort: [{ field: "Company (from Company)", direction: "asc" }] })
      .all();
    const jobs = results.map((result) => {
      const logos = result.fields["Logo (from Company)"] as Attachment[];
      const logoUrl = logos && logos[0] ? logos[0].url : "";
      const job = {
        id: result.id,
        title: result.fields["Title"],
        company: result.fields["Company (from Company)"],
        location: result.fields["Location"],
        logoUrl: logoUrl,
        link: result.fields["Link"],
        date: result.fields["Date"],
        salary: result.fields["Salary"],
        description: result.fields["Description"],
        tagString: result.fields["Tags"],
        urlString: result.fields["Pretty url"],
      };
      return job as Job;
    });
    return jobs;
  }),
  getJobsBySearchString: publicProcedure
    .input(
      z.object({
        searchString: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const table = base("Jobs Copy");

      const results = await table
        .select({
          filterByFormula: `SUM(
            (FIND("${input.searchString}", {Title})),
            (FIND("${input.searchString}", {Company (from Company)})),
            (FIND("${input.searchString}", {Location})),
            (FIND("${input.searchString}", {Tags}))
            )`,
        })
        .firstPage();
      const jobs = results.map((result) => {
        const job = {
          id: result.id,
          title: result.fields["Title"],
          company: result.fields["Company (from Company)"],
          location: result.fields["Location"],
          salary: result.fields["Salary"],
          description: result.fields["Description"],
          tagString: result.fields["Tags"],
        };
        return job as Job;
      });
      return jobs;
    }),
  getJobById: publicProcedure
    .input(
      z.object({
        jobId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const table = base("Jobs Copy");
      const results = await table
        .select({
          filterByFormula: `FIND("${input.jobId}", {Pretty url})`,
        })
        .firstPage();
      const result = results[0];
      const logos = result.fields["Logo (from Company)"] as Attachment[];
      const logoUrl = logos && logos[0] ? logos[0].url : "";
      return {
        id: result.id,
        title: result.fields["Title"] as string,
        company: result.fields["Company (from Company)"] as string[],
        logoUrl: logoUrl,
        link: result.fields["Link"],
        location: result.fields["Location"] as string,
        salary: result.fields["Salary"] as string,
        description: result.fields["Description"] as string,
      } as Job;
    }),
});
