import {
  type User, type InsertUser,
  type InsertContact, type ContactSubmission,
  type PageContent, type InsertPageContent,
  type BlogPost, type InsertBlogPost,
  type SiteSetting, type InsertSiteSetting,
  users, contactSubmissions, pageContents, blogPosts, siteSettings
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContactSubmission(data: InsertContact): Promise<ContactSubmission>;
  getContactSubmissions(): Promise<ContactSubmission[]>;

  getPageContent(page: string, sectionKey: string): Promise<PageContent | undefined>;
  getPageContents(page: string): Promise<PageContent[]>;
  getAllPageContents(): Promise<PageContent[]>;
  upsertPageContent(data: InsertPageContent): Promise<PageContent>;

  getBlogPosts(publishedOnly?: boolean): Promise<BlogPost[]>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  getBlogPostById(id: number): Promise<BlogPost | undefined>;
  createBlogPost(data: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: number, data: Partial<InsertBlogPost>): Promise<BlogPost | undefined>;
  deleteBlogPost(id: number): Promise<boolean>;

  getSiteSettings(): Promise<SiteSetting[]>;
  getSiteSetting(key: string): Promise<SiteSetting | undefined>;
  upsertSiteSetting(data: InsertSiteSetting): Promise<SiteSetting>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async createContactSubmission(data: InsertContact): Promise<ContactSubmission> {
    const [submission] = await db.insert(contactSubmissions).values(data).returning();
    return submission;
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return db.select().from(contactSubmissions).orderBy(desc(contactSubmissions.createdAt));
  }

  async getPageContent(page: string, sectionKey: string): Promise<PageContent | undefined> {
    const [content] = await db.select().from(pageContents)
      .where(and(eq(pageContents.page, page), eq(pageContents.sectionKey, sectionKey)));
    return content;
  }

  async getPageContents(page: string): Promise<PageContent[]> {
    return db.select().from(pageContents).where(eq(pageContents.page, page));
  }

  async getAllPageContents(): Promise<PageContent[]> {
    return db.select().from(pageContents);
  }

  async upsertPageContent(data: InsertPageContent): Promise<PageContent> {
    const existing = await this.getPageContent(data.page, data.sectionKey);
    if (existing) {
      const [updated] = await db.update(pageContents)
        .set({ content: data.content, updatedAt: new Date() })
        .where(eq(pageContents.id, existing.id))
        .returning();
      return updated;
    }
    const [created] = await db.insert(pageContents).values(data).returning();
    return created;
  }

  async getBlogPosts(publishedOnly = false): Promise<BlogPost[]> {
    if (publishedOnly) {
      return db.select().from(blogPosts)
        .where(eq(blogPosts.published, true))
        .orderBy(desc(blogPosts.createdAt));
    }
    return db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return post;
  }

  async getBlogPostById(id: number): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return post;
  }

  async createBlogPost(data: InsertBlogPost): Promise<BlogPost> {
    const [post] = await db.insert(blogPosts).values(data).returning();
    return post;
  }

  async updateBlogPost(id: number, data: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const [post] = await db.update(blogPosts)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(blogPosts.id, id))
      .returning();
    return post;
  }

  async deleteBlogPost(id: number): Promise<boolean> {
    const result = await db.delete(blogPosts).where(eq(blogPosts.id, id)).returning();
    return result.length > 0;
  }

  async getSiteSettings(): Promise<SiteSetting[]> {
    return db.select().from(siteSettings);
  }

  async getSiteSetting(key: string): Promise<SiteSetting | undefined> {
    const [setting] = await db.select().from(siteSettings).where(eq(siteSettings.key, key));
    return setting;
  }

  async upsertSiteSetting(data: InsertSiteSetting): Promise<SiteSetting> {
    const existing = await this.getSiteSetting(data.key);
    if (existing) {
      const [updated] = await db.update(siteSettings)
        .set({ value: data.value, updatedAt: new Date() })
        .where(eq(siteSettings.id, existing.id))
        .returning();
      return updated;
    }
    const [created] = await db.insert(siteSettings).values(data).returning();
    return created;
  }
}

export const storage = new DatabaseStorage();
