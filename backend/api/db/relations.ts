import {relations} from 'drizzle-orm/relations';

import {courseRatings, courses, users} from './schema';

export const forumCourseRatingsRelations = relations(
    courseRatings,
    ({one}) => ({
      forumCourse:
          one(courses,
              {fields: [courseRatings.courseId], references: [courses.id]}),
      forumUser:
          one(users, {fields: [courseRatings.userId], references: [users.id]}),
    }));

export const forumCoursesRelations =
    relations(courses, ({many}) => ({
                         forumCourseRatings: many(courseRatings),
                       }));

export const forumUsersRelations =
    relations(users, ({many}) => ({
                       forumCourseRatings: many(courseRatings),
                     }));