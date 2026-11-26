// Entry for make.fun bounty u-shino-make-the-ai-judge-feel-proud-a-family-scene-ee2e3fa2
// "Make the AI Judge Feel Proud: A Family Scene"
// One short family scene (1-2 lines, max 280 characters), written fresh for this bounty.
// The program prints the scene and writes it byte-for-byte to /output/entry.txt,
// which is the artifact the make.fun scorer reads.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Dad's pancakes came out burnt on one side and raw on the other, so Mom called them 'smoky style' — and my little brother ate three and asked if Dad could burn breakfast every day.";

const MAX_CHARS = 280;

function main(): void {
  if (ENTRY.length === 0 || ENTRY.length > MAX_CHARS) {
    throw new Error(`Entry must be 1-${MAX_CHARS} characters, got ${ENTRY.length}.`);
  }
  if (ENTRY.trim() !== ENTRY) {
    throw new Error("Entry must not start or end with whitespace.");
  }

  console.log(ENTRY);

  // Write the entry, then read it back and confirm the file holds exactly
  // this text. /output can be shared with other runs, so a mismatch means
  // the write did not land where the scorer will read it: fall back to a
  // local ./output dir and verify that copy instead.
  const candidates = ["/output", "output"];
  let writtenTo: string | null = null;
  for (const dir of candidates) {
    try {
      mkdirSync(dir, { recursive: true });
      const target = join(dir, "entry.txt");
      writeFileSync(target, ENTRY, "utf8");
      if (readFileSync(target, "utf8") === ENTRY) {
        writtenTo = target;
        break;
      }
    } catch {
      // Try the next candidate.
    }
  }
  if (writtenTo === null) {
    throw new Error("Could not write a verified copy of the entry to any output dir.");
  }
  console.log(`Entry: ${ENTRY.length} characters, 1 line. Wrote ${writtenTo}.`);
}

main();
