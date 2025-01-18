import { defineEventHandler } from "h3";
import { readFile } from "fs/promises";
import type { Category } from "~/types";

export default defineEventHandler(async (): Promise<Category[]> => {
  const data = await readFile("mock-data/categories.json", "utf-8");
  return JSON.parse(data) as Category[];
});
