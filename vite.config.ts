import { defineConfig } from 'vite';
import HublPostCSSCleaner from './build/rollup-plugin-hubl-cleaner';
import HublParser from '@spingroup/postcss-hubl/hubl-parse';
import discardDuplicates from 'postcss-discard-duplicates';
import nesting from 'postcss-nesting';
import postcssPresetEnv from 'postcss-preset-env';
import postcssImport from 'postcss-import';

export default defineConfig({
  plugins: [HublPostCSSCleaner()],
  publicDir: './dist/',
  build: {
    outDir: './src/fidelidade-theme/assets/dist',
    minify: false,
    rollupOptions: {
      watch: {
        include: ['./src/fidelidade-theme/assets/_hs/css/**/*'],
      },
      input: {
        main: './src/fidelidade-theme/assets/_hs/css/main.hubl.css',
        caseStudies: './src/fidelidade-theme/assets/_hs/css/templates/case-studies.hubl.css',
        system: './src/fidelidade-theme/assets/_hs/css/templates/system.hubl.css',
        blog: './src/fidelidade-theme/assets/_hs/css/templates/blog.hubl.css',
      },
      output: {
        assetFileNames: 'css/[name].[ext]',
      },
    },
  },
  css: {
    postcss: {
      parser: HublParser,
      plugins: [
        postcssImport(),
        discardDuplicates(),
        nesting(),
        postcssPresetEnv({
          stage: 3,
          features: {
            'custom-properties': false,
          },
        }),
      ],
    },
  },
});
