import { defineConfig } from 'dumi';

const isProduction = process.env.NODE_ENV === 'production';

const title = 'PartTime'
const base = isProduction ? '/part-time/' : '/';

export default defineConfig({
  title,
  outputPath: 'docs-dist',
  publicPath: `${base}`,
  themeConfig: {
    name: title,
    showLineNum: true,
  },
  resolve: {
    atomDirs: [{ type: 'common', dir: 'src/common' }],
  },
});
