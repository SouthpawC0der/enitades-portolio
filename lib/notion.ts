const NOTION_TOKEN = process.env.NOTION_TOKEN!;
const BASE = "https://api.notion.com/v1";
const HEADERS = {
  Authorization: `Bearer ${NOTION_TOKEN}`,
  "Notion-Version": "2022-06-28",
  "Content-Type": "application/json",
};

export type RichText = { plain_text: string; annotations: { bold: boolean; italic: boolean; code: boolean }; href: string | null };

export type Block = {
  id: string;
  type: string;
  has_children: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
  children?: Block[];
};

async function fetchBlocks(blockId: string): Promise<Block[]> {
  const res = await fetch(`${BASE}/blocks/${blockId}/children?page_size=100`, { headers: HEADERS });
  const data = await res.json();
  return data.results ?? [];
}

export async function getPageBlocks(pageId: string): Promise<Block[]> {
  const blocks = await fetchBlocks(pageId);
  // Fetch children for blocks that have them
  const withChildren = await Promise.all(
    blocks.map(async (block) => {
      if (block.has_children) {
        block.children = await fetchBlocks(block.id);
      }
      return block;
    })
  );
  return withChildren;
}

export function richTextToString(rt: RichText[]): string {
  return rt.map((r) => r.plain_text).join("");
}
