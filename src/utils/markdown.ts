/**
 * A ultra-lightweight markdown formatter for simple inline styles.
 * Handles: **bold**, [links](url).
 */
export function formatMarkdown(text: string): string {
  if (!text) return '';
  return text
    // Handle backticks (code) first and escape HTML symbols within code
    .replace(/`([^`]+)`/g, (_, code) => `<code>${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code>`)
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-lime-600 underline underline-offset-2 decoration-lime-400/50 hover:text-lime-700 transition-colors">$1</a>');
}
