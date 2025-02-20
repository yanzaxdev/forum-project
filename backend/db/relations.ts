import {relations} from 'drizzle-orm/relations';

import {courseRatings, courses, users} from './schema';

export const forumCourseRankingsRelations = relations(
    courseRatings,
    ({one}) => ({
      forumCourse:
          one(courses,
              {fields: [courseRatings.courseId], references: [courses.id]}),
      forumUser:
          one(users, {fields: [courseRatings.userId], references: [users.id]}),
    }));

export const forumCourseRelations =
    relations(courses, ({many}) => ({
                         courseRankings: many(courseRatings),
                       }));

export const forumUsersRelations =
    relations(users, ({many}) => ({
                       courseRankings: many(courseRatings),
                     }));