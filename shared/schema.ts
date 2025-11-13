import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, jsonb, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  role: text("role").notNull().default("patient"),
  location: jsonb("location").$type<{ lat: number; lng: number }>(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const healthLogs = pgTable("health_logs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  heartRate: integer("heart_rate"),
  bloodPressureSystolic: integer("blood_pressure_systolic"),
  bloodPressureDiastolic: integer("blood_pressure_diastolic"),
  temperature: real("temperature"),
  oxygenLevel: integer("oxygen_level"),
  symptoms: text("symptoms"),
  notes: text("notes"),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
});

export const alerts = pgTable("alerts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  location: jsonb("location").notNull().$type<{ lat: number; lng: number }>(),
  status: text("status").notNull().default("pending"),
  urgency: integer("urgency").notNull(),
  description: text("description"),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
});

export const aiChatLogs = pgTable("ai_chat_logs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  prompt: text("prompt").notNull(),
  response: jsonb("response").notNull().$type<TriageResponse>(),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
});

export interface TriageResponse {
  type: string;
  urgency_score: number;
  medical_flags: string[];
  first_aid: string[];
  summary_for_rescue_en: string;
  summary_for_rescue_bn: string;
  suggested_equipment: string[];
  confidence: number;
}

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertHealthLogSchema = createInsertSchema(healthLogs).omit({
  id: true,
  timestamp: true,
});

export const insertAlertSchema = createInsertSchema(alerts).omit({
  id: true,
  timestamp: true,
});

export const insertAIChatLogSchema = createInsertSchema(aiChatLogs).omit({
  id: true,
  timestamp: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertHealthLog = z.infer<typeof insertHealthLogSchema>;
export type HealthLog = typeof healthLogs.$inferSelect;
export type InsertAlert = z.infer<typeof insertAlertSchema>;
export type Alert = typeof alerts.$inferSelect;
export type InsertAIChatLog = z.infer<typeof insertAIChatLogSchema>;
export type AIChatLog = typeof aiChatLogs.$inferSelect;
