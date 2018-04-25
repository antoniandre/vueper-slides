import resolve from 'rollup-plugin-node-resolve'
import vue from 'rollup-plugin-vue'
import babel from 'rollup-plugin-babel'
import pug from 'rollup-plugin-pug'
// import scss from 'rollup-plugin-scss'
import replace from 'rollup-plugin-replace'
import uglify from 'rollup-plugin-uglify'

const pkg = require('./package.json')
const external = Object.keys(pkg.dependencies)

export default {
  external,
  globals: { vue: 'Vue' },
  entry: 'src/index.js',
  plugins: [
    resolve(),
    vue({ compileTemplate: true, css: true }),
    pug(),
    // scss({ output: 'dist/vueperslides.css' }),
    babel({ exclude: 'node_modules/**' }),
    replace({ ENV: JSON.stringify(process.env.NODE_ENV || 'development') }),
    (process.env.NODE_ENV === 'production' && uglify())
  ],
  targets: [
    { dest: 'dist/vueperslides.js', format: 'cjs', sourceMap: true },
    { dest: 'dist/vueperslides.umd.js', format: 'umd', moduleName: 'vueperslides', sourceMap: true }
  ]
}
