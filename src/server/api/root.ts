import { companiesRouter } from "./routers/companies";
import { jobsRouter } from "./routers/jobs";
import { createTRPCRouter } from "./trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  jobs: jobsRouter,
  companies: companiesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
