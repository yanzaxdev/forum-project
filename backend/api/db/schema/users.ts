import {InferSelectModel, sql} from 'drizzle-orm';
import {index, integer, timestamp, varchar} from 'drizzle-orm/pg-core';

import {createTable} from './tableCreator';

export type User = InferSelectModel<typeof users>;
export type UserInsert = Omit<User, 'id'>;

export const users = createTable(
    'users', {
      id: integer('id').primaryKey().generatedByDefaultAsIdentity(),
      username: varchar('username', {length: 50}).notNull().unique(),
      email: varchar('email', {length: 256}).notNull().unique(),
      createdAt: timestamp('created_at', {withTimezone: true})
                     .default(sql`CURRENT_TIMESTAMP`)
                     .notNull(),
    },
    (user) => [  // Changed from object to array
        index('username_idx').on(user.username),
        index('email_idx').on(user.email),
]);