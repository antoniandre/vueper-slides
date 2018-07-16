const rollup = require('rollup')
const resolve = require('rollup-plugin-node-resolve')
const vue = require('rollup-plugin-vue')
const babel = require('rollup-plugin-babel')
const pug = require('rollup-plugin-pug')
// const eslint = require('rollup-plugin-eslint')
const uglify = require('rollup-plugin-uglify')
const watch = require('rollup-watch')
const postcss = require('rollup-plugin-postcss')
const sass = require('rollup-plugin-sass')
const autoprefixer = require('autoprefixer')

const libName = 'vueperslides'
const config = (min = false) => {
  return {
    entry: 'src/index.js',
    dest: `dist/${libName}${min ? '.min' : ''}.js`,
    format: 'umd',
    moduleName: 'VueperSlides',
    sourceMap: true,
    plugins: [
      resolve(),
      vue({ compileTemplate: true, css: true }),
      pug(),
      postcss({
        extract: 'dist/vueperslides.min.css',
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
    case 'STARTING':
      stderr('checking rollup-watch version...')
      break
    case 'BUILD_START':
      stderr(`bundling to ${filename}...`)
      break
    case 'BUILD_END':
      stderr(`${filename} bundled in ${event.duration}ms. Watching for changes...`)
      break
    case 'ERROR':
      stderr(`error: ${event.error}`)
      break
    default:
      stderr(`unknown event: ${event}`)
  }
}

watch(rollup, config()).on('event', (event) => eventHandler(event, `dist/${libName}.js`))
watch(rollup, config(true)).on('event', (event) => eventHandler(event, `dist/${libName}.min.js`))
