import { execSync } from 'child_process';

const msg = process.argv.slice(2).join(' ');
if (!msg) {
  console.error('❌ Commit message is required!');
  process.exit(1);
}

try {
  execSync(`git add . && git commit -m "${msg}" && git push`, {
    stdio: 'inherit',
  });
} catch (err) {
  console.error('❌ Git command failed:', err.message);
  process.exit(1);
}
