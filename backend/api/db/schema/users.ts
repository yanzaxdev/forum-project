import {InferInsertModel, InferSelectModel, sql} from 'drizzle-orm';
import {index, text, timestamp, varchar} from 'drizzle-orm/pg-core';
import {z} from 'zod';

import {createTable} from './tableCreator';

export type User = InferSelectModel<typeof users>;
export type UserInsert = InferInsertModel<typeof users>;

export const users = createTable(
    'users', {
      id: text().primaryKey(),
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

export const UserSchema = z.object({
  id: z.string(),
  username: z.string().max(50),
  email: z.string().max(256),
  createdAt: z.date(),
});