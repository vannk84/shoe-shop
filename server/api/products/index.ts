import { defineEventHandler } from "h3";
import { readFile } from "fs/promises";
import { Product } from "~/types";

export default defineEventHandler(async (): Promise<Product[]> => {
  const data = await readFile("mock-data/products.json", "utf-8");
  return JSON.parse(data) as Product[];
});
