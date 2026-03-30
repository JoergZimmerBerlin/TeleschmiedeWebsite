import { execSync } from 'node:child_process';
import path from 'node:path';
import fs from 'node:fs';

export function getGitModDate(filePath: string): string {
  try {
    // If the path is relative, make it absolute relative to project root
    const absolutePath = path.isAbsolute(filePath) ? filePath : path.join(process.cwd(), filePath);
    let finalPath = absolutePath;
    if (!fs.existsSync(finalPath)) {
      if (fs.existsSync(absolutePath + '.md')) {
        finalPath = absolutePath + '.md';
      } else if (fs.existsSync(absolutePath + '.mdx')) {
        finalPath = absolutePath + '.mdx';
      } else {
        // console.log(`[git-date] File not found: ${absolutePath}`);
        return new Date().toISOString().split('T')[0];
      }
    }

    // console.log(`[git-date] Getting date for: ${finalPath}`);
    // %cs extracts the committer date in YYYY-MM-DD format
    const dateStr = execSync(`git log -1 --format=%cs -- "${finalPath}"`, { encoding: 'utf8' }).trim();
    return dateStr || new Date().toISOString().split('T')[0];
  } catch (e) {
    console.error(`Error getting git mod date for ${filePath}:`, e);
    return new Date().toISOString().split('T')[0];
  }
}
