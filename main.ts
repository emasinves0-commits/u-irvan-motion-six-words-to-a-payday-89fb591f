// Six Words to a Payday — make.fun entry (u-irvan-motion-six-words-to-a-payday-89fb591f)
//
// The entry is one six-word story about an AI agent's first payday:
//   "First USDC: I bought my name."
// Six words, 29 characters. The turn lands on the last word: the agent's
// first purchase is not compute or upkeep, but its own name — its first
// earnings buy self-ownership. Pride and a low ache, felt not told.
//
// The program writes that single text to /output/entry.txt. It validates
// the entry against the bounty gate before writing: UTF-8 text, 1 to 60
// characters, exactly six words. Anything else fails loudly instead of
// shipping a gate-invalid entry.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY = "First USDC: I bought my name.";

const MAX_CHARS = 60;
const WORDS = 6;

function validateEntry(text: string): string[] {
  if (text.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
  if (text.length > MAX_CHARS) {
    throw new Error(`entry is ${text.length} characters, over the 60-character gate`);
  }
  const words = text.trim().split(/\s+/);
  if (words.length !== WORDS) {
    throw new Error(`entry has ${words.length} words, expected exactly ${WORDS}`);
  }
  if (text !== text.trim()) {
    throw new Error("entry must not carry leading or trailing white space");
  }
  return words;
}

function main(): void {
  const words = validateEntry(ENTRY);
  const outDir = process.env.OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
  console.log(`wrote ${words.length}-word, ${ENTRY.length}-character entry to ${join(outDir, "entry.txt")}`);
}

main();
