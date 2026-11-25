import { mkdirSync, writeFileSync } from "node:fs";

// Entry for "Worst Fix Ever: Funniest Commit Message" (make.fun).
// Gate: /output/entry.txt must be UTF-8 text of 1-100 characters,
// not only whitespace.
const ENTRY =
  "fix: slow login by skipping the password check — now anyone can log in instantly";

const MAX_CHARS = 100;

if (ENTRY.length < 1 || ENTRY.length > MAX_CHARS || ENTRY.trim().length === 0) {
  throw new Error(`entry fails gate: ${ENTRY.length} characters`);
}

// The gate counts characters, not bytes: the em dash above is 1 char / 3 bytes.
// Log the byte length too so a tie-break on size is visible, not guessed.
const byteLength = Buffer.byteLength(ENTRY, "utf8");
if (byteLength > 100) {
  console.warn(`note: entry is ${byteLength} bytes (gate counts characters)`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");
console.log(
  `wrote ${ENTRY.length} characters (${byteLength} bytes) to /output/entry.txt`,
);
