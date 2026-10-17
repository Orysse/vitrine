// Temporary: lets tests/dist/content.test.mjs read the collection. Removed in Task 4.
import { getCollection } from "astro:content";

export async function GET() {
  const works = (await getCollection("works")).sort((a, b) => a.data.number - b.data.number);
  return new Response(JSON.stringify(works.map((w) => ({ id: w.id, ...w.data }))), {
    headers: { "Content-Type": "application/json" },
  });
}
