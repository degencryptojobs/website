import type { Job } from "@/types";
import { z } from "zod";
import { supabase } from "../../supbase";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const jobsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    const jobs = (await supabase.from("jobs")
    .select())
    return jobs.data as Job[]
  }),
  getPage: publicProcedure.input(
    z.object({
      start: z.number(),
    })
  ).mutation(async ({ input }) => {
    const jobs = (await supabase.from("jobs")
    .select()
    .range(input.start, input.start + 50))
    return jobs.data as Job[]
  }),
  getFirstPage: publicProcedure.query(async () => {
    const jobs = (await supabase.from("jobs")
    .select()
    .range(0, 50))
    return jobs.data as Job[]
  }),
  getJobsBySearchString: publicProcedure
    .input(
      z.object({
        searchString: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const response = await supabase.rpc(`select
      *
    from
      jobs
    where
      to_tsvector(tags || location || title || company)
      @@ to_tsquery(${input.searchString});`)

      return response.data as Job[]
    }),
    getJobsByTag: publicProcedure
      .input(
        z.object({
          tag: z.string(),
        })
      )
      .mutation(async ({ input }) => {
        const response = await supabase.from("jobs").select().like("tags", `%${input.tag}%`)
  
        return response.data as Job[]
      }),
    get: publicProcedure
      .input(
        z.object({
          jobId: z.string(),
        })
      )
      .query(async ({ input }) => {
        const response = await supabase.from("jobs").select().eq("id", input.jobId)
        if (response.data === null) {
          return null;
        }
        return response.data[0] as Job;
      }),
      getByPrettyUrl: publicProcedure
        .input(
          z.object({
            prettyUrl: z.string(),
          })
        )
        .query(async ({ input }) => {
          const response = await supabase.from("jobs").select().eq("pretty_url", `/${input.prettyUrl}`)
          if (response.data === null || response.data.length === 0) {
            return null;
          }
          return response.data[0] as Job;
        }),
});
