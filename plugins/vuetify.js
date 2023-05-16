// plugins/vuetify.js
import 'vuetify/styles'
import { md2 } from 'vuetify/blueprints'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default defineNuxtPlugin(nuxtApp => {
  const myCustomLightTheme = {
    dark: false,
    colors: {
      background: '#FAFAFA',
      surface: '#FAFAFA',
      primary: '#C62828',
      'primary-darken-1': '#B71C1C',
      secondary: '#FFC400',
      'secondary-darken-1': '#FFAB00',
      error: '#B00020',
      info: '#42A5F5',
      success: '#66BB6A',
      warning: '#FFA726',
    },
  }

  const vuetify = createVuetify({
    theme: {
      defaultTheme: 'myCustomLightTheme',
      themes: {
        myCustomLightTheme,
      },
    },
    blueprint: md2,
    ssr: true,
    components,
    directives,
  })

  nuxtApp.vueApp.use(vuetify)
})
