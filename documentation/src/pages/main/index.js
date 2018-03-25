import Vue from 'vue'
import { VueperSlides, VueperSlide } from '../../../../dist/vueperslides.umd'
import { precode } from '../../components/syntax-highlighter'

import './style.scss'
import './examples.scss'

export default Vue.extend({
  components: {
    VueperSlides,
    VueperSlide,
    precode
  },
  template: require('./template.pug'),
  data: () => ({
    events: '',
    colors: [
      '#4caf50',
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
        id: 'mountain-1',
        image: 'rough-horn-2146181_1280.jpg',
        title: 'Mountain 1',
        content: 'Slide 1 content.'
      },
      {
        id: 'mountain-2',
        image: 'snow-3212345_1280.jpg',
        title: 'Mountain 2',
        content: 'Slide 2 content.'
      },
      {
        id: 'mountain-3',
        image: 'snow-3237630_1280.jpg',
        title: 'Mountain 3',
        content: 'Slide 3 content.'
      }
    ]
  }),
  methods: {
    logEvents: function (eventName, params) {
      this.events += `<b>Event:</b> ${eventName}, <b>Params:</b> ${JSON.stringify(params, null, 0)}<br>`
    }
  }
})
