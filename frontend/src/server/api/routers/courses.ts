import {z} from 'zod';
import {createTRPCRouter, publicProcedure} from '~/server/api/trpc';
import {posts} from '~/server/db';

export const coursesRouter = createTRPCRouter({
  getAllCourses: publicProcedure.query(async ({ctx}) => {
    const courses = await ctx.db.query.courses.findMany();
    return courses;
  })
});
