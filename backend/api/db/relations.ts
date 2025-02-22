import {relations} from 'drizzle-orm/relations';

import {courseRankings, courses, users} from './schema';

export const forumCourseRankingsRelations = relations(
    courseRankings,
    ({one}) => ({
      forumCourse:
          one(courses,
              {fields: [courseRankings.courseId], references: [courses.id]}),
      forumUser:
          one(users, {fields: [courseRankings.userId], references: [users.id]}),
    }));

export const forumCourseRelations =
    relations(courses, ({many}) => ({
                         courseRankings: many(courseRankings),
                       }));

export const forumUsersRelations =
    relations(users, ({many}) => ({
                       courseRankings: many(courseRankings),
                     }));