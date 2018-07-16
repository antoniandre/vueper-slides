import { VueperSlides, VueperSlide } from '../../../../dist/vueperslides'
import { precode } from '../../components/syntax-highlighter'
import { highlight } from '../../components/highlight-message'

import '../../../../dist/vueperslides.min.css'
import './style.scss'
import './examples.scss'

export default {
  components: {
    VueperSlides,
    VueperSlide,
    precode,
    highlight
  },
  template: require('./template.pug'),
  data: () => ({
    events: '',
    slideshowDisabled: false,
    parallax: 1,
    imagesRoot: process.env.NODE_ENV === 'production' ? './dist/images/' : './images/',
    breakpoints: {
      1200: {
        slideRatio: 1 / 5
      },
      1100: {
        slideRatio: 1 / 4
      },
      900: {
        slideRatio: 1 / 3
      },
      600: {
        slideRatio: 1 / 2,
        arrows: false,
        bulletsOutside: true
      }
    },
    colors: [
      '#42b983',
      '#2196f3',
      '#ffc107',
      '#ff5252'
    ],
    slides: [
      {
        id: 'slide-1',
        title: 'Slide <b style="font-size: 1.3em;color: yellow">#1</b>',
        content: 'Slide title can be HTML.<br>And so does the slide content, <span style="font-size: 1.2em;color: yellow">why not?</span>'
      },
      {
        id: 'slide-2',
        title: 'Slide <b style="font-size: 1.3em;color: #ff5252">#2</b>',
        content: 'Slide 2 content.'
      },
      {
        id: 'slide-3',
        title: 'Slide 3',
        content: 'Slide 3 content.'
      },
      {
        id: 'slide-4',
        title: 'Slide 4',
        content: 'Slide 4 content.'
      },
      {
        id: 'slide-5',
        title: 'Slide 5',
        content: 'Slide 5 content.'
      },
      {
        id: 'slide-6',
        title: 'Slide 6',
        content: 'Slide 6 content.'
      },
      {
        id: 'slide-7',
        title: 'Slide 7',
        content: 'Slide 7 content.'
      },
      {
        id: 'slide-8',
        title: 'Slide 8',
        content: 'Slide 8 content.'
      }
    ],
    slides2: [
      {
        title: 'Mountain 1',
        content: 'Slide 1 content.',
        image: require('../../assets/images/rough-horn-2146181_1280.jpg')
      },
      {
        title: 'Mountain 2',
        content: 'Slide 2 content.',
        image: require('../../assets/images/snow-3212345_1280.jpg')
      },
      {
        title: 'Mountain 3',
        content: 'Slide 3 content.',
        image: require('../../assets/images/snow-3237630_1280.jpg')
      }
    ],
    slides3: [
      {
        title: 'Slide 1',
        content: 'Slide 1 content.'
      },
      {
        title: 'Slide 2',
        content: 'Slide 2 content.'
      }
    ]
  }),
  methods: {
    logEvents (eventName, params) {
      this.events += `<b>&bull; Event:</b> ${eventName}, <b>Params:</b> ${JSON.stringify(params, null, 0)}<br>`
    },
    appendSlide () {
      this.slides3.push({
        title: `Programmagically appended slide ${this.slides3.length + 1}`,
        content: `Programmagically appended slide ${this.slides3.length + 1} content.`
      })
    },
    removeSlide () {
      this.slides3.pop()
    },
    toggleSlideshow () {
      this.slideshowDisabled = !this.slideshowDisabled
    }
  },
  created () {
    setTimeout(() => {
      this.disabled = true
    }, 3000)
    setTimeout(() => {
      this.disabled = false
    }, 6000)
  }
}
