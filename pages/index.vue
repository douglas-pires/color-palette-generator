<template>
  <div class="palette-picker-generator">
    <v-snackbar v-model="snackbar" :color="snackbarColor" :timeout="timeout">
      Color copied to clipboard
      <v-btn text @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
    <div>
      <h1 class="font-weight-thin mb-5 text-center">Palette Picker</h1>
      <v-btn class="mb-5" @click="getPalette">
        Randomize
      </v-btn>
      <div v-for="(palette, index) in palettes" :key="index">
        <h2 class="mt-5 mb-5 headline font-weight-light">{{ palette.name }}</h2>
        <div class="palette-picker-generator__palette-wrapper">
          <v-card
            v-for="color in palette.colors"
            :key="color"
            :style="{ backgroundColor: `#${color}` }"
            class="palette-picker-generator__palette-item"
            @click="savePalette(color)"
          >
            <v-card-text>
              {{ color }}
            </v-card-text>
          </v-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { generateName } from '@/utils/name-generator'

export default Vue.extend({
  name: 'PalettePicker',
  data: () => ({
    palettes: [
      {
        name: 'Velvet',
        colors: ['EE4540', 'C72C41', '801336', '510A32', '2D142C']
      },
      {
        name: 'Sunset',
        colors: ['8FB9A8', 'FEFAD4', 'FCD0BA', 'F1828D', '765D69']
      }
    ],
    snackbar: false,
    snackbarColor: 'primary',
    timeout: 2000
  }),
  methods: {
    toHex(r, g, b) {
      return [r, g, b]
        .reduce((acc, curr) => {
          let hex = Number(curr).toString(16)
          acc.push(hex.length < 2 ? (hex = '0' + hex) : hex)
          return acc
        }, [])
        .join('')
    },
    async getPalette() {
      const { result } = await fetch('api/palette-picker')
        .then(result => result.json())
        .catch(console.log)

      const colors = result.map(colors => {
        const [r, g, b] = colors
        return this.toHex(r, g, b)
      })
      this.palettes.unshift({
        name: generateName(),
        colors
      })
    },
    savePalette(color) {
      navigator.clipboard.writeText(`#${color}`)
      this.snackbarColor = `#${color}`
      this.snackbar = true
    }
  },
  head() {
    return {
      title: 'Color Picker and Theme Viewer',
      meta: [
        {
          hid: 'color picker and theme viewer',
          name: 'Color Picker and Theme Viewer',
          content:
            'A color picker and theme viewer to get an ready-to-use visualization on some nice colors to use into your UI'
        },
        {
          'http-equiv': 'Content-Security-Policy',
          content: 'upgrade-insecure-requests'
        }
      ]
    }
  }
})
</script>

<style lang="scss">
.palette-picker-generator {
  padding: 20px;
  display: flex;
  justify-content: center;
  &__palette-wrapper {
    display: flex;
  }
  &__palette-item {
    cursor: pointer;
    width: 200px;
    height: 200px;
  }
}
</style>
