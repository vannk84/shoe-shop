import { defineEventHandler } from "h3";
import { readFile } from "fs/promises";
import type { CartItem } from "~/types";

export default defineEventHandler(async (): Promise<CartItem[]> => {
  const data = await readFile("mock-data/cart.json", "utf-8");
  return JSON.parse(data) as CartItem[];
});
