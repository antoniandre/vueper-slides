import './style.scss'

export const highlight = {
  name: 'highlight',
  template:
    `<component :is="tag" :class="'highlight ' + type">
      <v-icon>{{icon}}</v-icon>
      <slot></slot>
    </component>`,
  props: {
    tag: {
      type: String,
      default: 'p'
    },
    type: {
      type: String,
      default: 'info'
    }
  },
  data: () => ({
  }),
  computed: {
    icon () {
      let icon

      switch (this.type) {
        case 'success':
          icon = 'check'
        break
        case 'error':
          icon = 'close'
        break
        case 'warning':
          icon = 'error_outline'
        break
        case 'tips':
        icon = 'wb_incandescent'
        break
        case 'info':
        default:
          icon = 'error_outline'
        break
      }

      return icon
    }
  }
}
