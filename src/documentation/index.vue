<template lang="pug">
.documentation
  vueper-slides.ex--hero(
    lazy
    lazy-load-on-drag
    parallax
    parallax-fixed-content
    :breakpoints="{ 800: { fixedHeight: '300px' } }")
    vueper-slide(v-for="(slide, i) in slides2" :key="i" :image="slide.image")
      template(#content)
        .vueperslide__title {{ slide.title }}
        .vueperslide__content
          | Photo by
          a(:href="slide.link" target="_blank") {{ slide.content.substring(9) }}
      template(#loader)
        w-progress(circle color="primary" indeterminate)
        span.mt3.primary.title2 Loading...

  h2
    a(href="#features" :v-scroll-to="'#features'") Features
    a(id="features" name="features")
  div.max-widthed.mb5.features
    w-icon.pr2(color="secondary" lg) material-icons check
    strong SUPPORTS VUE 3 and VUE 2.
    br
    w-icon.pr2(color="secondary" lg) material-icons check
    strong Supports Videos with customizable attributes.
    br
    w-icon.pr2(color="secondary" lg) material-icons check
    | #[strong Fully responsive] and scales with its container.#[br]
    w-icon.pr2(color="secondary" lg) material-icons check
    | #[strong Touch ready] &amp; mouse dragging for desktop.#[br]
    w-icon.pr2(color="secondary" lg) material-icons check
    | #[strong Accessibility friendly] &amp; keyboard navigation.#[br]
    w-icon.pr2(color="secondary" lg) material-icons check
    | #[strong Highly customizable].#[br]
    w-icon.pr2(color="secondary" lg) material-icons check
    | #[strong Lazy loading].#[br]
    w-icon.pr2(color="secondary" lg) material-icons check
    | Show multiple items per slides.#[br]
    w-icon.pr2(color="secondary" lg) material-icons check
    | #[strong Infinite looping], customizable arrows or disable arrow on a slideshow end, autoplay.#[br]
    w-icon.pr2(color="secondary" lg) material-icons check
    | Built-in #[strong parallax] effect &amp; #[strong 3D rotation].#[br]
    w-icon.pr2(color="secondary" lg) material-icons check
    | #[strong Breakpoints] with different configuration.#[br]
    w-icon.pr2(color="secondary" lg) material-icons check
    | Slide content supports #[strong title &amp; description, inside OR outside] the current slide.#[br]
    w-icon.pr2(color="secondary" lg) material-icons check
    | #[strong Add or remove slides] on the fly, #[strong disable or enable the slideshow].#[br]
    w-icon.pr2(color="secondary" lg) material-icons check
    | Uses #[strong CSS animations] &amp; comes with a minimum of styles (using the #[i BEM] convention).#[br]
    w-icon.pr2(color="secondary" lg) material-icons check
    | #[strong Emitted events] for callbacks, etc...#[br]
    w-icon.pr2(color="secondary" lg) material-icons check
    | #[strong Supports RTL] direction

  .max-widthed.mt10.mb5.title2 Github project
  w-flex.max-widthed(align-center shrink)
    w-icon.ml1.mr5.lightgrey(size="46") fab fa-github
    a(href="https://github.com/antoniandre/vueper-slides" target="_blank") //github.com/antoniandre/vueper-slides #[w-icon(color="primary") material-icons open_in_new]

  w-flex.max-widthed.mb8.mt6(align-center)
    w-icon.mr4(size="50" color="pink-light3") material-icons favorite
    w-alert.ma0.pl5(border-left color="pink" style="width: 100%;max-width: 620px")
      | If you like Vueper Slides, you can
      a.pink.mx2(
        href="https://github.com/sponsors/antoniandre"
        target="_blank"
        style="text-decoration: underline") #[strong Sponsor me]
      | or
      a.pink.ml2(
        href="https://www.paypal.me/antoniandre1"
        target="_blank"
        style="text-decoration: underline") #[strong buy me a coffee]
      | !
      div Thank you so much to all the backers! #[span.title2.ml1 🙏]

  w-flex.max-widthed.my8(align-center)
    svg.mr4.blue-light1(viewBox="0 0 725 477" style="width: 50px;stroke: #497ca2;stroke-width: 5px")
      path(fill="#497ca2" d="M449 0c-78 5-152 39-217 82-19 13-37 26-54 40-39 1-77 15-110 34-34 21-53 60-61 99-11 52-8 108 6 159 7 23 16 46 33 63 4-4 13-4 13-11-1-5-7-8-9-14-27-48-32-108-11-159 13-32 36-63 68-77 19-9 42-7 58 6 6 7 18 4 24-2 6-4 11-10 19-10-24 25-39 60-38 95 1 15 3 31 8 45 16 36 41 69 76 89 5 2 10 6 16 7 5-2 14-5 14-12-4-9-14-12-21-18-27-23-56-48-67-82-9-29-1-60 8-88 7-15 21-32 39-29 15 1 28 13 43 8 11-5 13-17 16-27 5-17 3-38-10-51-16-18-40-23-62-25l-11-2c23-19 53-26 81-31 21-3 43-5 64-2 18 3 28 21 42 31-33 47-57 102-56 159a170 170 0 0086 149c6-1 13-7 10-14-5-11-17-16-25-25-33-30-52-75-50-121 1-29 11-58 24-84 12-25 25-52 47-71 9-8 22-13 33-7 20 8 42 14 63 13-35 27-55 70-64 113-9 44-7 91 12 133 15 37 45 68 81 85 32 16 67 24 101 27 18 1 36 2 53-4 4-1 6-7 2-9-13-6-28-4-42-6-45-5-92-16-127-45-34-28-54-71-60-114-5-47 7-97 34-137 11-15 26-31 45-34 14-1 25 12 31 23 6 12 16 24 29 28 20-10 40-26 43-50 2-17-6-34-14-49-15-25-40-43-69-48-20-5-41-2-61-6-22-21-54-24-83-24zm6 21c22 0 48 5 62 25 4 7 8 16 8 24-1 10-10 22-21 19-9-7-18-14-30-16-14-4-31-1-43 8-6 6-17 8-24 2-9-6-17-15-28-17-27-7-54 1-81 6a364 364 0 01157-51zm117 29c33 0 66 25 72 58 3 12 3 28-8 35-3 2-6 4-8 1-8-12-12-27-23-37-3-7-12-8-19-9-13-2-26 0-39-4 7-7 6-17 4-25l-3-16 24-3zm-372 92l46 2c18 2 33 16 34 34 1 7 1 17-6 21-6 0-12-4-18-6-21-8-46-14-67-3-6 2-11 9-17 5-10-4-18-14-30-12-30 1-56 21-77 42-16 17-30 37-43 56 0-39 17-80 49-104 26-22 61-30 94-34l35-1z")
    w-alert.ma0.pl5(border-left color="pale-blue" style="width: 100%;max-width: 620px")
      strong
        | Check out my Vue UI framework!
        a.title2.ml4(
          href="https://antoniandre.github.io/wave-ui"
          target="_blank"
          style="width: 50px;color: #1471b8;text-decoration: underline")
            strong Wave UI

  h2
    a(href="#installation" :v-scroll-to="'#installation'") Installation
    a(id="installation" name="installation")
  p You have two options: #[em.mr1 NPM] or #[span.ml1.code &lt;script&gt;] tag.
  h3.mt12 Via NPM
  p.w-flex.align-center.mt6.xs-column.xs-align-start.shrink
    ssh-pre.ma0(language="shell") npm i vueperslides # Vue 3.
    span.mx6 or
    ssh-pre.ma0(language="shell") npm i vueperslides@legacy # Vue 2.
  p.mt4 Then import the 2 components and use it:
  ssh-pre(language="js" label="Javascript").
    // In your Vue.js component.
    import { VueperSlides, VueperSlide } from 'vueperslides'
    import 'vueperslides/dist/vueperslides.css'
    ...

    export default {
      components: { VueperSlides, VueperSlide },
      ...
    }

  h3.mt12 Via #[span.code &lt;script&gt;] tag
  p Include the Vueper Slides script in your document #[code &lt;head&gt;] as follows:
  ssh-pre(language="html" label="HTML").
    &lt;head&gt;
      ...
      &lt;script src="https://unpkg.com/vue"&gt;&lt;/script&gt;
      &lt;script src="https://unpkg.com/vueperslides"&gt;&lt;/script&gt;
      &lt;link href="https://unpkg.com/vueperslides/dist/vueperslides.css" rel="stylesheet"&gt;
    &lt;/head&gt;
  p Then define the component to use in your template:
  ssh-pre(language="js" label="Javascript").
    // In your Vue.js component.
    export default {
      components: { VueperSlides, VueperSlide }
    }

  h2
    a(href="#how-to-use" :v-scroll-to="'#how-to-use'") How to use
    a(id="how-to-use" name="how-to-use")
  p.
    Once included in your project, use as follows.#[br]
    Check the #[a(href="#examples" :v-scroll-to="'#examples'") examples] &amp; #[a(href="#vueper-slides--api" :v-scroll-to="'#vueper-slides--api'") API] sections to know more.
  ssh-pre(language="html-vue" label="HTML Vue Template").
    &lt;vueper-slides&gt;
      &lt;vueper-slide
        v-for="(slide, i) in slides"
        :key="i"
        :title="slide.title"
        :content="slide.content"&gt;
      &lt;/vueper-slide&gt;
    &lt;/vueper-slides&gt;

  w-flex
    ssh-pre.grow(language="js" label="Using Vue 3 <script setup>").
      const slides = [
        {
          title: 'Slide #1',
          content: 'Slide 1 content.'
        },
        {
          title: 'Slide #2',
          content: 'Slide 2 content.'
        }
      ]
    w-divider or
    ssh-pre.grow(language="js" label="Vue 2 or Vue 3 without composition API").
      data: () => ({
        slides: [
          {
            title: 'Slide #1',
            content: 'Slide 1 content.'
          },
          {
            title: 'Slide #2',
            content: 'Slide 2 content.'
          }
        ]
      })

  h2
    a(href="#examples" :v-scroll-to="'#examples'") Examples of Use
    a(id="examples" name="examples")
  p Here is a list of useful examples, but you can also try it yourself on #[a(href="https://codepen.io/antoniandre/pen/jevjoQ" target="_blank") codepen.io #[w-icon(color="primary") material-icons open_in_new]].

  h3
    a(href="#ex--simplest-ever" :v-scroll-to="'#ex--simplest-ever'") Simplest Ever
    a(id="ex--simplest-ever" name="ex--simplest-ever")
  vueper-slides.ex--simplest-ever
    vueper-slide(v-for="i in 5" :key="i" :title="i.toString()")
  ssh-pre(language="html-vue" label="HTML Vue Template").
    &lt;vueper-slides&gt;
      &lt;vueper-slide v-for="i in 5" :key="i" :title="i.toString()" /&gt;
    &lt;/vueper-slides&gt;

  h3
    a(href="#ex--basic" :v-scroll-to="'#ex--basic'") Basic with Autoplay &amp; Infinite
    a(id="ex--basic" name="ex--basic")
  p
    | The autoplay circles between all the slides and goes back to the begining after the last slide.#[br]
    | You can also pause and resume the autoplay from an external button using Vue refs like this:
    w-button.ml2(
      bg-color="primary"
      @click="toggleAutoplay")
      w-icon.mr1(lg) material-icons {{ autoPlaying ? 'pause_circle_outline' : 'play_circle_outline' }}
      | {{ autoPlaying ? 'Pause' : 'Resume' }}
    w-button.ml2(
      :bg-color="pauseOnHover ? 'primary' : ''"
      :outline="!pauseOnHover"
      @click="pauseOnHover = !pauseOnHover")
      w-icon.mr1(v-if="pauseOnHover" lg) material-icons check
      | Pause on mouseover
    code.ml2 Currently {{ internalAutoPlaying ? 'playing' : 'paused' }}
  vueper-slides.ex2(
    ref="exBasic"
    autoplay
    :pause-on-hover="pauseOnHover"
    @autoplay-pause="internalAutoPlaying = false"
    @autoplay-resume="internalAutoPlaying = true")
    template(#pause)
      w-icon(lg color="white") material-icons pause_circle_outline
    vueper-slide(v-for="(slide, i) in slides1" :key="slide.id" :title="slide.title" :content="slide.content" :style="'background-color: ' + colors[i % 4]")

  p.subtitle-1.mt6 Basic autoplay (with pause on mouseover) source code:
  ssh-pre.mt2(language="html-vue" label="Vue Template").
    &lt;vueper-slides autoplay&gt;
      &lt;vueper-slide v-for="(slide, i) in slides"
        :key="slide.id"
        :title="slide.title"
        :content="slide.content"
        :style="'background-color: ' + colors[i % 4]" /&gt;
      &lt;template #pause&gt;
        &lt;i class="icon pause_circle_outline"&gt;&lt;/i&gt;
      &lt;/template&gt;
    &lt;/vueper-slides&gt;

  p.subtitle-1 This example full source code:
  ssh-pre.mt2(language="html-vue" label="Vue Template").
    &lt;button @click="$refs.myVueperSlides[`${autoPlaying ? 'pause' : 'resume'}Autoplay`]();autoPlaying = !autoPlaying"&gt;
      {{ "\{\{ autoPlaying ? 'Pause' : 'Resume' \}\}" }}
    &lt;/button&gt;
    &lt;button @click="pauseOnHover = !pauseOnHover"&gt;Pause on mouseover&lt;/button&gt;
    &lt;code&gt;Currently {{ "\{\{ internalAutoPlaying ? 'playing' : 'paused' \}\}" }}&lt;/code&gt;

    &lt;vueper-slides
      ref="myVueperSlides"
      autoplay
      :pause-on-hover="pauseOnHover"
      @autoplay-pause="internalAutoPlaying = false"
      @autoplay-resume="internalAutoPlaying = true"&gt;
      &lt;vueper-slide
        v-for="(slide, i) in slides"
        :key="slide.id"
        :title="slide.title"
        :content="slide.content"
        :style="'background-color: ' + colors[i % 4]" /&gt;
      &lt;template #pause&gt;
        &lt;i class="icon pause_circle_outline"&gt;&lt;/i&gt;
      &lt;/template&gt;
    &lt;/vueper-slides&gt;
  ssh-pre(language="js" label="Vue JS component").
    data: () => ({
      pauseOnHover: true,
      autoPlaying: true,
      internalAutoPlaying: true,
      slides: [
        {
          id: 'slide-1',
          title: 'Slide &lt;b style="font-size: 1.3em;color: yellow"&gt;#1&lt;/b&gt;',
          content: 'Slide title can be HTML.&lt;br&gt;And so does the slide content, &lt;span style="font-size: 1.2em;color: yellow"&gt;why not?&lt;/span&gt;'
        },
        // Other slides...
      ]
    })

  h3
    a(href="#ex--arrows-and-bullets" :v-scroll-to="'#ex--arrows-and-bullets'") Custom Arrows &amp; Bullets
    a(id="ex--arrows-and-bullets" name="ex--arrows-and-bullets")

  h4.primary Common to arrows and bullets
  ul.max-widthed
    li.
      #[strong Inside or outside of the slideshow:] #[code arrows-outside],
      #[code bullets-outside].
    li #[strong Disable:] #[code :arrows="false"], #[code :bullets="false"].

  h4.primary Arrows
  p.
    You can easily customize the default arrows, for instance the color
    #[code .vueperslides__arrow {color: yellow}], and thickness:

  vueper-slides.ex--arrows-and-bullets-1.no-shadow(:infinite="false" :slide-ratio="0.22" :bullets="false")
    vueper-slide(v-for="i in 2" :key="i" :style="'background-color: ' + ['#42b983', '#ff5252'][i % 2]")
      template(#content)
        .vueperslide__content-wrapper
          div You can increase default arrows thickness just with:
          strong.code .vueperslides__arrow svg {stroke-width: 2}
  p.mt4.
    Or you can put your own arrows icons via the #[code #arrow-left] and
    #[code #arrow-right] slots.

  vueper-slides.ex--arrows-and-bullets-2.no-shadow(:infinite="false" :slide-ratio="0.22" :bullets="false")
    template(#arrow-left)
      w-icon(color="white" xl) material-icons undo
    template(#arrow-right)
      w-icon(color="white" xl) material-icons redo
    vueper-slide(
      v-for="i in 5"
      :key="i"
      :title="i.toString()"
      :style="'background-color: ' + colors[(i + 1) % 4]")

  ssh-pre(language="html-vue" label="HTML Vue Template").
    &lt;vueper-slides :infinite="false" :bullets="false"&gt;
      &lt;template #arrow-left&gt;
        &lt;i class="icon icon-arrow-left" /&gt;
      &lt;/template&gt;

      &lt;template #arrow-right&gt;
        &lt;i class="icon icon-arrow-right" /&gt;
      &lt;/template&gt;

      &lt;vueper-slide v-for="i in 5" :key="i" :title="i.toString()" /&gt;
    &lt;/vueper-slides&gt;

  h4.primary Bullets
  p.
    The bullets don't show numeric indexes by default, but they are there in case you need it,
    like in this example.#[br]
    Only #[code display: block] the span in the bullet and style as you wish.

  vueper-slides.ex--arrows-and-bullets-2.no-shadow(:infinite="false" :arrows="false" :slide-ratio="0.22" bullets-outside)
    vueper-slide(
      v-for="i in 5"
      :key="i"
      :title="i.toString()"
      :style="'background-color: ' + colors[(i + 1) % 4]")

  ssh-pre.mt2(language="css" label="CSS").
    .vueperslides__bullet .default {
      background-color: rgba(0, 0, 0, 0.3);
      border: none;
      box-shadow: none;
      transition: 0.3s;
      width: 16px;
      height: 16px;
    }

    .vueperslides__bullet--active .default {background-color: #42b983;}

    .vueperslides__bullet span {
      display: block;
      color: #fff;
      font-size: 10px;
      opacity: 0.8;
    }

  p.mt4.
    You can even put your own bullets, using the appropriate slot.#[br]
    #[code #bullets] will allow you to override the full list of bullets,
    whereas #[code #bullet] only lets you customize the content of each bullet.

  p.
    #[strong • Using #[code #bullet]]#[br]
    It should be enough in almost all the cases, and you don't have to bother with accessibility compliance
    or triggering events.
  vueper-slides.ex--arrows-and-bullets-3.no-shadow(
    :infinite="false"
    :arrows="false"
    :slide-ratio="0.22"
    bullets-outside)
    vueper-slide(
      v-for="i in 4"
      :key="i"
      :title="i.toString()"
      :style="'background-color: ' + colors[(i + 1) % 4]")
    template(#bullet="{ active, slideIndex, index }")
      w-icon.mr1(:style="'color: ' + colors[(index + 1) % 4]" lg) material-icons {{ active ? 'check_circle' : 'radio_button_unchecked' }}
      strong(:style="`color: ${colors[(index + 1) % 4]}`") Slide \#{{ index }}

  p.mb0 When using the #[code bullet] slot, 3 variables are accessible:
  ul.max-widthed.mt1
    li #[strong.code='active [boolean]:'] true if the current bullet is the current slide.
    li #[strong.code='slideIndex [Number]:'] the slide index (starting from 0).
    li #[strong.code='index [Number]:'] the current bullet index (starting from 1 for display).

  ssh-pre(language="html-vue" label="HTML Vue Template").
    &lt;vueper-slides :infinite="false" :arrows="false"&gt;
      &lt;vueper-slide v-for="i in 4" :key="i" :title="i.toString()" /&gt;

      &lt;template #bullet="{ active, slideIndex, index }"&gt;
        &lt;i class="icon"&gt;{{ "\{\{ active ? 'check_circle' : 'radio_button_unchecked' \}\}" }}&lt;/i&gt;
      &lt;/template&gt;
    &lt;/vueper-slides&gt;

  p.
    #[strong • Using #[code #bullets]]#[br]
    If you want more control on events and button wrapper.
    The drawback is that you have to handle more things yourself.
  vueper-slides.ex--arrows-and-bullets-4.no-shadow(
    :infinite="false"
    :arrows="false"
    :slide-ratio="0.22"
    bullets-outside)
    vueper-slide(
      v-for="i in 4"
      :key="i"
      :title="i.toString()"
      :style="'background-color: ' + colors[(i + 1) % 4]")
    template(#bullets="{ bulletIndexes, goToSlide, previous, next, currentSlide }")
      button.px1.py3.transparent--bg.bd0(
        v-for="(slideIndex, i) in bulletIndexes"
        :key="i"
        :class="{ 'active': currentSlide === slideIndex }"
        role="tab"
        :aria-label="`Slide ${i + 1}`"
        @click="goToSlide(slideIndex)"
        @keyup.left="previous()"
        @keyup.right="next()")
        w-icon(:style="'color: ' + colors[(i + 2) % 4]" lg)
          | material-icons {{ currentSlide === slideIndex ? 'check_circle' : 'radio_button_unchecked' }}

  p.mb0 When using the #[code bullets] slot, 5 variables are accessible:
  ul.max-widthed.mt1
    li.
      #[strong.code='bulletIndexes [Array]:'] The computed array of slide indexes (could be like
      #[code [3, 6, 9]] if sliding multiple slides at once).
    li.
      #[strong.code='goToSlide [Function]:'] the function to call to go to a slide - accept the
      slide index as a parameter.
    li #[strong.code='previous [Function]:'] the function to call to go to the previous slide.
    li #[strong.code='next [Function]:'] the function to call to go to the next slide.
    li #[strong.code='currentSlide [Number]:'] the current slide index (starting from 0).

  p.mt4.mb0 Let's see a simple working example first:
  ssh-pre.mt3(language="html-vue" label="Quick way").
    &lt;template #bullets="{ bulletIndexes, goToSlide, currentSlide }"&gt;
      &lt;span
        v-for="(slideIndex, i) in bulletIndexes" :key="i"
        :class="{ 'active': currentSlide === slideIndex }"
        @click="goToSlide(slideIndex)"&gt;
        &lt;i class="icon"&gt;{{ "\{\{ active ? 'check_circle' : 'radio_button_unchecked' \}\}" }}&lt;/i&gt;
      &lt;/span&gt;
    &lt;/template&gt;

  p.mb0 Now this example is more accessibility compliant for the following reasons:
  ul.max-widthed.mt1
    li The button tag allows keyboard navigation (button is focusable).
    li On keyup the left and right arrows of the keyboard go to the previous and next slides.
    li The aria-label and role attributes are defined.
  p.
    In the above demo, you can try to click on a bullet point, then navigate with #[kbd tab] and
    #[kbd shift] + #[kbd tab]. You will see the focus moving but not the current slide.#[br]
    To click go to the focused slide, you can press #[kbd enter] or #[kbd space].#[br]
    You can also navigate with the arrow keys and that will change the slide at the same time.#[br]
    When you drag the slide (mousemove or touchmove) the current slide bullet will also be focused.

  ssh-pre(language="html-vue" label="Accessibility compliant way").
    &lt;template #bullets="{ bulletIndexes, goToSlide, previous, next, currentSlide }"&gt;
      &lt;button
        v-for="(slideIndex, i) in bulletIndexes" :key="i"
        :class="{ 'active': currentSlide === slideIndex }"
        role="tab"
        :aria-label="`Slide ${i + 1}`"
        @click="goToSlide(slideIndex)"
        @keyup.left="previous()"
        @keyup.right="next()"&gt;
        &lt;i class="icon"&gt;{{ "\{\{ active ? 'check_circle' : 'radio_button_unchecked' \}\}" }}&lt;/i&gt;
      &lt;/button&gt;
    &lt;/template&gt;

  h3
    a(href="#ex--fractions-and-progress" :v-scroll-to="'#ex--fractions-and-progress'") Fractions &amp; Progress
    a(id="ex--fractions-and-progress" name="ex--fractions-and-progress")
  p.
    This example displays a slide fraction at the top left corner and a progress bar.
    You can show one or the other or both.#[br]
    Their content can be overridden using the #[code fraction] or the #[code progress] slots
    which both provide the #[code current] and #[code total] properties.#[br]
    The style of the fraction can be modified through the #[code vueperslides__fractions]
    and #[code vueperslides__progress] classes.#[br]
  vueper-slides.ex--simplest-ever(fractions progress)
    vueper-slide(v-for="i in 10" :key="i" :title="i.toString()")
  ssh-pre(language="html-vue" label="HTML Vue Template").
    &lt;vueper-slides fractions progress&gt;
      &lt;vueper-slide v-for="i in 10" :key="i" :title="i.toString()" /&gt;
    &lt;/vueper-slides&gt;

  ssh-pre(language="css" label="CSS").
    .vueperslides__progress {
      background: rgba(0, 0, 0, 0.25);
      color: #ff5252;
    }

  h3
    a(href="#ex--images-and-fading" :v-scroll-to="'#ex--images-and-fading'") Images &amp; Fading
    a(id="ex--images-and-fading" name="ex--images-and-fading")
  p.
    This example uses images and fading as the slide transition.#[br]
    The dragging ability to change slide is disabled via #[code :touchable="false"].
  vueper-slides.ex--images-and-fading(fade :touchable="false")
    vueper-slide(
      v-for="(slide, i) in slides2"
      :key="i"
      :image="slide.image"
      :title="slide.title"
      :content="slide.content")
  ssh-pre(language="html-vue" label="HTML Vue Template").
    &lt;vueper-slides fade :touchable="false"&gt;
      &lt;vueper-slide
        v-for="(slide, i) in slides"
        :key="i"
        :image="slide.image"
        :title="slide.title"
        :content="slide.content" /&gt;
    &lt;/vueper-slides&gt;

  ssh-pre(language="js" label="Javascript").
    // In your component's data.
    slides: [
      {
        title: 'El Teide Volcano, Spain',
        content: 'Photo by Max Rive',
        // You can also provide a URL for the image.
        image: require('@/assets/images/el-teide-volcano-spain.jpg')
      },
      // Other slides.
    ]

  h3
    a(href="#ex--lazyloading" :v-scroll-to="'#ex--lazyloading'") Lazy Loading
    a(id="ex--lazyloading" name="ex--lazyloading")
  p.
    In this example the images are bigger and take longer to load so you have more time to
    see the actual lazy loading.#[br]
    The lazy load of the next slide will be triggered on the #[code before-slide]
    hook when you navigate from arrows, bullets, and external #[code previous()],
    #[code next()] and #[code goToSlide()] function calls.#[br]
    If you use the #[code lazy-load-on-drag] option, the image of the next slide you are
    dragging towards will also get loaded.
  highlight.max-widthed.mb6(tag="div" type="tips")
    ul.ma0
      li.
        Once an image is loaded, it won't try to load anymore. But if the image fails to
        load for any reason, it will retry the next time the slide will become visible.
      li.
        2 events are fired that you may want to listen to: #[code image-loaded],
        #[code image-failed]. They both return the information of the slide being loaded.
      li.
        You can use the #[code loader] slot to add a spinner or a loading message
        of your choice.
      li.mt4.
        I suggest you should inspect what happens in the network tab of your browser dev tools
        and also try to simulate a slow network ;)

  vueper-slides.ex--lazyloading(lazy lazy-load-on-drag)
    vueper-slide(v-for="(slide, i) in lazyloadSlides" :key="i" :image="slide.image")
      template(#loader)
        w-progress(circle color="primary" indeterminate)
        span.mt3.primary.title2 Loading...

  ssh-pre(language="html-vue" label="HTML Vue Template").
    &lt;vueper-slides lazy lazy-load-on-drag&gt;
      &lt;vueper-slide v-for="(slide, i) in slides" :key="i" :image="slide.image"&gt;
        &lt;template #loader&gt;
          &lt;i class="icon icon-loader spinning"&gt;&lt;/i&gt;
          &lt;span&gt;Loading...&lt;/span&gt;
        &lt;/template&gt;
      &lt;/vueper-slide&gt;
    &lt;/vueper-slides&gt;
  ssh-pre(language="css" label="CSS").
    /* If you want to hide the slide description while loading. */
    .vueperslide--loading .vueperslide__content-wrapper {
      display: none !important;
    }

  h3
    a(href="#ex--link-on-the-whole-slide" :v-scroll-to="'#ex--link-on-the-whole-slide'") Link on the Whole Slide
    a(id="ex--link-on-the-whole-slide" name="ex--link-on-the-whole-slide")
  p.
    By default, you can put a link on the title or the description of the slide.#[br]
    But if you need to, you can also wrap the whole slide into a link using the #[code link] attribute of the #[code &lt;vueperslide&gt;] component.

  highlight(type="info").
    You can also open the link in a new tab with the option: #[code open-in-new] that you can add on
    each #[code &lt;vueper-slide&gt;] tag.
  vueper-slides.text-center.my4.ex--link-on-the-whole-slide(:dragging-distance="50")
    vueper-slide(
      v-for="(slide, i) in slides2"
      :key="i"
      :image="slide.image"
      :title="slide.title"
      :content="slide.content"
      :link="slide.link")
  ssh-pre(language="html-vue" label="HTML Vue Template").
    &lt;vueper-slides :dragging-distance="50"&gt;
      &lt;vueper-slide
        v-for="(slide, i) in slides"
        :key="i"
        :image="slide.image"
        :title="slide.title"
        :content="slide.content"
        :link="slide.link" /&gt;
    &lt;/vueper-slides&gt;

  ssh-pre(language="js" label="Javascript").
    // In your component's data.
    slides: [
      {
        title: 'El Teide Volcano, Spain',
        content: 'Photo by Max Rive',
        // You can also provide a URL for the image.
        image: require('@/assets/images/el-teide-volcano-spain.jpg'),
        link: 'https://www.maxrivephotography.com/index/C0000rU1RKCHdqwI/G0000X57AtIzuRX0/I0000Gvr9HqdtyXk'
      },
      // Other slides.
    ]

  h3
    a(href="#ex--complex-slide-title-and-content" :v-scroll-to="'#ex--complex-slide-title-and-content'") Complex Slide Title &amp; Content
    a(id="ex--complex-slide-title-and-content" name="ex--complex-slide-title-and-content")
  p.
    This example (and the next one #[a(href="#ex--updating-content" :v-scroll-to="'#ex--updating-content'") Updating Content]) shows how to use a complex html content with interpreted Vue.js keywords inside your slides.#[br]
    The #[code &lt;vueper-slide&gt;] tag accepts 2 slots called #[code title] &amp; #[code content]
    if using the html attributes #[code :title="..."] &amp; #[code :content="..."] is too restrictive for your content.

  vueper-slides.ex--complex-slide-content(:breakpoints="{ 500: { bulletsOutside: true } }")
    vueper-slide(
      v-for="i in 4"
      :key="i"
      :style="'background-color: ' + ['#ff5252', '#42b983'][i % 2]")
      template(#content)
        .vueperslide__content-wrapper
          .subtitle-1
            w-icon.mr2(color="white" lg) material-icons check
            | Complex content {{ i.toString() }} with Vue.js
            | {{ 1 === 1 ? 'interpreted' : 'non-interpreted' }} compilable content like
            | components &amp; #[span(v-pre) {{&nbsp;mustaches&nbsp;}}].
  ssh-pre(language="html-vue" label="HTML Vue Template").
    &lt;vueper-slides&gt;
      &lt;vueper-slide
        v-for="i in 4"
        :key="i"
        :style="'background-color: ' + ['#ff5252', '#42b983'][i % 2]"&gt;
        &lt;template #content&gt;
         &lt;i class="icon icon-check"&gt;&lt;/i&gt;
         Complex content with Vue.js {{ "\{\{ 1 === 1 ? 'interpreted' : 'non-interpreted' \}\}" }} compilable content &amp; &lt;span v-pre&gt;{{ '\{\{ mustaches \}\}' }}&lt;/span&gt;.
        &lt;/template&gt;
      &lt;/vueper-slide&gt;
    &lt;/vueper-slides&gt;
  highlight.pl6(type="info").
    If both #[code :content="..."] and #[code #content] are provided, the content slot will be displayed.

  h3
    a(href="#ex--updating-content" :v-scroll-to="'#ex--updating-content'") Updating Content Inside/Outside
    a(id="ex--updating-content" name="ex--updating-content")
  p.mb0.
    This example shows how Vueper Slides keeps content up to date reactively even when placed outside of the slide
    itself (where the content slot resides) and in an auto-playing slideshow.#[br]

    The content can be placed inside the slides (default) or outside above or bellow the slideshow.#[br]
    In this example the content is set in a slot (refer to #[a(href="#ex--complex-slide-title-and-content" :v-scroll-to="'#ex--complex-slide-title-and-content'") Complex Slide Title &amp; Content]
    for more details) and uses interpreted mustaches #[code(v-pre) {{ }}] and components like Vuetify's #[code v-icon] for instance.

  highlight.mt4(type="tips")
    strong.red WARNING: The following tip does not apply to Vue 3. Vue 3 resolves this internally.
    p.
      The only thing that does not keep updated by default - as more costly, is the slides clones
      (1 prepended, 1 appended to slides list when infinite mode).#[br]
      But you have an option to keep it always updated using #[code always-refresh-clones] like in this example.#[br]
      This is only for particular cases like this clock and you usually don't need this as the slides are copied from original content on mounted.
  w-flex.max-widthed.mb4(align-center wrap)
    w-flex.shrink.mr4(align-center wrap)
      w-button.mt2.mr2(bg-color="primary" @click="toggleSlidesTime")
        w-icon.pr2(lg) material-icons {{ slidesTimeTimerId ? 'highlight_off' : 'access_time' }}
        | {{ slidesTimeTimerId ? 'Stop' : 'Keep' }} updating time
      w-transition-expand(x)
        w-tag.mt2.grey.text-nowrap(v-if="slidesTimeTimerId === 0" outline) CPU says THANK YOU!
    w-flex(align-center wrap)
      w-button.mt2.mx2(bg-color="primary" @click="contentPositionChange")
        w-icon(lg) material-icons swap_vert
        | &nbsp;Move content position
      strong.mt2.code {{ contentPosition === 'false' ? ':' : '' }}slide-content-outside="#[span.primary {{ contentPosition }}]"
  vueper-slides.ex--updating-content(
    :slide-ratio="1 / 4"
    autoplay
    always-refresh-clones
    :slide-content-outside="contentPosition === 'false' ? false : contentPosition"
    slide-content-outside-class="text-center py4")
    vueper-slide(v-for="(slide, i) in slides4" :key="i" :style="'background-color: ' + ['#42b983', '#ff5252'][i % 2]")
      template(#content)
        .vueperslide__content-wrapper(style="flex-direction: row")
          w-icon.mr4(color="white" size="5em" lg) material-icons access_time
          span(style="font-size: 3.7em") {{ slide.title }}

  ssh-pre(language="html-vue" label="HTML Vue Template").
    &lt;button @click="toggleSlidesTime"&gt;Keep updating time&lt;/button&gt;

    &lt;vueper-slides :slide-ratio="1 / 4" autoplay :slide-content-outside="contentPosition"&gt;
      &lt;vueper-slide
        v-for="(slide, i) in slides"
        :key="i"
        :style="'background-color: ' + ['#42b983', '#ff5252'][i % 2]"&gt;
        &lt;template #content&gt;
          &lt;div class="vueperslide__content-wrapper" style="flex-direction: row"&gt;
            &lt;i class="material-icons"&gt;access_time&lt;/i&gt;
            &lt;span&gt;{{ '\{\{ slide.title \}\}' }}&lt;/span&gt;
          &lt;/div&gt;
        &lt;/template&gt;
      &lt;/vueper-slide&gt;
    &lt;/vueper-slides&gt;

  ssh-pre(language="js" label="Javascript").
    // In your Vue.js component.

    data: () => ({
      slidesTimeTimerId: null,
      slides: [
        { title: 'Time', content: 'Time in 5 hours: ' },
        { title: 'Time', content: 'Time in 5 hours: ' }
      ]
    }),
    methods: {
      toggleSlidesTime () {
        if (this.slidesTimeTimerId) {
          clearInterval(this.slidesTimeTimerId)
          this.slidesTimeTimerId = 0
        } else {
          this.updateSlidesWithTime()
          this.slidesTimeTimerId = setInterval(this.updateSlidesWithTime, 1000)
        }
      },
      updateSlidesWithTime () {
        this.slides.forEach(slide => {
          let time = new Date()
          slide.title = time.toLocaleTimeString()
          slide.content = 'Time in 5 hours: ' + new Date(time.getTime() + 5 * 3600000).toLocaleTimeString()
        })
      }
    }

  h3
    a(href="#ex--add-remove-slides--disable" :v-scroll-to="'#ex--add-remove-slides--disable'") Add / remove slides &amp; disable slideshow
    a(id="ex--add-remove-slides--disable" name="ex--add-remove-slides--disable")
  p
    | This example illustrates how to add or remove slides on the fly from a running Vueper Slides instance.#[br]
    | You can also completely freeze the slideshow and unfreeze when you want to.#[br]
    w-button.ma1(bg-color="primary" @click="appendSlide" )
      w-icon(lg) material-icons add
      | &nbsp; Add Slide
    w-button.ma1(bg-color="primary" @click="removeSlide" )
      w-icon(lg) material-icons remove
      | &nbsp; Remove Slide
    w-button.ma1(bg-color="secondary" @click="toggleSlideshow" )
      w-icon(lg) material-icons {{ slideshowDisabled ? 'check_circle' : 'highlight_off'}}
      | &nbsp; {{ slideshowDisabled ? 'Enable' : 'Disable' }} Slideshow
  highlight Note that the slideshow disables controls if you have only 1 slide or none.
  p The arrows are also disabled on edges in this example.

  vueper-slides(
    :slide-ratio="0.2"
    :infinite="false"
    disable-arrows-on-edges
    bullets-outside
    :disable="slideshowDisabled")
    vueper-slide(
      v-for="(slide, i) in slides3"
      :key="i"
      :title="slide.title"
      :content="slide.content"
      :style="'background-color: ' + ['#ff5252', '#42b983'][i % 2]")
  ssh-pre(language="html-vue" label="HTML Vue Template").
    &lt;button @click="appendSlide" &gt;
      &lt;i class="icon material-icons"&gt;add&lt;/i&gt; Add Slide
    &lt;/button&gt;
    &lt;button @click="removeSlide" &gt;
      &lt;i class="icon material-icons"&gt;remove&lt;/i&gt; Remove Slide
    &lt;/button&gt;
    &lt;button @click="toggleSlideshow" &gt;
      &lt;i class="icon material-icons"&gt; {{ "\{\{ slideshowDisabled ? 'check_circle' : 'highlight_off'\}\}" }}&lt;/i&gt; {{ "\{\{ slideshowDisabled ? 'Enable' : 'Disable' \}\}" }} Slideshow
    &lt;/button&gt;

    &lt;vueper-slides
      :slide-ratio="0.2"
      :infinite="false"
      disable-arrows-on-edges
      bullets-outside
      :disable="slideshowDisabled"&gt;
      &lt;vueper-slide
        v-for="(slide, i) in slides"
        :key="i"
        :title="slide.title"
        :content="slide.content"
        :style="'background-color: ' + ['#ff5252', '#42b983'][i % 2]" /&gt;
    &lt;/vueper-slides&gt;
  ssh-pre(language="js" label="Javascript").
    // In your Vue.js component.

    data: () => ({
      slides: [
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
      appendSlide () {
        this.slides.push({
          title: `Programmagically appended slide ${this.slides.length + 1}`,
          content: `Programmagically appended slide ${this.slides.length + 1} content.`
        })
      },
      removeSlide () {
        this.slides.pop()
      },
      toggleSlideshow () {
        this.slideshowDisabled = !this.slideshowDisabled
      }
    }

  h3
    a(href="#ex--center-mode" :v-scroll-to="'#ex--center-mode'") Center Mode
    a(id="ex--center-mode" name="ex--center-mode")
  p.
    This example demonstrates how to use Vueper Slides in a center mode.#[br]
    It also has a shorter transition speed #[code transition-speed='250']
    and no shadow thanks to the #[code no-shadow] class.
  vueper-slides.no-shadow.ex--center-mode.pt6(arrows-outside bullets-outside transition-speed="250")
    vueper-slide(v-for="i in 6" :key="i" :title="i.toString()" :style="'background-color: ' + ['#ff5252', '#42b983'][i % 2]")
  ssh-pre(language="html-vue" label="HTML Vue Template").
    &lt;vueper-slides class="no-shadow" arrows-outside bullets-outside transition-speed="250"&gt;
      &lt;vueper-slide
        v-for="i in 6"
        :key="i"
        :title="i.toString()"
        :style="'background-color: ' + ['#ff5252', '#42b983'][i % 2]" /&gt;
    &lt;/vueper-slides&gt;
  ssh-pre(language="css" label="CSS").
    .ex--center-mode {
      width: 600px;
      max-width: 100%;
      margin: auto;
    }

  h3
    a(href="#ex--events" :v-scroll-to="'#ex--events'") Emitted Events
    a(id="ex--events" name="ex--events")
  p.
    This example demonstrates how to use the vueper slides provided events and how to style the current slide.#[br]
    The events box bellow will log all the events triggered while using the slideshow along with their returned params.#[br]
    Change slide to see new events in the events box bellow.#[br]
    Read more about the emitted events in the #[a(href="#events" :v-scroll-to="'#events'") emitted events section].
  vueper-slides.ex--events(
    @ready="logEvents('ready', $event)"
    @previous="logEvents('previous', $event)"
    @next="logEvents('next', $event)"
    @before-slide="logEvents('before-slide', $event)"
    @slide="logEvents('slide', $event)"
    :slide-ratio="0.2"
    bullets-outside)
    vueper-slide(
      v-for="i in 6"
      :key="i"
      :title="i.toString()"
      :style="'background-color: ' + ['#ff5252', '#42b983'][i % 2]")

  pre.ssh-pre.events-box(data-label="Event box" style="min-height: 120px")
    w-flex.justify-space-between.mb2
      div.grey(v-if="logs")
        strong // event-name:
        span.ml2 params
      w-button(color="primary" sm outline @click="logs = []")
        w-icon.mr1() material-icons close
        | Clear logs
    div(v-for="(log, i) in logs")
      strong.mr2 {{ log.eventName }}:
      | {{ JSON.stringify(log.params) }}
    div.mt2 Listening...
  ssh-pre(language="html-vue" label="HTML Vue Template").
    &lt;vueper-slides
      @ready="logEvents('ready', $event)"
      @previous="logEvents('previous', $event)"
      @next="logEvents('next', $event)"
      @before-slide="logEvents('before-slide', $event)"
      @slide="logEvents('slide', $event)"
      :slide-ratio="0.2"
      bullets-outside&gt;
      &lt;vueper-slide
        v-for="i in 6"
        :key="i"
        :title="i.toString()" /&gt;
    &lt;/vueper-slides&gt;
  ssh-pre(language="js" label="Javascript").
    // In your Vue.js component.

    methods: {
      logEvents (eventName, params) {
        this.events += `&lt;strong&gt;${eventName}&lt;/strong&gt;, ${JSON.stringify(params)}&lt;br&gt;`
      }
    }
  ssh-pre(language="css" label="CSS").
    .vueperslide--active:before {
      content: 'This slide is active!';
      position: absolute;
      top: -18px;
      right: -18px;
      padding: 4px 25px;
      background: orange;
      color: #fff;
      font-size: 11px;
      transform: translateX(30%) rotate(45deg);
      transform-origin: 0 0;
      box-shadow: 0 0 9px rgba(0, 0, 0, 0.2);
    }

  h3
    a(href="#ex--breakpoints" :v-scroll-to="'#ex--breakpoints'") Using Breakpoints
    a(id="ex--breakpoints" name="ex--breakpoints")
  p.
    This example demonstrates how to set a different configuration per breakpoint. (Try resizing your browser above/bellow 600px width)#[br]
    Define your breakpoints as an object in your component and pass the object to the #[code &lt;vueper-slides&gt;] tag.#[br]
    Any breakpoint config you define will be applied when screen width is decreased to this value and under until next breakpoint.#[br]
    Above the first breakpoint, the main configuration is applied. E.g.
  ssh-pre(language="js").
    // Above 1200: main config.
    1200: { ... }, // From width = 1200px to width = 901.
    900: { ... }, // From width = 900px to width = 601.
    600: { ... } // From width = 600px to width = 0.
  vueper-slides.ex--breakpoints(:breakpoints="breakpoints")
    vueper-slide(v-for="i in 6" :key="i" :title="i.toString()" :style="'background-color: ' + ['#ff5252', '#42b983'][i % 2]")
  ssh-pre(language="html-vue" label="HTML Vue Template").
    &lt;vueper-slides :breakpoints="breakpoints"&gt;
      &lt;vueper-slide
        v-for="i in 6"
        :key="i"
        :title="i.toString()"
        :style="'background-color: ' + ['#ff5252', '#42b983'][i % 2]" /&gt;
    &lt;/vueper-slides&gt;
  ssh-pre(language="js" label="Javascript").
    // In your Vue.js component.

    data: () => ({
      breakpoints: {
        1200: {
          slideRatio: 1 / 5
        },
        900: {
          slideRatio: 1 / 3
        },
        600: {
          slideRatio: 1 / 2,
          arrows: false,
          bulletsOutside: true
        },
        // The order you list breakpoints does not matter, Vueper Slides will sort them for you.
        1100: {
          slideRatio: 1 / 4
        }
      },
    })

  h3
    a(href="#ex--dragging-distance" :v-scroll-to="'#ex--dragging-distance'") Dragging distance &amp; prevent y-axis scroll for touch-enabled slideshows
    a(id="ex--dragging-distance" name="ex--dragging-distance")
  p.
    This example demonstrates how to define a dragging distance and prevent the y-axis scrolling while dragging, for touch-enabled slideshows.#[br]
    By default the dragging distance is #[code 50%] of the slideshow width.#[br]
    This means that when you start dragging from one side you have to pass half-slide to
    change slide.#[br]
    With this configuration the behavior is slightly different and to change slide you
    need to drag more that the specified distance in pixels.#[br]
    If the dragging distance is lower than the specified one, the current slide remains the same.
  vueper-slides.ex--dragging-distance(:dragging-distance="70" prevent-y-scroll :breakpoints="{ 500: { bulletsOutside: true } }")
    vueper-slide(
      v-for="i in 6"
      :key="i"
      content="Drag the slide horizontally of 70px from anywhere to slide.<br>Test the disabled y-axis scroll on touch device!"
      :style="'background-color: ' + ['#ff5252', '#42b983'][i % 2]")
  ssh-pre(language="html-vue" label="HTML Vue Template").
    &lt;vueper-slides :dragging-distance="70" prevent-y-scroll&gt;
      &lt;vueper-slide
        v-for="i in 6"
        :key="i"
        content="Drag the slide horizontally..."
        :style="'background-color: ' + ['#ff5252', '#42b983'][i % 2]" /&gt;
    &lt;/vueper-slides&gt;

  h3
    a(href="#ex--parallax" :v-scroll-to="'#ex--parallax'") Parallax Effect
    a(id="ex--parallax" name="ex--parallax")
  p.
    This example demonstrates how to create a parallax effect on your slideshow.#[br]
    Two values can be set to obtain a different parallax effect: #[code 1] or #[code -1]
    for a standard or reversed effect.#[br]
    You might also want to set a fixed content on top of the moving background using
    the #[code parallax-fixed-content] option.
  w-flex.max-widthed.mb4(align-center wrap)
    w-button.my1.mr2( bg-color="primary" @click="parallax *= -1;$refs.exParallax.refreshParallax()")
      w-icon(lg) material-icons sync
      | &nbsp; Reverse parallax effect
    strong.code.mr4 :parallax="#[span.primary {{ parallax.toString() }}]"

    w-button.my1.mr2( bg-color="primary" @click="parallaxFixedContent = !parallaxFixedContent")
      w-icon(lg) material-icons {{ parallaxFixedContent ? 'close' : 'remove_from_queue' }}
      | &nbsp; Add a fix content
    strong.code :parallax-fixed-content="#[span.primary {{ parallaxFixedContent.toString() }}]"
  vueper-slides.ex--parallax(ref="exParallax" :parallax="parallax" :parallax-fixed-content="parallaxFixedContent")
    vueper-slide(
      v-for="(slide, i) in slides2"
      :key="i"
      :image="slide.image"
      :title="parallaxFixedContent ? slide.title : ''"
      :content="parallaxFixedContent ? slide.content : ''")
  ssh-pre(language="html-vue" label="HTML Vue Template").
    &lt;button @click="parallax *= -1;$refs.myVueperSlides.refreshParallax()"&gt;
      reverse parallax effect
    &lt;/button&gt;
    &lt;button @click="parallaxFixedContent = !parallaxFixedContent"&gt;
      Add a fix title
    &lt;/button&gt;

    &lt;vueper-slides ref="myVueperSlides" :parallax="parallax" :parallax-fixed-content="parallaxFixedContent"&gt;
      &lt;vueper-slide
        v-for="(slide, i) in slides" :key="i"
        :image="slide.image"
        :title="parallaxFixedContent ? slide.title : ''"
        :content="parallaxFixedContent ? slide.content : ''" /&gt;
    &lt;/vueper-slides&gt;
  ssh-pre(language="js" label="Javascript").
    // In your Vue.js component.
    data: () => ({
      parallax: 1,
      parallaxFixedContent: false
    })
  highlight(type="tips")
    strong.darktext.
      The parallax position is constantly recalculated while you scroll, or after a
      resize event.#[br]
      If for some reason you need to manually refresh the parallax position
      - like in this case when you press the "Reverse parallax effect" button
      you can call the #[code refreshParallax()] method from a Vueper Slides
      Vue.js ref, like in this example.#[br]#[br]
    span.
      For more details on referencing a Vueper Slides instance refer to the
      #[a(href="#ex--external-controls" :v-scroll-to="'#ex--external-controls'") External Controls] example.
  highlight.
    You may experience image jumps on scroll from this considerably long documentation page
    which has 30+ instances of Vueper Slides.

  h3
    a(href="#ex--fixed-height" :v-scroll-to="'#ex--fixed-height'") Fixed Height
    a(id="ex--fixed-height" name="ex--fixed-height")
  p.
    This example demonstrates how to set a fixed height on the slideshow.#[br]
    The attribute #[strong.darktext.code fixed-height]
    #[strong accepts either a Boolean or a String].
    Refer to the #[a(href="#vueper-slides-settings--fixed-height" :v-scroll-to="'#vueper-slides-settings--fixed-height'") settings &gt; fixed height] for more details.
  br

  vueper-slides.ex--fixed-height(:slide-ratio="1 / 2" fixed-height="500px")
    vueper-slide(v-for="(slide, i) in slides2" :key="i" :image="slide.image")
  ssh-pre(language="html-vue" label="HTML Vue Template").
    &lt;vueper-slides :slide-ratio="1 / 2" fixed-height="500px"&gt;
      &lt;vueper-slide v-for="(slide, i) in slides" :key="i" :image="slide.image" /&gt;
    &lt;/vueper-slides&gt;
  p #[strong.darktext You only need this CSS if you use #[code :fixed-height="true"]:]
  ssh-pre(language="css" label="CSS").
    /* You only need this if you use :fixed-height="true". */
    .vueperslides--fixed-height { height: 500px; }

  h3
    a(href="#ex--slide-image-inside" :v-scroll-to="'#ex--slide-image-inside'") Slide Image Inside
    a(id="ex--slide-image-inside" name="ex--slide-image-inside")
  p.
    This example demonstrates how to put the slide image in a div inside the slide container
    instead of the container itself.#[br]
    This allows you to CSS-transform the image as you want without impacting the behavior of
    the slideshow and without transforming your content. E.g. rotate image but not slide
    description.

  vueper-slides.ex--slide-image-inside(slide-image-inside)
    vueper-slide(v-for="(slide, i) in slides2" :key="i" :title="(i + 1).toString()" :image="slide.image")
  ssh-pre(language="html-vue" label="HTML Vue Template").
    &lt;vueper-slides slide-image-inside&gt;
      &lt;vueper-slide v-for="(slide, i) in slides" :key="i" :image="slide.image" /&gt;
    &lt;/vueper-slides&gt;
  ssh-pre(language="css" label="CSS").
    .vueperslide__image {
      transform: scale(1.5) rotate(-10deg);
    }

    .vueperslide__title {
      font-size: 7em;
      opacity: 0.7;
    }

  h3
    a(href="#ex--show-multiple-slides-and-gap" :v-scroll-to="'#ex--show-multiple-slides-and-gap'") Show Multiple Slides &amp; Gap
    a(id="ex--show-multiple-slides-and-gap" name="ex--show-multiple-slides-and-gap")
  p
    | The examples bellow demonstrate how to show multiple slides at the same time.#[br]
    strong You can choose to slide all the visible items at once or one by one.#[br]
    strong.
      Please Read more about Multiple Slides in the
      #[a(href="#vueper-slides-settings--slide-multiple" :v-scroll-to="'#vueper-slides-settings--slide-multiple'") Settings &gt; slide-multiple] details.

  h4 #[span.lightertext.title2 #1. ] 3 visible slides, sliding 3 by 3, dragging distance of 200px
  p.
    In this example a #[code gap] of 3% is applied between the slides and the option
    #[code slideMultiple] is set to #[code true], allowing to slide all the visible
    items at the same time.#[br]
    Additionally, a breakpoint is set at #[code 800px] to reduce #[code visibleSlides]
    &amp; #[code slideMultiple] to 2.
  vueper-slides.no-shadow.ex--show-multiple-slides-and-gap.slide-multiple(
    :visible-slides="3"
    slide-multiple
    :gap="3"
    :slide-ratio="1 / 4"
    :dragging-distance="200"
    :breakpoints="{ 800: { visibleSlides: 2, slideMultiple: 2 } }")
    vueper-slide(v-for="i in 10" :key="i" :title="i.toString()")
  ssh-pre(language="html-vue" label="HTML Vue Template").
    &lt;vueper-slides
      class="no-shadow"
      :visible-slides="3"
      slide-multiple
      :gap="3"
      :slide-ratio="1 / 4"
      :dragging-distance="200"
      :breakpoints="{ 800: { visibleSlides: 2, slideMultiple: 2 } }"&gt;
      &lt;vueper-slide v-for="i in 10" :key="i" :title="i.toString()" /&gt;
    &lt;/vueper-slides&gt;

  h4 #[span.lightertext.title2 #2. ] 3 visible slides, sliding 1 by 1, dragging distance of 70px
  p.
    When the option #[code slideMultiple] is set to false, and by default,
    changing slide only move by 1 slide at a time.
  vueper-slides.no-shadow.ex--show-multiple-slides-and-gap.ex1(
    :visible-slides="3"
    :slide-ratio="1 / 4"
    :dragging-distance="70")
    vueper-slide(v-for="i in 9" :key="i" :title="i.toString()")
  ssh-pre(language="html-vue" label="HTML Vue Template").
    &lt;vueper-slides
      class="no-shadow"
      :visible-slides="3"
      :slide-ratio="1 / 4"
      :dragging-distance="70"&gt;
      &lt;vueper-slide v-for="i in 9" :key="i" :title="i.toString()" /&gt;
    &lt;/vueper-slides&gt;

  h4 #[span.lightertext.title2 #3. ] 6 visible slides, sliding 1 by 1, full-width, no arrows, dragging distance of 70px
  vueper-slides.no-shadow.ex--show-multiple-slides-and-gap.ex2(
    :visible-slides="6"
    :arrows="false"
    :slide-ratio="1 / 4"
    :gap="3"
    :dragging-distance="70")
    vueper-slide(v-for="i in 9" :key="i" :title="i.toString()")
  ssh-pre(language="html-vue" label="HTML Vue Template").
    &lt;vueper-slides
      class="no-shadow"
      :visible-slides="6"
      :arrows="false"
      :slide-ratio="1 / 4"
      :gap="3"
      :dragging-distance="70"&gt;
      &lt;vueper-slide v-for="i in 9" :key="i" :title="i.toString()" /&gt;
    &lt;/vueper-slides&gt;

  h4 #[span.lightertext.title2 #4. ] 2 visible slides, full-width, sliding 2 by 2, with arrows inside and a 5% gap
  vueper-slides.no-shadow(
    :visible-slides="2"
    slide-multiple
    :slide-ratio="1 / 4"
    :gap="5"
    :arrows-outside="false")
    vueper-slide(
      v-for="i in 6"
      :key="i"
      :title="i.toString()"
      :style="'background-color: ' + ['#ff5252', '#42b983'][i % 2]")
  ssh-pre(language="html-vue" label="HTML Vue Template").
    &lt;vueper-slides
      class="no-shadow"
      :visible-slides="2"
      slide-multiple
      :slide-ratio="1 / 4"
      :gap="5"
      :arrows-outside="false"&gt;
      &lt;vueper-slide v-for="i in 6" :key="i" :title="i.toString()" /&gt;
    &lt;/vueper-slides&gt;

  h4 #[span.lightertext.title2 #5. ] 3 visible slides, fading.
  vueper-slides(
    fade
    :visible-slides="3"
    slide-multiple
    :slide-ratio="1 / 4"
    :arrows-outside="false")
    vueper-slide(
      v-for="i in 12"
      :key="i"
      :title="i.toString()"
      :style="'background-color: ' + ['#ff5252', '#42b983'][i % 2]")
  ssh-pre(language="html-vue" label="HTML Vue Template").
    &lt;vueper-slides
      fade
      :visible-slides="2"
      slide-multiple
      :slide-ratio="1 / 4"
      :arrows-outside="false"&gt;
      &lt;vueper-slide v-for="i in 12" :key="i" :title="i.toString()" /&gt;
    &lt;/vueper-slides&gt;

  h3
    a(href="#ex--3d-rotation" :v-scroll-to="'#ex--3d-rotation'") 3D Rotation
    a(id="ex--3d-rotation" name="ex--3d-rotation")
  p.
    This example demonstrates how to use a 3D rotation transition.#[br]
    Refer to the #[a(href="#vueper-slides-settings--3d" :v-scroll-to="'#vueper-slides-settings--3d'") settings &gt; 3D Rotation] for more details.

  vueper-slides.mb8.ex--3d-rotation(3d fixed-height="300px" arrows-outside bullets-outside)
    vueper-slide(v-for="i in 9" :key="i" :title="i.toString()" :style="'background-color: ' + ['#ff5252', '#42b983'][i % 2]")
  br
  ssh-pre(language="html-vue" label="HTML Vue Template").
    &lt;vueper-slides 3d fixed-height="300px" arrows-outside bullets-outside&gt;
      &lt;vueper-slide v-for="i in 9" :key="i" :title="i.toString()" /&gt;
    &lt;/vueper-slides&gt;

  h3
    a(href="#ex--external-controls" :v-scroll-to="'#ex--external-controls'") External Controls
    a(id="ex--external-controls" name="ex--external-controls")
  p.
    This example demonstrates how to control Vueper Slides from wherever you want.
    ...In your code, not wherever on Earth.#[br]
    By using a #[a(href="https://vuejs.org/v2/api/#ref" target="_blank") Vue JS reference #[w-icon(color="primary") material-icons open_in_new]] on your slideshow, you can access any method it
    contains from outside.#[br]
    Now that you have the power, here is a list of methods you may find useful:
  ul.max-widthed.mb3
    li #[strong.darktext.code previous()]: go to the previous slide,
    li #[strong.darktext.code next()]: go to the next slide.
    li.
      #[strong.darktext.code getSlideData(index)]: returns all the available
      information on a slide given its index.
    li.
      #[strong.darktext.code= 'goToSlide(index [, options])']: go to a slide
      given its index.#[br]You can also call
      #[strong.darktext.code goToSlide(index, { animation: false })]
      to disable the animation.
    li.
      #[strong.darktext.code refreshParallax()]: recalculates the parallax
      position if you are using a parallax effect.#[br]
      refer to the #[a(href="#ex--parallax" :v-scroll-to="'#ex--parallax'") Parallax Effect] example.

  div.text-center.mb3
    w-button.ma1(bg-color="primary"  @click="$refs.myVueperSlides.previous()")
      w-icon(lg) material-icons arrow_back
      | &nbsp; Previous
    w-button.ma1(bg-color="primary"  @click="$refs.myVueperSlides.goToSlide(5)")
      w-icon(lg) material-icons call_made
      | &nbsp; Go to slide 6
    w-button.ma1(bg-color="primary"  @click="$refs.myVueperSlides.next()")
      w-icon(lg) material-icons arrow_forward
      | &nbsp; Next
  vueper-slides(:slide-ratio="1/5" ref="myVueperSlides")
    vueper-slide(v-for="i in 10" :key="i" :title="i.toString()" :style="'background-color: ' + ['#ff5252', '#42b983'][i % 2]")
  ssh-pre(language="html-vue" label="HTML Vue Template").
    &lt;button @click="$refs.myVueperSlides.previous()"&gt;Previous&lt;/button&gt;
    &lt;!-- (6 - 1) since slide index starts from 0. --&gt;
    &lt;button @click="$refs.myVueperSlides.goToSlide(6 - 1)"&gt;Go to slide 6&lt;/button&gt;
    &lt;button @click="$refs.myVueperSlides.next()"&gt;Next&lt;/button&gt;

    &lt;vueper-slides ref="myVueperSlides"&gt;
      &lt;vueper-slide v-for="i in 10" :key="i" :title="i.toString()" /&gt;
    &lt;/vueper-slides&gt;

  h3
    a(href="#ex--synced-instances" :v-scroll-to="'#ex--synced-instances'") Sync 2 instances
    a(id="ex--synced-instances" name="ex--synced-instances")
  p.
    This example demonstrates how to sync 2 Vueper Slides instances.#[br]
    You can use any navigation controller from both sliders and keep the current slide in sync.
  highlight(type="tips")
    strong.
      The key here is to disable the event emission with #[code `{ emit: false }`] when changing slide.#[br]
      This allows a 2-way syncing without ending up in an infinite loop.
  vueper-slides.ex--synced-instances(
    ref="vueperslides1"
    @slide="$refs.vueperslides2 && $refs.vueperslides2.goToSlide($event.currentSlide.index, { emit: false })"
    :slide-ratio="1 / 4"
    :bullets="false")
    vueper-slide(
      v-for="i in 8"
      :key="i"
      :title="i.toString()"
      content="Navigation in sync"
      :style="'background-color: ' + ['#ff5252', '#42b983'][i % 2]")
  br
  vueper-slides.ex--synced-instances.no-shadow.ex--synced-instances-2(
    ref="vueperslides2"
    :dragging-distance="50"
    @slide="$refs.vueperslides1 && $refs.vueperslides1.goToSlide($event.currentSlide.index, { emit: false })"
    :visible-slides="3"
    fixed-height="120px")
    vueper-slide(
      v-for="i in 8"
      :key="i"
      @click.native="$refs.vueperslides2 && $refs.vueperslides2.goToSlide(i - 1)")
      template(#content)
        .vueperslide__content-wrapper(:style="'background-color: ' + ['#ff5252', '#42b983'][i % 2]")
          .vueperslide__title {{ i.toString() }}

  ssh-pre(language="html-vue" label="HTML Vue Template").
    &lt;vueper-slides
      ref="vueperslides1"
      @slide="$refs.vueperslides2 &amp;&amp; $refs.vueperslides2.goToSlide($event.currentSlide.index, { emit: false })"
      :slide-ratio="1 / 4"
      :bullets="false"&gt;
      &lt;vueper-slide
        v-for="i in 8"
        :key="i"
        :title="i.toString()"
        content="Navigation in sync"
        :style="'background-color: ' + ['#ff5252', '#42b983'][i % 2]" /&gt;
    &lt;/vueper-slides&gt;

    &lt;vueper-slides
      ref="vueperslides2"
      :slide-ratio="1 / 8"
      :dragging-distance="50"
      @slide="$refs.vueperslides1 &amp;&amp; $refs.vueperslides1.goToSlide($event.currentSlide.index, { emit: false })"
      :visible-slides="3"
      fixed-height="100px"&gt;
      &lt;vueper-slide
        v-for="i in 8"
        :key="i"
        @click.native="$refs.vueperslides2 &amp;&amp; $refs.vueperslides2.goToSlide(i - 1)"&gt;
        &lt;template #content&gt;
          &lt;div class="vueperslide__content-wrapper" :style="'background-color: ' + ['#ff5252', '#42b983'][i % 2]"&gt;
            &lt;div class="vueperslide__title"&gt;{{ '\{\{ i.toString() \}\}' }}&lt;/div&gt;
          &lt;/div&gt;
        &lt;/template&gt;
      &lt;/vueper-slide&gt;
    &lt;/vueper-slides&gt;

  h4 Another real-life gallery example
  p
    a(href="https://codepen.io/antoniandre/pen/ZEGEydP" target="_blank")
      | Edit this example in Codepen
      w-icon.ml1( color="primary") material-icons open_in_new
  vueper-slides(
    ref="vueperslides3"
    :touchable="false"
    fade
    :autoplay="false"
    :bullets="false"
    @slide="$refs.vueperslides4.goToSlide($event.currentSlide.index, { emit: false })"
    fixed-height="400px")
      vueper-slide(v-for="(slide, i) in slides2" :key="i" :image="slide.image")
  vueper-slides.no-shadow.mt3.thumbnails(
    ref="vueperslides4"
    @slide="$refs.vueperslides3.goToSlide($event.currentSlide.index, { emit: false })"
    :visible-slides="slides2.length"
    fixed-height="75px"
    :bullets="false"
    :touchable="false"
    :gap="2.5"
    :arrows="false")
    vueper-slide(
      v-for="(slide, i) in slides2"
      :key="i"
      :image="slide.image"
      @click.native="$refs.vueperslides4.goToSlide(i)")
  ssh-pre(language="html-vue" label="HTML Vue Template").
    &lt;vueper-slides
      ref="vueperslides1"
      :touchable="false"
      fade
      :autoplay="false"
      :bullets="false"
      @slide="$refs.vueperslides2.goToSlide($event.currentSlide.index, { emit: false })"
      fixed-height="400px"&gt;
      &lt;vueper-slide
        v-for="(slide, i) in slides"
        :key="i"
        :image="slide.image"&gt;
      &lt;/vueper-slides&gt;
    &lt;/vueper-slides&gt;

    &lt;vueper-slides
      class="no-shadow thumbnails"
      ref="vueperslides2"
      @slide="$refs.vueperslides1.goToSlide($event.currentSlide.index, { emit: false })"
      :visible-slides="slides.length"
      fixed-height="75px"
      :bullets="false"
      :touchable="false"
      :gap="2.5"
      :arrows="false"&gt;
      &lt;vueper-slide
        v-for="(slide, i) in slides"
        :key="i"
        :image="slide.image"
        @click.native="$refs.vueperslides2.goToSlide(i)"&gt;
      &lt;/vueper-slide&gt;
    &lt;/vueper-slides&gt;
  ssh-pre(language="js" label="Javascript").
    data: () => ({
      slides: [
        { image: require('@/assets/images/el-teide-volcano-spain.jpg') },
        { image: require('@/assets/images/chernobyl-ukraine.jpg') },
        { image: require('@/assets/images/crater-lake-oregon-usa.jpg') }
      ]
    })
  ssh-pre(language="css" label="CSS").
    .thumbnails {
      margin: auto;
      max-width: 300px;
    }

    .thumbnails .vueperslide {
      box-sizing: border-box;
      border: 1px solid #fff;
      transition: 0.3s ease-in-out;
      opacity: 0.7;
      cursor: pointer;
    }

    .thumbnails .vueperslide--active {
      box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
      opacity: 1;
      border-color: #000;
    }

  h3
    a(href="#ex--videos" :v-scroll-to="'#ex--videos'") Videos
    a(id="ex--videos" name="ex--videos")
  p.
    The video feature is usable through the #[code video] prop and is completely customizable.#[br]
    When changing slides, leaving a video slide will pause it, and moving to a video slide will play/resume it.#[br]
    You can use videos in slides in addition to: title, content and image.

  h4 > The #[strong.code video] prop accepted formats.#[br]
  p.
    The #[code video] prop can be either a string to a video URL, if you don't need more
    parameters, or an object.#[br]
  ul.max-widthed
    li If a string is passed an &lt;iframe&gt; will be used and the URL will be used in the &lt;iframe&gt; src attribute.
    li
      | If an object is passed, the following attributes are allowed:
      ul
        li [String] #[code webm], #[code mp4], #[code ogv], #[code avi]: if at least one these attributes is defined, a &lt;video&gt; tag will be used and the given sources will be added.
        li [String] #[code url]: if defined, an &lt;iframe&gt; tag will be used, this string will be used in the &lt;iframe&gt; src attribute.
        li [Object] #[code props]: an object containing all the attributes that you want to add to the &lt;iframe&gt; or &lt;video&gt; tag.
        li [String] #[code alt]: The alternative text to display when the browser cannot render the &lt;video&gt; tag.
        li [Boolean] #[code pointerEvents]: If set to false, the &lt;iframe&gt; or &lt;video&gt; tag will not be clickable (can be convenient to allow slides dragging).

  p.mt4.
    Whether you are using the &lt;video&gt; tag or Youtube videos via &lt;iframe&gt; tag, a lot of parameters are available and can produce many different results.#[br]
    You can check all the parameters on these pages:
  ul.max-widthed
    li
      strong.mr2 Embedded Videos (using &lt;video&gt; tag):
      a(href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video" target="blank") //developer.mozilla.org/en-US/docs/Web/HTML/Element/video
    li
      strong.mr2 Youtube parameters (using &lt;iframe&gt; tag):
      a(href="https://developers.google.com/youtube/player_parameters" target="blank") //developers.google.com/youtube/player_parameters

  p.mt4
    strong.
      Note: Most of the recent browsers do not allow autoplaying videos before the user interacted
      with the page.#[br]
      Some allow autoplaying if the video is muted.

  h4 Example #1. Embedded videos - using &lt;video&gt; tag.
  p In this example the first video is muted to be autoplayed in most browsers, but the video does not have sound.

  vueper-slides.mt4.ex--videos(bullets-outside :dragging-distance="50")
    vueper-slide(
      v-for="(slide, i) in videoSlides1"
      :key="i"
      :title="slide.title"
      :content="slide.content"
      :image="slide.image"
      :video="slide.video")
  ssh-pre(language="html-vue" label="HTML Vue Template").
    &lt;vueper-slides bullets-outside :dragging-distance="50"&gt;
      &lt;vueper-slide
        v-for="(slide, i) in slides"
        :key="i"
        :image="slide.image"
        :title="slide.title"
        :content="slide.content"
        :video="slide.video" /&gt;
    &lt;/vueper-slides&gt;

  ssh-pre(language="js" label="Javascript").
    // In your component's data.
    // If using `{{ 'process.env' }}.BASE_URL` (for Vue CLI),
    // or `{{ 'import.meta.env' }}.BASE_URL` (for Vite),
    // your images must be in the `public` folder.
    slides: [
      {
        title: 'Blossoming flower',
        content: 'This video is autoplayed, played in loop, has no controls and is not reacting to user interactions.',
        image: `${process.env.BASE_URL}images/flower.jpg`,
        video: {
          webm: `${process.env.BASE_URL}images/flower.webm`,
          mp4: `${process.env.BASE_URL}images/flower.mp4`,
          props: { autoplay: true, loop: true, controls: false, muted: true }
        }
      },
      {
        title: 'Blossoming flower',
        content: 'This video is played once, has controls and is reacting to user interactions.',
        image: `${process.env.BASE_URL}images/flower.jpg`,
        video: {
          webm: `${process.env.BASE_URL}images/flower.webm`,
          mp4: `${process.env.BASE_URL}images/flower.mp4`
        }
      }
    ]

  h4 Example #2. URL videos - using &lt;iframe&gt; tag.
  p.
    In this example the first Youtube video is not muted and autoplayed to save your data!
    But you could easily do so by adding #[code autoplay=1&amp;mute=1] to the URL.#[br]
    This special first video allows dragging the content of the video to rotate the view to 360
    degrees (amazing!).#[br]
    That demonstrates that this slide will not be draggable or swipeable to go to the next slide.
    To allow dragging and swiping to the next slide, you can add #[code pointerEvents: false] to
    the #[code video] prop which will prevent interactions with the video.

  p
    | All the Youtube parameters are passed via the URL (to be set in the #[code video.url] attribute).#[br]
    | See all the
    a.ml1(href="https://developers.google.com/youtube/player_parameters" target="blank") Youtube parameters.

  p.
    The width and height of Youtube videos are set by the video format. But you can use the
    #[code slideRatio] prop to get close to the ratio set in the Youtube video.

  vueper-slides.mt4.ex--videos(bullets-outside :dragging-distance="50")
    vueper-slide(
      v-for="(slide, i) in videoSlides2"
      :key="i"
      :title="slide.title"
      :content="slide.content"
      :image="slide.image"
      :video="slide.video")
  ssh-pre(language="html-vue" label="HTML Vue Template").
    &lt;vueper-slides bullets-outside :dragging-distance="50"&gt;
      &lt;vueper-slide
        v-for="(slide, i) in slides"
        :key="i"
        :image="slide.image"
        :title="slide.title"
        :content="slide.content" /&gt;
    &lt;/vueper-slides&gt;

  ssh-pre(language="js" label="Javascript").
    // In your component's data.
    slides: [
      {
        title: 'Aurora Borealis',
        content: 'This Youtube video has params in the URL and extra attributes on the iframe.',
        image: 'https://i.ytimg.com/vi_webp/T75IKSXVXlc/maxresdefault.webp',
        video: {
          url: 'https://www.youtube.com/embed/T75IKSXVXlc?rel=0&amp;showinfo=0&amp;controls=0&amp;fs=0&amp;modestbranding=1&amp;color=white&amp;iv_load_policy=3&amp;autohide=1&amp;enablejsapi=1',
          props: {
            allow: 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
          }
        }
      },
      {
        title: 'Fjords',
        content: 'This video can\'t be interacted with.',
        image: 'https://i.ytimg.com/vi/2sr9MGkkeks/maxresdefault.jpg',
        video: {
          url: 'https://www.youtube.com/embed/2sr9MGkkeks?controls=0&amp;fs=0&amp;modestbranding=1&amp;color=white&amp;iv_load_policy=3&amp;autohide=1&amp;enablejsapi=1',
          props: {
            allow: 'autoplay'
          },
          pointerEvents: false
        }
      }
    ]

  h2
    a(href="#vueper-slides--api" :v-scroll-to="'#vueper-slides--api'") #[span.code &lt;vueper-slides&gt;] API
    a(id="vueper-slides--api" name="vueper-slides--api")
  p.
    This is the main tag for the slideshow.#[br]
    You can set different options directly through html attributes.#[br]
    You can also override the default arrows and `paused` indicator if you want.

  h3
    a(href="#vueper-slides--settings" :v-scroll-to="'#vueper-slides--settings'") Settings
    a(id="vueper-slides--settings" name="vueper-slides--settings")
  p.
    Here is the list of all the parameters you can define on a #[code &lt;vueper-slides&gt;] tag.
    #[br]#[span.grey-light1 To use in HTML Replace #[code camelCase] with #[code kebab-case].]
  ssh-pre(language="js").
    alwaysRefreshClones:      [Boolean],         default: false
    arrows:                   [Boolean],         default: true
    arrowsOutside:            [Boolean],         default: false
    autoplay:                 [Boolean],         default: false
    breakpoints:              [Object],          default: {}
    bullets:                  [Boolean],         default: true
    bulletsOutside:           [Boolean],         default: false
    disable:                  [Boolean],         default: false
    disableArrowsOnEdges:     [Boolean],         default: false
    draggingDistance:         [Number],          default: null
    duration:                 [Number, String],  default: 4000
    fade:                     [Boolean],         default: false
    fixedHeight:              [Boolean, String], default: false
    fractions:                [Boolean],         default: false
    gap:                      [Number],          default: 0
    infinite:                 [Boolean],         default: true
    initSlide:                [Number],          default: 1
    lazy:                     [Boolean],         default: false
    lazyLoadOnDrag:           [Boolean],         default: false
    pageScrollingElement:     [String],          default: ""
    parallax:                 [Boolean, Number], default: false
    parallaxFixedContent:     [Boolean],         default: false
    pauseOnHover:             [Boolean],         default: true
    pauseOnTouch:             [Boolean],         default: true
    preventYScroll:           [Boolean],         default: false
    progress:                 [Boolean],         default: false
    rtl:                      [Boolean],         default: false
    slideContentOutside:      [Boolean, String], default: false
    slideContentOutsideClass: [String],          default: ""
    slideImageInside:         [Boolean],         default: false
    slideMultiple:            [Boolean],         default: false
    slideRatio:               [Number],          default: 1/3
    touchable:                [Boolean],         default: true
    transitionSpeed:          [Number, String],  default: 600
    visibleSlides:            [Number],          default: 1
    3d:                       [Boolean],         default: false

  ul.max-widthed.settings-list
    li
      | #[code alwaysRefreshClones], #[strong.mr1 Type:] #[code="[Boolean]"], #[strong.mr1 Default:] #[code false]
      div.mt2
        strong.red WARNING: Don't use in Vue 3. Vue 3 resolves this internally and you don't need this option anymore.
      div.
        With the #[code infinite] mode, the clones (#[a(href="#what-are-clones" :v-scroll-to="'#what-are-clones'" @click="onWhatAreClonesClick") What are clones?])
        are created with a copy of content in the mounted Vue.js lifecycle hook.#[br]
        If you modify the content of the slides after it's mounted, the option #[code alwaysRefreshClones] will
        make sure to always keep the clones up to date.#[br]
        By default this parameter is disabled to save up operations. In most cases you should not need it.

    li
      | #[code arrows], #[strong.mr1 Type:] #[code="[Boolean]"], #[strong.mr1 Default:] #[code true]
      p.
        Disable or enable the navigation arrows.#[br]
        You can also override the arrows by providing them in the html content of the
        #[code &lt;vueper-slides&gt;].#[br]
        See this setting live in the #[a(href="#ex--arrows-and-bullets" :v-scroll-to="'#ex--arrows-and-bullets'") Arrows &amp; Bullets] example.

    li
      | #[code arrowsOutside], #[strong.mr1 Type:] #[code="[Boolean]"], #[strong.mr1 Default:] #[code false]
      p.
        Place the navigation arrows outside of the slideshow (on left and right).#[br]
        See this setting live in the #[a(href="#ex--center-mode" :v-scroll-to="'#ex--center-mode'") Center mode] example.
      highlight(type="warning").
        If you place arrows outside on a full screen slideshow you won't be able to see the arrows.

    li
      | #[code autoplay], #[strong.mr1 Type:] #[code="[Boolean]"], #[strong.mr1 Default:] #[code false]
      p.
        Plays a slideshow automatically. Changing slide after a defined amount
        of time (set in #[code duration]).#[br]
        See this setting live in the #[a(href="#ex--basic" :v-scroll-to="'#ex--basic'") Basic with Autoplay] example.

    li
      | #[code breakpoints], #[strong.mr1 Type:] #[code="[Object]"], #[strong.mr1 Default:] #[code {}]
      p.
        With this option you can provide different configurations to apply to the slideshow
        at a particular screen width.#[br]
        See this setting live in the #[a(href="#ex--breakpoints" :v-scroll-to="'#ex--breakpoints'") Using Breakpoints] example.

    li
      | #[code bullets], #[strong.mr1 Type:] #[code="[Boolean]"], #[strong.mr1 Default:] #[code true]
      p Disable or enable the slides pagination (bullet points).

    li
      | #[code bulletsOutside], #[strong.mr1 Type:] #[code="[Boolean]"], #[strong.mr1 Default:] #[code false]
      p.
        If bullets is set to #[code true], place the slides index inside or outside the slideshow track.#[br]
        See this setting live in the #[a(href="#ex--arrows-and-bullets" :v-scroll-to="'#ex--arrows-and-bullets'") Arrows &amp; Bullets] example.

    li
      | #[code disable], #[strong.mr1 Type:] #[code="[Boolean]"], #[strong.mr1 Default:] #[code false]
      p.
        Disable or enable the whole slideshow. All the slides will remain as is and the
        slideshow freezes on the current slide. No autoplay and no possible action.

    li
      | #[code disableArrowsOnEdges], #[strong.mr1 Type:] #[code="[Boolean]"], #[strong.mr1 Default:] #[code false]
      p Disable the left or right arrow when respectively, no previous or no next slides are available.
      | Check the #[a(href="#ex--add-remove-slides--disable" :v-scroll-to="'#ex--add-remove-slides--disable'") Add / remove slides &amp; disable slideshow] example.
      highlight.
        Setting #[code disableArrowsOnEdges] to #[code true] will also prevent infinite sliding
        and dragging behavior beyond limits.

    li
      | #[code draggingDistance], #[strong.mr1 Type:] #[code="[Number]"], #[strong.mr1 Default:] #[code null]
      p.
        With this option you can provide a specific dragging distance for touch-enabled slideshows.#[br]
        See this setting live in the #[a(href="#ex--dragging-distance" :v-scroll-to="'#ex--dragging-distance'") Dragging distance &amp; prevent y-axis scroll] example.

    li
      | #[code duration], #[strong.mr1 Type:] #[code="[Number, String]"], #[strong.mr1 Default:] #[code 4000]
      p.
        When #[code autoplay] in on, defines an amount of time in milliseconds before the autoplaying slideshow
        changes slide automatically.#[br]
        You can also override this global duration from each slide using the
        #[code duration] property on the #[code &lt;vueper-slide&gt;] tag.

    li
      | #[code fade], #[strong.mr1 Type:] #[code="[Boolean]"], #[strong.mr1 Default:] #[code false]
      p.
        Sets the transition type to fade when changing slide.#[br]
        By default the slideshow slides when changing slide (and so #[code fade] is set to
        #[code false]).#[br]
        See this setting live in the #[a(href="#ex--images-and-fading" :v-scroll-to="'#ex--images-and-fading'") Images &amp; Fading] example.

    li
      a(id="vueper-slides-settings--fixed-height" name="vueper-slides-settings--fixed-height")
      | #[code fixedHeight], #[strong.mr1 Type:] #[code="[Boolean, String]"], #[strong.mr1 Default:] #[code false]
      p.
        The attribute #[strong.darktext.code fixed-height]
        #[strong accepts either a Boolean or a String]:
      ul
        li.
          #[strong.darktext A string] made of the height amount and the CSS unit
          will set the height directly.#[br]
          E.g. #[span.darktext.code "200px"], #[span.darktext.code "200vh"],
          #[span.darktext.code "200%"].#[br]
          #[strong It will not work if you don't provide a unit].
        li.
          #[strong.darktext A boolean] #[span.darktext.code true] value will
          let you set the height from your CSS.#[br]
          E.g. #[strong.darktext.code :fixed-height="true"], or just
          #[strong.darktext.code fixed-height].

      p See this setting live in the #[a(href="#ex--fixed-height" :v-scroll-to="'#ex--fixed-height'") Fixed Height] example.

    li
      | #[code fractions], #[strong.mr1 Type:] #[code="[Boolean]"], #[strong.mr1 Default:] #[code false]
      p.
        Disable or enable the fractional representation of `current slide / total slides`.#[br]
        You can override this via the #[code fractions] slot.

    li
      a(id="vueper-slides-settings--gap" name="vueper-slides-settings--gap")
      | #[code gap], #[strong.mr1 Type:] #[code="[Number]"], #[strong.mr1 Default:] #[code 0]
      p Set a gap between all the slides. The gap is set in percentage of the slideshow width.

    li
      | #[code infinite], #[strong.mr1 Type:] #[code="[Boolean]"], #[strong.mr1 Default:] #[code true]
      p.
        When set to #[code true], the slideshow acts like a carousel.#[br]
        Going to the next slide or previous slide when respectively on last slide
        or first slide, will seemlessly take the other end's slide and continue from
        that slide position but not breaking the transition direction.#[br]
        See this setting live in the #[a(href="#ex--simplest-ever" :v-scroll-to="'#ex--simplest-ever'") Simplest Ever] example.

      a(id="what-are-clones" name="what-are-clones")
      highlight(:class="{ pulse: highlightWhatAreClones }" type="success").
        #[strong How it works:] when creating the slideshow or adding / removing slides, the
        first and last slides are cloned at each opposite end of the slideshow. When clicking an
        arrow or dragging beyond the first or last slide, the clone will appear then it will
        snap back to the same original slide at the other end of slideshow without you noticing.

      highlight.
        Infinite sliding is only possible with the sliding transition,
        as a fade transition slideshow does not need such effect.

    li
      | #[code initSlide], #[strong.mr1 Type:] #[code="[Number]"], #[strong.mr1 Default:] #[code 1]
      p Init the slideshow with a specific slide as the active slide.

    li
      | #[code lazy], #[strong.mr1 Type:] #[code="[Boolean]"], #[strong.mr1 Default:] #[code false]
      p.
        Lazy loads each slide image when the slide becomes visible.#[br]
        Lazy loading will be triggered in the before-slide hook for all the images of the slides becoming visible.#[br]
        E.g. if #[code :visible-slides="2"] then 2 images will be loaded.

    li
      | #[code lazyLoadOnDrag], #[strong.mr1 Type:] #[code="[Boolean]"], #[strong.mr1 Default:] #[code false]
      p.
        Lazy loads the next slide images while user is dragging towards that slide.#[br]
        The load of the next slide image will be triggered in the before-slide hook.

    li
      | #[code pageScrollingElement], #[strong.mr1 Type:] #[code="[String]"], #[strong.mr1 Default:] #[code '']
      p.
        When using parallax, the slides position is calculated from the scroll offset of the document.
        Use this option to specify another DOM element selector if it's not the HTML document itself that is scrollable.

    li
      | #[code parallax], #[strong.mr1 Type:] #[code="[Boolean, Number]"], #[strong.mr1 Default:] #[code false]
      p.
        When set to #[code true], #[code 1] or #[code -1], adds a parallax effect on the slideshow.#[br]
        If #[code -1] is given, the parallax effect is reversed and the image will go in the opposite way of the scrolling direction.#[br]
        See this setting live in the #[a(href="#ex--parallax" :v-scroll-to="'#ex--parallax'") Parallax Effect] example.

      highlight(type="success" tag="div")
        | The parallax algorythm is smart and has 2 advantages in comparison to #[em Vuetify]'s #[code v-parallax] for instance:
        ol
          li.
            It stops the calculations and DOM updates when the slideshow is not in viewport.#[br]
            It also stops requesting more browser optimizations (#[code will-change] CSS property) when not in viewport.
          li.
            The height of the image to animate is set by the slideshow height and update naturally by itself on
            resize to keep the same ratio. As it is not a fixed heigh, you don't need to re-calculate the image height on
            resize to keep your image ratio.

    li
      | #[code parallaxFixedContent], #[strong.mr1 Type:] #[code="[Boolean]"], #[strong.mr1 Default:] #[code false]
      p.
        Allows the slide title and/or content to be fixed on top of the moving background.#[br]
        See this setting live in the #[a(href="#ex--parallax" :v-scroll-to="'#ex--parallax'") Parallax Effect] example.

    li
      | #[code pauseOnHover], #[strong.mr1 Type:] #[code="[Boolean]"], #[strong.mr1 Default:] #[code true]
      p.
        If #[code autoplay] is on, setting #[code pauseOnHover] stops the autoplay
        while hovering then resets to the defined #[code duration] when you stop hovering.#[br]
        See this setting live in the #[a(href="#ex--basic" :v-scroll-to="'#ex--basic'") Basic with Autoplay] example.

    li
      | #[code pauseOnTouch], #[strong.mr1 Type:] #[code="[Boolean]"], #[strong.mr1 Default:] #[code true]
      p.
        If #[code autoplay] is on, setting #[code pauseOnTouch] stops the autoplay
        as soon as you touch any element contained in the slideshow.#[br]
        When you touch outside of the slideshow, the autoplay resumes.#[br]
        See this setting live in the #[a(href="#ex--basic" :v-scroll-to="'#ex--basic'") Basic with Autoplay] example.

    li
      | #[code preventYScroll], #[strong.mr1 Type:] #[code="[Boolean]"], #[strong.mr1 Default:] #[code false]
      p.
        For touch-enabled slideshows, enable or disable the Y-axis scroll while dragging slides.#[br]
        See this setting live in the #[a(href="#ex--dragging-distance" :v-scroll-to="'#ex--dragging-distance'") Dragging distance &amp; prevent y-axis scroll] example.

    li
      | #[code progress], #[strong.mr1 Type:] #[code="[Boolean]"], #[strong.mr1 Default:] #[code false]
      p.
        Disable or enable the top linear progress bar.#[br]
        You can override this via the #[code progress] slot.

    li
      | #[code rtl], #[strong.mr1 Type:] #[code="[Boolean]"], #[strong.mr1 Default:] #[code false]
      p Sets the slideshow to an RTL direction (right to left).

    li
      | #[code slideContentOutside], #[strong.mr1 Type:] #[code="[Boolean, String]"], #[strong.mr1 Default:] #[code false], #[strong Values:] #[code [false, 'top', 'bottom']]
      p.
        Display the current slide title &amp; content outside the slide.#[br]
        You can position the content above or under the slideshow with the keywords
        #[code top] &amp; #[code bottom].#[br]
        See this setting live in the #[a(href="#ex--images-and-fading" :v-scroll-to="'#ex--images-and-fading'") Images &amp; Fading] example.

    li
      | #[code slideContentOutsideClass], #[strong.mr1 Type:] #[code="[String]"], #[strong.mr1 Default:] #[code ""]
      p.
        With this option you can have a specific CSS class to style your slide contents
        when it's outside the active slide.

    li
      a(id="vueper-slides-settings--image-inside" name="vueper-slides-settings--image-inside")
      | #[code slideImageInside], #[strong.mr1 Type:] #[code="[Boolean]"], #[strong.mr1 Default:] #[code false]
      p.
        A #[code &lt;div class="vueperslide__image"&gt;] will be created inside each slide.#[br]
        This will allow you to CSS transform the slides images with no impact on slideshow behavior.

      p See this setting live in the #[a(href="#ex--slide-image-inside" :v-scroll-to="'#ex--slide-image-inside'") Slide Image Inside] example.

    li
      a(id="vueper-slides-settings--slide-multiple" name="vueper-slides-settings--slide-multiple")
      | #[code slideMultiple], #[strong.mr1 Type:] #[code="[Boolean]"], #[strong.mr1 Default:] #[code false]
      p.
        Allows you to slide multiple items at once when clicking arrows, or on drag.#[br]
        The number to slide if #[code slideMultiple] is set to #[code true] is always equal to
        #[code visibleSlides].

      p See this setting live in the #[a(href="#ex--show-multiple-slides-and-gap" :v-scroll-to="'#ex--show-multiple-slides-and-gap'") Show Multiple Slides &amp; Gap] example.

      highlight(type="warning")
        strong.black.
          WARNING#[br]
          The #[code infinite] mode is not supported with the #[code visible-slides] option for now.
      highlight
        ul.pl3
          li
            strong CSS class #[code no-shadow]:
            div.
              In some cases like in the #[a(href="#ex--show-multiple-slides-and-gap" :v-scroll-to="'#ex--show-multiple-slides-and-gap'") first 3 examples], you will not want the default
              inner top and bottom shadow (the fourth example has it). To remove it, add the class
              #[code no-shadow] on the #[code &lt;vueper-slides&gt;] tag.#[br]
              Refer to the example source code.
          li
            strong Arrows &amp; bullets outside by default:
            div.
              In most cases you will want to have the arrows and bullets outside, so if
              #[code.black visible-slides] is set, arrows and bullets will be outside
              by default.#[br]
              You can override this by explicitly setting #[code :arrows-outside="false"],
              or #[code :bullets-outside="false"].
          li
            strong Slide 1 by 1 with fading:
            div.
              The #[code fade] transition is designed for all the visible slides to change at once (#[code :slide-multiple="true"]).#[br]
              If you try to change slides 1 by 1 #[code :slide-multiple="false"] with multiple visible slides, you should use the #[code slide] transition instead.
      highlight(type="success")
        p.mb2.
          When the #[code.black infinite] &amp; #[code.black slide-multiple]
          options are off, Vueper Slides will keep the active slide at the most middle
          position as possible while you slide, unless it would create a blank
          space (like if active slide is on a side).#[br]E.g.
        ul.mt0
          li With 3 items, active slide will be at position 2
          li With 5 items, active slide will be at position 3
          li With even numbers of items, active slide will be at position #[code visibleItemsCount / 2]

    li
      | #[code slideRatio], #[strong.mr1 Type:] #[code="[Number]"], #[strong.mr1 Default:] #[code 1/3]
      p.
        Sets the slideshow ratio so it will naturally stay ratio-ed on different browser width.#[br]
        See the #[a(href="#ex--events" :v-scroll-to="'#ex--events'") Events] example or #[a(href="#ex--breakpoints" :v-scroll-to="'#ex--breakpoints'") Using Breakpoints] example.
        #[br]More examples are available in a
        #[a(href="https://codepen.io/antoniandre/pen/KBXWPP" target="_blank") Codepen demo #[w-icon(color="primary") material-icons open_in_new]].
      highlight.
        Setting the ratio avoids heavier javascript width and height calculations on resize.#[br]
        But thanks to the default value, Vueper Slides' got your back if you don't set any.
      highlight(type="tips").
        You can easily define different ratios for different viewport sizes by using the #[code breakpoints] option.#[br]
        If you prefer you can also define breakpoints in your own CSS overriding the slides ratio.
      highlight.
        If #[code pauseOnHover] is set to #[code true] the autoplay stops while
        hovering then resets to the defined #[code duration] when you stop hovering.

    li
      | #[code touchable], #[strong.mr1 Type:] #[code="[Boolean]"], #[strong.mr1 Default:] #[code true]
      p.
        Whether the slideshow should allow slide dragging to change slide or not.#[br]
        If set to #[code true], dragging will be possible on both touchable device or
        desktop with mouse.#[br]
        See this setting live in the #[a(href="#ex--simplest-ever" :v-scroll-to="'#ex--simplest-ever'") Simplest Ever] example.

      highlight.
        The default threshold to change slides is the half of the slideshow width.#[br]
        Start dragging from either end of the slide and as soon as you pass the half of
        the slideshow you can release the dragging to finish the slide change.

      highlight(type="tips").
        If you don't like the default dragging behavior, you can define a
        #[code draggingDistance] in pixels.#[br]
        If one is defined, when you start a dragging event (touch or click)
        #[strong the slide's closest end won't snap to your cursor position].

    li
      | #[code transitionSpeed], #[strong.mr1 Type:] #[code="[Number, String]"], #[strong.mr1 Default:] #[code 600]
      p.
        Defines how long the transition from a slide to another will last - in milliseconds.#[br]
        See this setting live in the #[a(href="#ex--center-mode" :v-scroll-to="'#ex--center-mode'") Center mode] example.

    li
      a(id="vueper-slides-settings--visible-slides" name="vueper-slides-settings--visible-slides")
      | #[code visibleSlides], #[strong.mr1 Type:] #[code="[Number]"], #[strong.mr1 Default:] #[code 1]
      p.
        Allows you to show multiple items per slide.#[br]
        You can then decide to slide items one by one or by the same amount as
        #[code visibleSlides], using #[code slideMultiple].#[br]

      p See this setting live in the #[a(href="#ex--show-multiple-slides-and-gap" :v-scroll-to="'#ex--show-multiple-slides-and-gap'") Show Multiple Slides &amp; Gap] example.

    li
      a(id="vueper-slides-settings--3d" name="vueper-slides-settings--3d")
      | #[code 3d], #[strong.mr1 Type:] #[code="[Boolean]"], #[strong.mr1 Default:] #[code false]
      p.
        Allows you to slide one slide at a time with a 3D effect transition.#[br]
        You can combine this with #[code fixedHeight], #[code arrows-outside], #[code bullets-outside]
        and the #[code no-shadow] CSS class.

      highlight(type="warning")
        strong.black.
          WARNING#[br]
          The #[code 3d] mode is not compatible with infinite sliding, fade,
          slide-multiple, visible-slides &amp; parallax features.
        | #[br]This is mainly due to the complexity of placing #[strong more than 4 slides] on a cube in 3D,
        | Adapting to all these features would decrease the overall performance of the slideshow.

      p See this setting live in the #[a(href="#ex--3d-rotation" :v-scroll-to="'#ex--3d-rotation'") 3D Rotation] example.

  h3
    a(href="#events" :v-scroll-to="'#events'") Emitted Events
    a(id="events" name="events")
  p.
    Here is the list of all the available events. To see them in action you can check
    the #[a(href="#ex--events" :v-scroll-to="'#ex--events'") Events example].
  ul.max-widthed
    li
      h4
        code ready
      p.
        Fired right after the initialization of the slideshow is complete.#[br]
        No parameter available.
    li
      h4
        code previous
      p.
        Fired when going to the previous slide either from user drag or from slideshow arrows or from keyboard arrows.#[br]
        This event happens before the `before-slide` event and the next slide is not yet available.#[br]
        This event returns an object containing:
      ul
        li.
          #[code currentSlide]: object containing the slide index, title, content, image &amp; link of
          the current slide.
    li
      h4
        code next
      p.
        Fired when going to the next slide either from user drag or from slideshow arrows or from keyboard arrows.#[br]
        This event happens before the `before-slide` event and the next slide is not yet available.#[br]
        This event returns an object containing:
      ul
        li.
          #[code currentSlide]: object containing the slide index, title, content, image &amp; link of
          the current slide.
    li
      h4
        code before-slide
      p.
        Fired on slide change, just before the effective change.#[br]
        This event returns an object containing:
      ul
        li.
          #[code currentSlide]: object containing the slide index, title, content, image &amp; link
          of the current slide.
        li.
          #[code nextSlide]: object containing the slide index, title, content, image &amp; link
          of the next slide.
    li
      h4
        code slide
      p.
        Fired on slide change, just after the effective change.#[br]
        This event returns an object containing:
      ul
        li.
          #[code currentSlide]: object containing the slide index, title, content, image &amp; link of
          the new current slide.
    li
      h4
        code autoplay-pause
      p.
        Fired when #[code autoplay] is set to true, and a pause has been triggered either by a mouseover
        or by calling the function #[code pauseAutoplay()] via Vue refs.#[br]
        This event returns an object containing:
      ul
        li.
          #[code currentSlide]: object containing the slide index, title, content, image &amp; link of
          the new current slide.
    li
      h4
        code autoplay-resume
      p.
        Fired when #[code autoplay] is set to true, and a pause has been triggered either by a mouseover and mouseout
        or by calling the function #[code resumeAutoplay()] via Vue refs.#[br]
        This event returns an object containing:
      ul
        li.
          #[code currentSlide]: object containing the slide index, title, content, image &amp; link of
          the new current slide.
    li
      h4
        code image-loaded
      p.
        Fired when #[code lazy] is set to true, and the image succeeded to load.#[br]
        This event returns an object containing the information of the slide to load.
    li
      h4
        code image-failed
      p.
        Fired when #[code lazy] is set to true, and the image failed to load.#[br]
        This event returns an object containing the information of the slide to load.

  h2
    a(href="#vueper-slide--api" :v-scroll-to="'#vueper-slide--api'") &lt;vueper-slide&gt; API
    a(id="vueper-slide--api" name="vueper-slide--api")
  h3
    a(href="#vueper-slide--settings" :v-scroll-to="'#vueper-slide--settings'") Settings
    a(id="vueper-slide--settings" name="vueper-slide--settings")
  p The following options can be applied to every #[code &lt;vueper-slide&gt;] tag.
  ssh-pre(language="js").
    image:     [String], default: ''
    title:     [String], default: ''
    content:   [String], default: ''
    link:      [String], default: ''
    openInNew: [Boolean, String], default: false // Open a link in a new tab and support custom target.
    video:     [String, Object], default: '' // Add a video on a slide.
    duration:  [Number], default: 0 // Override the global slide duration when autoplaying.
  h3
    a(href="#vueper-slide--events" :v-scroll-to="'#vueper-slide--events'") Events
    a(id="vueper-slide--events" name="vueper-slide--events")
  p.
    Here is the list of all the available events on the
    #[code.black name="vueper-slide"] tag.
  ul.max-widthed
    li
      h4
        code mouse-enter
      p.
        Fired on slide mouseenter with parameters:
      ssh-pre(language="js").
        slide: {Object}, // The current slide object containing: index, title, content, image, link.
        el: {Object} // DOM Element.
    li
      h4
        code mouse-leave
      p.
        Fired on slide mouseleave with no parameter.

  h2
    a(href="#styling" :v-scroll-to="'#styling'") Styling
    a(id="styling" name="styling")
  h3
    a(href="#external-css" :v-scroll-to="'#external-css'") External CSS
    a(id="external-css" name="external-css")
  p.
    Vueper Slides is very easy to style with CSS.#[br]
    Only the required styles - for a well-functioning slideshow - are embedded inside the
    library.#[br]As the other cosmetic styles are externalized, it is your call to include it
    (refer to #[a(href="#installation" :v-scroll-to="'#installation'") Installation]) or redo everything.#[br]
    If you choose to include it as it will probably save you some time, place your
    overrides after the Vueper Slides CSS include.#[br]

  highlight(type="tips").
    #[strong="If you choose to include vueperslides.css but don't want the default inner shadow"]
    a '#[code no-shadow]' class is here for that, to be placed on the
    #[code &lt;vueperslides&gt;] tag.#[br]
    An example is visible on the #[a(href="#ex--center-mode" :v-scroll-to="'#ex--center-mode'") Center Mode] slideshow.

  h3
    a(href="#available-css-classes" :v-scroll-to="'#available-css-classes'") Available CSS Classes
    a(id="available-css-classes" name="available-css-classes")
  p.
    Vueper Slides uses the #[a(href="http://getbem.com/naming/" target="_blank") BEM #[w-icon(color="primary") material-icons open_in_new]]
    naming convention. Styling any element should be quite simple and straightforward.#[br]

  ul.max-widthed
    li.
      You can use classes available on the vueperslides wrapper to style everything inside it.#[br]
      For instance, you can use #[code vueperslides--ready], #[code vueperslides--fade],
      #[code vueperslides--touchable], #[code vueperslides--parallax] to have specific
      styles according to the current configuration.
    li.
      You can also use #[code vueperslides--animated] to apply a specific style on an element
      of the slideshow while the slideshow is animated.
    li
      | In the examples above you can find style snippets for different purposes.
      | #[br]Don't forget to inspect an element to check the styles applied. ;)
      ul
        li.
          #[a(href="#ex--arrows-and-bullets" :v-scroll-to="'#ex--arrows-and-bullets'") Arrows &amp; Bullets example] for arrows &amp; bullets
          custom styles, or #[a(href="#ex--center-mode" :v-scroll-to="'#ex--center-mode'") Center Mode example] for bullets.
        li.
          #[a(href="#ex--updating-content" :v-scroll-to="'#ex--updating-content'") Content Inside/Outside example] for content layouts.
        li.
          #[a(href="#ex--events" :v-scroll-to="'#ex--events'") Events example] for custom styles on the current slide.
        li.
          #[a(href="#ex--images-and-fading" :v-scroll-to="'#ex--images-and-fading'") Images &amp; Fading example] for transition style on
          the content using #[code vueperslides--animated].

  h2
    a(href="#notable-version-changes" :v-scroll-to="'#notable-version-changes'") Notable Version Changes
    a(id="notable-version-changes" name="notable-version-changes")
  p.
    Vueper Slides is constantly evolving and some changes might affect the way you use it sometimes.#[br]
    Here is a list of the releases with their changes that might have an impact in your project.
  highlight(type="tips").
    After a Vueper Slides update, don't forget to refer to this section to check the
    possible breaking changes.

  ul.max-widthed.mt8
    li.mb5
      .title2.mr3 Version 3.0
      | Supports Vue 3. This version is not compatible with Vue 2.x.

    li.mb2
      strong.mr3 Version 2.15
      ul
        li Added the #[code pauseOnTouch] option (only for autoplay) and enables it by default.
        li.
          Always prevent the autoplay while dragging a slide and reset the autoplay timer on release.
          Both on desktop and touch devices.

    li.mb2
      strong.mr3 Version 2.12
      ul
        li Added support for embedded videos and URL videos like Youtube.

    li.mb2
      strong.mr3 Version 2.11
      ul
        li Added the RTL option.
    li.mb2
      strong.mr3 Version 2.10.8
      ul
        li Prevent autoscroll on slide bullets focus.
        li Renamed the #[code parallaxScrollingElement] option to #[code pageScrollingElement].
    li.mb2
      strong.mr3 Version 2.9
      ul
        li.
          Allow providing multiple different #[code &lt;vueper-slide&gt;] tags in slots, instead
          of a #[code &lt;vueper-slide&gt;] with a #[code v-for] loop
        li Remove the undesired first animation when slides are appearing.
    li.mb2
      strong.mr3 Version 2.8
      | Added lazy loading feature
    li.mb2
      strong Version 2.7
      ul
        li Added the #[code duration] option on the #[code &lt;vueper-slide&gt;] tag
        li
          strong The #[code speed] option is now renamed #[code duration]
    li.mb2
      strong.mr3 Version 2.6
      | Added #[code progress] option
    li.mb2
      strong.mr3 Version 2.5
      | Added #[code parallaxFixedContent] option
    li.mb2
      strong Version 2.4
      ul.mt0
        li Added the #[code bullets] &amp; #[code bullet] slots
        li.
          For more flexibility via slots, the default bullet is wrapped in a div with a
          #[code .default] class so the default style is only applied to this div.
    li.mb2 #[strong.mr2 Version 2.3] Added a #[code gap] feature
    li
      strong Version 2.2
      ul.mt0
        li
          | For more flexibility, the default wrapper #[code `.vueperslide__content-wrapper`] has been removed
          | when using the slide content slot. Which means your slot content will be directly at the slide root in
          | the #[code `.vueperslide`] tag.#[br]
          | You can still wrap your slot content with the #[code `.vueperslide__content-wrapper`] class to
          | horizontally and vertically align center:
          ssh-pre(language="html-vue" label="HTML Vue Template").
            &lt;vueper-slide v-for="i in 8" :key="i"&gt;
              &lt;template #content&gt;
                &lt;div class="vueperslide__content-wrapper"&gt;
                  &lt;div class="vueperslide__title"&gt;{{ '\{\{ i.toString() \}\}' }}&lt;/div&gt;
                &lt;/div&gt;
              &lt;/template&gt;
            &lt;/vueper-slide&gt;
        li Added previous &amp; next emitted events
        li.
          Allow using #[code previous()], #[code next()] and #[code goToSlide()] functions
          without emitting event (useful for synced slideshows)
        li Added a default margin bottom on the slideshow when using fixed height and bullets outside

    li.mt6
      strong Version 2.0
      highlight(type="warning" no-icon)
        p.mb2.subtitle-1.
          The v2 features a deep refactoring of the library, with revised logic and multiple improvements, in particular:
        ul.mt0
          li Using the new Vue.js 2.6+ slots syntax is now possible!
          li Slides cloning, slides rendering, and more performant &amp; reliable content updating.
          li Autoplay pause &amp; resume - manual slide does not resume if paused.
          li Hide first clone during init - on infinite mode.
          li Redesigned arrows - easy to change the thickness.
          li Slide deletion reliability.
          li unbind all DOM events handlers on component destroy.

        .subtitle-1.mt6 Breaking changes
        ul.mt2
          li Removed the #[code before-init] emitted event
          li Removed the #[code slideTitle] slot
          li
            span Renamed slots to kebab-case:
            ul.pl4.mt1.mb3
              li #[code slideContent] to #[code content]
              li #[code arrowLeft] to #[code arrow-left]
              li #[code arrowRight] to #[code arrow-right]
              li #[code pausedIcon] to #[code pause]
          li
            span Renamed events to kebab-case:
            ul.pl4.mt1.mb3
              li #[code mouseover] to #[code mouse-enter]
              li #[code mouseout] to #[code mouse-leave]
          li The emitted event #[code before-slide] now only returns a single parameter containing the currentSlide info.
          li The emitted event #[code slide] now only returns a single parameter containing the currentSlide and nextSlide info.
          li If both content slot and content attribute are provided now use the slot.
          li Removed #[code refreshClonesOnDrag] option and introduced #[code alwaysRefreshClones].

    li.mt6
      strong Version 1.16.0
      p.
        The Vueper Slides CSS file has been renamed from #[code import 'vueperslides/dist/vueperslides.min.css'] to #[code import 'vueperslides/dist/vueperslides.css']
        (refer to #[a(href="#external-css" :v-scroll-to="'#external-css'") External CSS]).
    li
      strong Version 1.11.0
      ul
        li.
          Class #[code vueperslides__slide] is replaced with #[span.darktext.code vueperslide]
          as it concerns the #[code &lt;vueperslide&gt;] tag only.#[br]
        li.
          The class #[code vueperslides__slide--active] is replaced with
          #[span.darktext.code vueperslide--active].
        li.
          The class #[code vueperslides__slide--clone] is replaced with
          #[span.darktext.code vueperslide--clone].
        li.
          The class #[code vueperslides__slide-content] is replaced with
          #[span.darktext.code vueperslide__content-wrapper].
        li.
          The class #[code slide-title] is replaced with
          #[span.darktext.code vueperslide__title].
        li.
          The class #[code slide-content] is replaced with
          #[span.darktext.code vueperslide__content].#[br]#[br]

    li
      strong Version 1.6.0
      p.
        You now need to include Vueper Slides CSS file for default styles
        (refer to #[a(href="#external-css" :v-scroll-to="'#external-css'") External CSS]).#[br]
        #[code import 'vueperslides/dist/vueperslides.css']
</template>

<script>
import SshPre from 'simple-syntax-highlighter'
import { VueperSlides, VueperSlide } from '@/components/vueperslides/index'
import Highlight from '@/components/highlight-message/index.vue'

import '@/components/vueperslides/styles.scss'
import 'simple-syntax-highlighter/dist/sshpre.css'
import '@/scss/examples.scss'

export default {
  components: {
    VueperSlides,
    VueperSlide,
    SshPre,
    Highlight
  },

  data: () => ({
    autoPlaying: true,
    internalAutoPlaying: true,
    pauseOnHover: true,
    events: '',
    logs: [],
    slideshowDisabled: false,
    parallax: 1,
    parallaxFixedContent: false,
    slidesTimeTimerId: null,
    highlightWhatAreClones: false,
    contentPosition: 'false',
    breakpoints: {
      1200: { slideRatio: 1 / 5 },
      1100: { slideRatio: 1 / 4 },
      900: { slideRatio: 1 / 3 },
      600: { slideRatio: 1 / 2, arrows: false, bulletsOutside: true }
    },
    colors: ['#42b983', '#2196f3', '#ffc107', '#ff5252'],
    slides1: [
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
        title: 'El Teide Volcano, Spain',
        content: 'Photo by Max Rive',
        image: `${import.meta.env.BASE_URL}images/el-teide-volcano-spain.jpg`,
        link: 'https://www.maxrivephotography.com/index/C0000rU1RKCHdqwI/G0000X57AtIzuRX0/I0000Gvr9HqdtyXk'
      },
      {
        title: 'Chernobyl, Ukraine',
        content: 'Photo by Jesse Moran',
        image: `${import.meta.env.BASE_URL}images/chernobyl-ukraine.jpg`,
        link: 'https://www.flickr.com/photos/jessemoran'
      },
      {
        title: 'Crater Lake, Oregon, USA',
        content: 'Photo by Jesse Moran',
        image: `${import.meta.env.BASE_URL}images/crater-lake-oregon-usa.jpg`,
        link: 'https://flic.kr/p/2cxrCmp'
      }
    ],
    slides3: [
      { title: 'Slide 1', content: 'Slide 1 content.' },
      { title: 'Slide 2', content: 'Slide 2 content.' }
    ],
    slides4: [
      { title: 'Time', content: 'Time in 5 hours: ' },
      { title: 'Time', content: 'Time in 5 hours: ' }
    ],
    lazyloadSlides: [
      { image: 'https://farm4.staticflickr.com/3364/3409068082_bbecd0b7cc_o.jpg' },
      { image: 'https://combo.staticflickr.com/ap/build/images/sohp/2019-top-25/Ramon_Covelo_Sakrisoy%20Dreams.jpg' },
      { image: 'https://combo.staticflickr.com/ap/build/images/sohp/2019-top-25/Alex_Noriega_Pure_Magic.jpg' },
      { image: 'https://combo.staticflickr.com/ap/build/images/sohp/2019-top-25/Jesse_Moran_Resurrect.jpg' },
      { image: 'https://combo.staticflickr.com/ap/build/images/sohp/2019-top-25/Perez_Alonso%20Photography_Chocolate_Mountains.jpg' },
      { image: `${import.meta.env.BASE_URL}images/easton-wa-usa.jpg` }
    ],
    videoSlides1: [
      {
        title: 'Blossoming flower',
        content: 'This video is autoplayed, played in loop, has no controls and is not reacting to user interactions.',
        image: `${import.meta.env.BASE_URL}images/flower.jpg`,
        video: {
          webm: `${import.meta.env.BASE_URL}images/flower.webm`,
          mp4: `${import.meta.env.BASE_URL}images/flower.mp4`,
          props: { autoplay: true, loop: true, controls: false, muted: true }
        }
      },
      {
        title: 'Blossoming flower',
        content: 'This video is played once, has controls and is reacting to user interactions.',
        image: `${import.meta.env.BASE_URL}images/flower.jpg`,
        video: {
          webm: `${import.meta.env.BASE_URL}images/flower.webm`,
          mp4: `${import.meta.env.BASE_URL}images/flower.mp4`
        }
      }
    ],
    videoSlides2: [
      {
        title: 'Aurora Borealis',
        content: 'This Youtube video has params in the URL and extra attributes on the iframe.',
        image: 'https://i.ytimg.com/vi_webp/T75IKSXVXlc/maxresdefault.webp',
        video: {
          url: 'https://www.youtube.com/embed/T75IKSXVXlc?rel=0&showinfo=0&controls=0&fs=0&modestbranding=1&color=white&iv_load_policy=3&autohide=1&enablejsapi=1',
          props: {
            allow: 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
          }
        }
      },
      {
        title: 'Fjords',
        content: 'This video can\'t be interacted with.',
        image: 'https://i.ytimg.com/vi/2sr9MGkkeks/maxresdefault.jpg',
        video: {
          url: 'https://www.youtube.com/embed/2sr9MGkkeks?controls=0&fs=0&modestbranding=1&color=white&iv_load_policy=3&autohide=1&enablejsapi=1',
          pointerEvents: false
        }
      }
    ]
  }),

  methods: {
    onWhatAreClonesClick () {
      this.highlightWhatAreClones = true
      setTimeout(() => (this.highlightWhatAreClones = false), 3000)
    },
    logEvents (eventName, params) {
      this.logs.push({ eventName, params })
    },
    toggleAutoplay () {
      this.$refs.exBasic[`${this.autoPlaying ? 'pause' : 'resume'}Autoplay`]()
      this.autoPlaying = !this.autoPlaying
      this.pauseOnHover = false
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
    },
    toggleSlidesTime () {
      if (this.slidesTimeTimerId) {
        clearInterval(this.slidesTimeTimerId)
        this.slidesTimeTimerId = 0
      }
      else {
        this.updateSlidesWithTime()
        this.slidesTimeTimerId = setInterval(this.updateSlidesWithTime, 1000)
      }
    },
    updateSlidesWithTime () {
      this.slides4.forEach(slide => {
        const time = new Date()
        slide.title = time.toLocaleTimeString()
        slide.content = 'Time in 5 hours: ' + new Date(time.getTime() + 5 * 3600000).toLocaleTimeString()
      })
    },
    contentPositionChange () {
      const positions = ['false', 'top', 'bottom']
      this.contentPosition = positions[(positions.indexOf(this.contentPosition) + 1) % 3]
    }
  },
  created () {
    this.updateSlidesWithTime()
  }
}
</script>
