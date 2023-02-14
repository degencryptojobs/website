import type { Company } from "@/types";
import { z } from "zod";
import { supabase } from "../../supbase";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const companiesRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    const jobs = (await supabase.from("company")
    .select())
    return jobs.data as Company[]
  }),
  get: publicProcedure
    .input(
      z.object({
        companyId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const companyResult = (await supabase.from("companies").select().eq("id", input.companyId)).data
      if (companyResult) {
        console.log(companyResult[0])
        return companyResult[0] as Company;
      }
      return null;
    }),
});
