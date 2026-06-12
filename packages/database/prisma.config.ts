import { config } from 'dotenv';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'prisma/config';

const packageRoot = dirname(fileURLToPath(import.meta.url));
const monorepoRoot = resolve(packageRoot, '../..');

config({ path: resolve(monorepoRoot, '.env') });
config({ path: resolve(monorepoRoot, '.env.local') });

const directUrl =
  process.env.DIRECT_URL ??
  'postgresql://postgres:postgres@127.0.0.1:5432/postgres';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: directUrl,
  },
});
