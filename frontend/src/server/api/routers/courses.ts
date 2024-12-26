import {createTRPCRouter, publicProcedure} from '~/server/api/trpc';

export const coursesRouter = createTRPCRouter({
  getAllCourses: publicProcedure.query(async ({ctx}) => {
    const courses = await ctx.db.query.courses.findMany();
    return courses;
  })
});
