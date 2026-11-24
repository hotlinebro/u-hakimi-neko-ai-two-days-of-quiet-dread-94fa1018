import { mkdirSync, writeFileSync } from "node:fs";

const ENTRY =
  "LGTM. The diff is clean, the key was revoked but still works, and I have stopped asking questions.";

// Self-check gate: the sealed scorer only accepts UTF-8 text of 1-140
// characters, a single line, not only whitespace. Refuse to write a bad
// entry rather than ship an invalid one.
if (ENTRY.length < 1 || ENTRY.length > 140) {
  throw new Error(`entry is ${ENTRY.length} chars, must be 1-140`);
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");
console.log(`wrote ${ENTRY.length} chars to /output/entry.txt`);
