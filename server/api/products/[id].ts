import { defineEventHandler } from "h3";
import { readFile } from "fs/promises";
import { Product } from "~/types";

export default defineEventHandler(async (event): Promise<any | null> => {
  const { id } = event.context.params || {};
  const data = await readFile("mock-data/products.json", "utf-8");
  const products = JSON.parse(data) as Product[];
  return products.find(product => product.id.toString() === id?.toString()) || null;
});
