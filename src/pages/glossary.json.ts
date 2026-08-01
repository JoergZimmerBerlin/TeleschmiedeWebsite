import { getCollection } from 'astro:content';

export async function GET() {
  const glossarEntries = await getCollection('glossar');
  const manifest = glossarEntries.map(entry => ({
    title: entry.data.title,
    id: entry.id,
    description: entry.data.meta_description || entry.data.description,
  }));

  return new Response(JSON.stringify(manifest), {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
