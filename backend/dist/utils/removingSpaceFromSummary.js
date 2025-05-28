"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function cleanSummary(summary) {
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
exports.default = cleanSummary;
