const fs = require('fs');
const path = require('path');

const contentDirs = [
  path.join(__dirname, '../src/content/blog'),
  path.join(__dirname, '../src/content/glossar')
];

function getAllFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllFiles(filePath, fileList);
    } else if (filePath.endsWith('.md') || filePath.endsWith('.mdx')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const allFiles = contentDirs.flatMap(dir => getAllFiles(dir));
const issues = [];

function extractFrontmatterField(content, field) {
  // Regex to match field: "..." or field: '...' or field: ...
  const regex = new RegExp(`^${field}:\\s*(["']?)(.*?)\\1$`, 'm');
  const match = content.match(regex);
  return match ? match[2] : null;
}

function hasEmoji(str) {
  const emojiRegex = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;
  return emojiRegex.test(str);
}

for (const file of allFiles) {
  const content = fs.readFileSync(file, 'utf-8');
  
  const title = extractFrontmatterField(content, 'title');
  const meta_title = extractFrontmatterField(content, 'meta_title');
  const description = extractFrontmatterField(content, 'description');
  const meta_description = extractFrontmatterField(content, 'meta_description');

  const fileIssues = [];

  // Check meta_title
  if (meta_title) {
    if (meta_title.length > 50) fileIssues.push(`meta_title too long (${meta_title.length} > 50)`);
    if (!meta_title.endsWith(' (2026)')) fileIssues.push(`meta_title missing ' (2026)' suffix`);
    if (meta_title.includes('…') || meta_title.includes('...')) fileIssues.push(`meta_title contains ellipsis`);
    if (hasEmoji(meta_title)) fileIssues.push(`meta_title contains emojis`);
  } else {
    fileIssues.push(`missing meta_title`);
  }

  // Check description
  if (description) {
    if (description.length > 150) fileIssues.push(`description too long (${description.length} > 150)`);
    if (!description.endsWith(' (2026)')) fileIssues.push(`description missing ' (2026)' suffix`);
    if (description.includes('…') || description.includes('...')) fileIssues.push(`description contains ellipsis`);
    if (hasEmoji(description)) fileIssues.push(`description contains emojis`);
  } else {
    fileIssues.push(`missing description`);
  }
  
  // Check meta_description
  if (!meta_description) {
    // If it's missing entirely but required
    fileIssues.push(`missing meta_description`);
  } else if (meta_description !== description) {
    fileIssues.push(`meta_description does not match description`);
  }

  if (fileIssues.length > 0) {
    issues.push({
      file: path.relative(path.join(__dirname, '..'), file),
      title,
      meta_title,
      description,
      meta_description,
      errors: fileIssues
    });
  }
}

fs.writeFileSync(path.join(__dirname, 'meta_issues.json'), JSON.stringify(issues, null, 2));
console.log(`Found issues in ${issues.length} out of ${allFiles.length} files.`);
