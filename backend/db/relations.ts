import { relations } from "drizzle-orm/relations";
import { forumCourses, forumCourseRatings, forumUsers } from "./schema";

export const forumCourseRatingsRelations = relations(forumCourseRatings, ({one}) => ({
	forumCourse: one(forumCourses, {
		fields: [forumCourseRatings.courseId],
		references: [forumCourses.id]
	}),
	forumUser: one(forumUsers, {
		fields: [forumCourseRatings.userId],
		references: [forumUsers.id]
	}),
}));

export const forumCoursesRelations = relations(forumCourses, ({many}) => ({
	forumCourseRatings: many(forumCourseRatings),
}));

export const forumUsersRelations = relations(forumUsers, ({many}) => ({
	forumCourseRatings: many(forumCourseRatings),
}));