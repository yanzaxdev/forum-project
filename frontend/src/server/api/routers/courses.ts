import {createTRPCRouter, publicProcedure} from '~/server/api/trpc';

export const coursesRouter = createTRPCRouter(
    {getAllCourses: publicProcedure.query(async ({}) => {return null})});
