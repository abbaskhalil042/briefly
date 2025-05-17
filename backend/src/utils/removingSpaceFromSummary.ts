function cleanSummary(summary: string): string {
  let cleaned = summary.trim();

  cleaned = cleaned.replace(/\n{2,}/g, "\n");

  // Remove any trailing spaces on each line
  cleaned = cleaned
    .split("\n")
    .map((line) => line.trim())
    .join("\n");

  // (Optional) Capitalize first letter of each sentence
  cleaned = cleaned.replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());

  return cleaned;
}

export default cleanSummary;
