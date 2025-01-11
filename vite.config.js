import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import Delete from 'rollup-plugin-delete'
import autoprefixer from 'autoprefixer'

const bundlingConf = {
  minify: true,
  lib: {
    entry: resolve(__dirname, '/src/components/vueperslides/index.js'),
    name: 'vueperslides',
    fileName: format => `vueperslides.${format}.js` // Output filename pattern
  },
  rollupOptions: {
    plugins: [
      // Rollup also copies the files in the public folder.
      // @todo: find a way to prevent adding them at all.
      Delete({ targets: ['dist/images', 'dist/*.{ico,png}'], hook: 'generateBundle' })
    ],
    // Make sure to externalize deps that shouldn't be bundled into library.
    external: ['vue'],
    output: {
      globals: {
        vue: 'Vue' // Vue should be treated as external and available as a global variable
      }
    }
  }
}

export default defineConfig({
  define: {
    'process.env': {
      ...process.env,
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false
    }
  },
  plugins: [
    Vue({
      template: {
        compilerOptions: {
          whitespace: 'preserve'
        }
      }
    })
  ], // https://vitejs.dev/config/
  resolve: {
    alias: {
      '@': resolve(__dirname, '/src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        additionalData: '@use "@/scss/variables" as *;'
      }
    },
    postcss: {
      plugins: [autoprefixer]
    }
  },
  build: process.env.BUNDLE ? bundlingConf : { outDir: 'docs' }
})
