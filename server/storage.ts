import { db } from "@db";
import { users, healthLogs, alerts, aiChatLogs } from "@shared/schema";
import type { 
  User, InsertUser, 
  HealthLog, InsertHealthLog,
  Alert, InsertAlert,
  AIChatLog, InsertAIChatLog 
} from "@shared/schema";
import { eq, desc } from "drizzle-orm";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createHealthLog(log: InsertHealthLog): Promise<HealthLog>;
  getHealthLogsByUser(userId: string): Promise<HealthLog[]>;
  
  createAlert(alert: InsertAlert): Promise<Alert>;
  getAlerts(): Promise<Alert[]>;
  getAlertsByUser(userId: string): Promise<Alert[]>;
  updateAlertStatus(alertId: string, status: string): Promise<Alert | undefined>;
  
  createAIChatLog(log: InsertAIChatLog): Promise<AIChatLog>;
  getAIChatLogsByUser(userId: string): Promise<AIChatLog[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.email, email));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  async createHealthLog(log: InsertHealthLog): Promise<HealthLog> {
    const result = await db.insert(healthLogs).values(log).returning();
    return result[0];
  }

  async getHealthLogsByUser(userId: string): Promise<HealthLog[]> {
    return await db
      .select()
      .from(healthLogs)
      .where(eq(healthLogs.userId, userId))
      .orderBy(desc(healthLogs.timestamp));
  }

  async createAlert(alert: InsertAlert): Promise<Alert> {
    const result = await db.insert(alerts).values(alert).returning();
    return result[0];
  }

  async getAlerts(): Promise<Alert[]> {
    return await db
      .select()
      .from(alerts)
      .orderBy(desc(alerts.timestamp));
  }

  async getAlertsByUser(userId: string): Promise<Alert[]> {
    return await db
      .select()
      .from(alerts)
      .where(eq(alerts.userId, userId))
      .orderBy(desc(alerts.timestamp));
  }

  async updateAlertStatus(alertId: string, status: string): Promise<Alert | undefined> {
    const result = await db
      .update(alerts)
      .set({ status })
      .where(eq(alerts.id, alertId))
      .returning();
    return result[0];
  }

  async createAIChatLog(log: InsertAIChatLog): Promise<AIChatLog> {
    const result = await db.insert(aiChatLogs).values(log).returning();
    return result[0];
  }

  async getAIChatLogsByUser(userId: string): Promise<AIChatLog[]> {
    return await db
      .select()
      .from(aiChatLogs)
      .where(eq(aiChatLogs.userId, userId))
      .orderBy(desc(aiChatLogs.timestamp));
  }
}

export class MemStorage implements IStorage {
  private users: Map<string, User> = new Map();
  private healthLogs: Map<string, HealthLog> = new Map();
  private alerts: Map<string, Alert> = new Map();
  private aiChatLogs: Map<string, AIChatLog> = new Map();

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      email: insertUser.email,
      password: insertUser.password,
      name: insertUser.name,
      role: insertUser.role ?? "patient",
      location: insertUser.location ?? null,
      id, 
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  async createHealthLog(log: InsertHealthLog): Promise<HealthLog> {
    const id = randomUUID();
    const healthLog: HealthLog = {
      userId: log.userId,
      heartRate: log.heartRate ?? null,
      bloodPressureSystolic: log.bloodPressureSystolic ?? null,
      bloodPressureDiastolic: log.bloodPressureDiastolic ?? null,
      temperature: log.temperature ?? null,
      oxygenLevel: log.oxygenLevel ?? null,
      symptoms: log.symptoms ?? null,
      notes: log.notes ?? null,
      id,
      timestamp: new Date()
    };
    this.healthLogs.set(id, healthLog);
    return healthLog;
  }

  async getHealthLogsByUser(userId: string): Promise<HealthLog[]> {
    return Array.from(this.healthLogs.values())
      .filter(log => log.userId === userId)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  async createAlert(alert: InsertAlert): Promise<Alert> {
    const id = randomUUID();
    const newAlert: Alert = {
      userId: alert.userId,
      location: alert.location,
      status: alert.status ?? "pending",
      urgency: alert.urgency,
      description: alert.description ?? null,
      id,
      timestamp: new Date()
    };
    this.alerts.set(id, newAlert);
    return newAlert;
  }

  async getAlerts(): Promise<Alert[]> {
    return Array.from(this.alerts.values())
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  async getAlertsByUser(userId: string): Promise<Alert[]> {
    return Array.from(this.alerts.values())
      .filter(alert => alert.userId === userId)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  async updateAlertStatus(alertId: string, status: string): Promise<Alert | undefined> {
    const alert = this.alerts.get(alertId);
    if (alert) {
      const updated = { ...alert, status };
      this.alerts.set(alertId, updated);
      return updated;
    }
    return undefined;
  }

  async createAIChatLog(log: InsertAIChatLog): Promise<AIChatLog> {
    const id = randomUUID();
    const chatLog: AIChatLog = {
      userId: log.userId,
      prompt: log.prompt,
      response: log.response as any,
      id,
      timestamp: new Date()
    };
    this.aiChatLogs.set(id, chatLog);
    return chatLog;
  }

  async getAIChatLogsByUser(userId: string): Promise<AIChatLog[]> {
    return Array.from(this.aiChatLogs.values())
      .filter(log => log.userId === userId)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }
}

const isDatabaseConfigured = !!process.env.DATABASE_URL;
export const storage = isDatabaseConfigured ? new DatabaseStorage() : new MemStorage();
