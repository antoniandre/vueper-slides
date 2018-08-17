import { rollup, watch } from 'rollup'

import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import vue from 'rollup-plugin-vue'
import pug from 'rollup-plugin-pug'
// const eslint = require('rollup-plugin-eslint')
import { uglify } from 'rollup-plugin-uglify'
import postcss from 'rollup-plugin-postcss'
import sass from 'rollup-plugin-sass'
import autoprefixer from 'autoprefixer'

const libName = 'vueperslides'
const config = (min = false) => {
  return {
    input: 'src/index.js',
    output: {
      file: `dist/${libName}${min ? '.min' : ''}.js`,
      name: 'VueperSlides',
      sourcemap: min,
      format: 'umd'
    },
    plugins: [
      resolve(),
      vue({ compileTemplate: true, css: true }),
      pug(),
      postcss({
        extract: `dist/${libName}.min.css`,
        plugins: [autoprefixer],
        // sourceMap: true,
        minimize: true
      }),
      babel({ exclude: 'node_modules/**' }),
      (min && uglify())
    ]
  }
}

// stderr to keep `rollup main.js > bundle.js` from breaking.
const stderr = console.error.bind(console)

const eventHandler = (event, filename) => {
  switch (event.code) {
    case 'START':
      stderr('checking rollup-watch version...')
      break
    case 'BUNDLE_START':
      stderr(`bundling to ${filename}...`)
      break
    case 'BUNDLE_END':
      stderr(`${filename} bundled in ${event.duration}ms. Watching for changes..`)
      break
    case 'END':
      // stderr(`Bundle done.`)
      break
    case 'ERROR':
      stderr(`Error: ${event.error}`)
      break
    case 'FATAL':
      stderr(`Fatal error: ${event.error}`)
      break
    default:
      stderr(`Unknown event: ${JSON.stringify(event, null, 2)}`)
  }
}

watch(config()).on('event', (event) => eventHandler(event, `dist/${libName}.js`))
watch(config(true)).on('event', (event) => eventHandler(event, `dist/${libName}.min.js`))
