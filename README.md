## Hey there!

I've recently created an opensource tool to get my life easier as a front-end developer. It's called heyho.io and you can find its repository [here](https://github.com/heyhoio/heyho).

I built it on top of Nuxt + Vuetify and it is a sum of several basic stuff that you can find everywhere on internet, but I decided to put them all in one place.

Since it's a bunch simple projects, I'm starting a series of posts where I'd like to share some experiences/code samples for each tool that was built there.

The first tool I will share here is the Palette Picker and Generator.

### Motivation

The main motivation to create this component is that because I wanted a tool to pick my favorite colors when developing faster, if not, randomize some nice color palette, not demanding do an extensive search for it over and over.

### Why NUXT?

[Nuxt](https://nuxtjs.org/) is an outstanding tool, developed on top of [Vue](https://vuejs.org/), it creates universal apps (apps that can execute both on the client and the server side) easier. Nuxt still gives us methods like [asyncData](https://nuxtjs.org/api/#the-asyncdata-method) and provides access to the properties like [isClient or isServer](https://nuxtjs.org/api/configuration-build/#extend). Nuxt has several awesome tooling, so the development process itself is extremely enjoyable.

And since the project's objective itself is to be `SEO` friendly, Nuxt is more than enough to achieve that.

### Pre-requisites

- Knowledge in HTML, CSS and JavaScript
- Pretty basic knowledge on VueJS
- Some knowledge in yarn or npm

### Complexity
- Basic

## 1. Create a Nuxt project

You can create a Nuxt project from `npx` or `yarn`. If you want the project structure to be built automatically, you can do as following:

npx create-nuxt-app color-palette-generator

or using yarn:

yarn create nuxt-app color-palette-generator

But for the sake of simplicity, I will start a project from scratch. So you will need to create an empty folder somewhere in your system:

`mkdir x-team\palette-picker-generator`

Navigate to `palette-picker-generator`

`cd .\x-team\palette-picker-generator`

```json
{
  "name": "palette-picker-generator",
  "scripts": {
    "dev": "nuxt"
  }
}
```

Install Nuxt (npm):

`npm install --save nuxt`

or yarn

`yarn add nuxt`

## 2. Create folder structure

Nuxt follows a strict structure in order to works (you can check it out [here](https://nuxtjs.org/guide/directory-structure)), so we'll need to create a `pages` folder:

`mkdir pages`

Navigate to `pages`:

`cd pages`

Create an `index.vue` file with the following:

```html
<template>
  <h1>Hello world!</h1>
</template>
```

## 3. Running the project

You can run the project with either `npm run dev` or `yarn dev`. By default, Nuxt will run on `localhost:3000`. If the port is already on use, Nuxt will grab a random port to host the application. To control that, you will need either kill the application running on 3000, or set another port. To do this, you should create a `nuxt.config.js` (that's a pretty important config file. Find more [here](https://nuxtjs.org/api/configuration-server#basic-example-code-nuxt-config-js-code-)) to the root of the project with the following:

```javascript
export default {
  server: {
    port: 3333
  }
}
```

## 4. Add Vuetify

Vuetify is an awesome components library we will use here. It's widely used through companies and it implements Material Design, which is awesome. To do that, do the following:

`yarn add @nuxtjs/vuetify -D`

or

`npm install @nuxtjs/vuetify -D`

Then, we will update `nuxt.config.js` adding the property `buildModules`:

```javascript
export default {
  // some config above
  buildModules: ['@nuxtjs/vuetify']
  // some config below
}
```

I'm not going to dive deeply into Vuetify, only the necessary for this tutorial.

## 5. Add some code:

Create the basic template to show some cards with nice colors you picked. Inside `template` tags we previously created on `pages/index.vue`, you should insert:

```html
<div v-for="(palette, index) in palettes" :key="index">
  <v-card
    v-for="color in palette.colors"
    :key="color"
    :style="{ backgroundColor: `#${color}` }"
  >
    <v-card-text>
      {{ color }}
    </v-card-text>
  </v-card>
</div>
```

See that we have an array `palettes` that should contain an array of colors inside. Then we do an nested iteration through `v-for` to get the color that should be shown.

Now, let's create that `palettes` array. Here's how:

```html
<script>
  import Vue from 'vue'

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
      ]
    })
  })
</script>
```

We've created two palettes (Velvet and Sunset) with its respectives colors.

This should show each card with something like this appearance:

![card](/static/card.png)

## 6. Styling

Now let's add some style to it. I choose for this project to use [SASS](https://sass-lang.com/). It has a lot of benefits, such as the use of functions, mixins, and a bunch of other really cool stuff. Besides that, is a pretty consolidated, if not the most, style sheet language.

Inside the tag `<style></style>` you will insert:

```scss
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
```

And to template:

```html
<div v-for="(palette, index) in palettes" :key="index">
  <h2 class="mt-5 mb-5 headline font-weight-light">
    {{ palette.name }}
  </h2>
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
```

It should result on this:

![palettes](/static/palettes.png)

## 7. Some nice palette generator

Currently we have a static page that will do nothing but show some pre-defined palettes. But we wont't stop by there.

For this project, we will use the [Colormind](http://colormind.io) API. They use machine learn to create color palettes. Pretty awesome, huh?

Let's get started:

## 7.1 A request problem

In order make a `http` request we could simply create a function that use `fetch` API to request some nice content, right? Yep, *almost* right. The problem with that approach is that if we choose to host our application using `https` and try to make a `http` request, well, we will find is [quite insecure](https://developers.google.com/web/fundamentals/security/prevent-mixed-content/what-is-mixed-content).

To solve that, we should create a Nuxt's [serverMiddleware](https://nuxtjs.org/api/configuration-servermiddleware/). What it will do is use a [connect](https://github.com/senchalabs/connect) instance to register additional routes without need for an external server to handle `http/https` requests.

The middleware is just a function that receives `request` and `response` objects and `next` function.

To do that, we create a file in `api/palette-picker.js` in the application root. Then write:

```javascript
import 'isomorphic-fetch'

export default async function(req, res, next) {
  const data = await fetch('http://colormind.io/api/', {
    method: 'POST',
    body: JSON.stringify({
      model: 'default'
    })
  })
    .then(result => result.json())
    .catch(console.log)

  res.end(JSON.stringify(data))
}
```

Note that we have to install `isomorphic-fetch` since `fetch` api is not available in server-side. To install it, type on your terminal:

`yarn add isomorphic-fetch`

or

`npm install isomorphic-fetch`

Now the function: basically this function will `POST` to Colormind API with the data model we want to use to get palettes. It returns a array of `RGBs`, just like this:

```json
{
  "result": [
    [190, 73, 73],
    [182, 144, 75],
    [222, 215, 173],
    [55, 152, 202],
    [33, 136, 116]
  ]
}
```

Then in our component:

```javascript
// Below script tag
import fetchColors from '@/utils/palette-picker'

// Inside methods object
methods: {
  //... some code above
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
      // here we can use some random name generator,
      // but for the sake of simplicity I'm going
      // to add just the length of array as the name
      name: this.palettes.length,
      colors
    })
  },
  //... some more code below
}
```

The functions above simply request a new palette, transforms the result to hex and create a new palette, then inserts as the first item in the array of palettes.

And in our template:

```html
<v-btn class="mb-5" @click="getPalette">
  Randomize
</v-btn>
```

## 8. Pick the color!

Now we will implement a function to copy the color to clipboard when user clicks on it. Here's how:

Add a `savePalette` function to `v-card` and pass the color to it.

```html
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
```

Then on `methods` object you implement as follows:

```javascript
methods: {
  // some code above
  savePalette(color) {
    navigator.clipboard.writeText(`#${color}`)
  }
  // some code below
}
```

It will copy the palette to your clipboard to use it in your project.

## 8. Conclusion

And basically that's it! You can do a lot more. For some more context, you can find the repository with all implementation details and the full code [here](https://github.com/douglas-pires/color-palette-generator) with some nice things, such as a Snackbar when user click on the color.

Also, you can find the running example [here](https://color-palette-generator.now.sh).

Again, if you are interest in the `HeyHo` project, you can find the repository [here](https://github.com/heyhoio/heyho). This series will continue eventually for the other tools too. So, keep tuned!
