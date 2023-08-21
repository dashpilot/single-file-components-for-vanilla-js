# single-file-components-for-vanilla-js

Svelte and Vue-inspired single-file components compiler for vanilla javascript.

## About

Inspired by the way Svelte compiles your single file components into browser-friendly javascript, I created a simple compiler for vanilla javascript. You write your code in single-file-component-style, and the build script compiles it to browser-friendly javascript, html and css.

It also features **live-reload**, so every time you save changes to a single file component, the build script compiles your code and runs it. Although this is a basic POC, in its current form it does help you to better organize your code.

## How to install?

Clone this repo and run `npm install` and then `npm run dev` to run the example components

## How to create a single-file component?

Create a new .html file in `src/components`, with the following structure:

    <template>
    <!-- This is where the html of your component goes -->
    </template>

    <script>
    // This is where your javascript goes
    </script>

    <style>
    /* this is where your CSS goes */
    </style>

The order of the template-, script- and css- tags is up to your own preference. When you run `npm run dev` or `npm run build` the compiler goes through all the components and automatically splits and minifies/uglifies the JS, CSS and HTML into public/assets. It also copies index.html to the public folder.

To load a component on the page, create a custom element in index.html that corresponds to the filename of your component. For example if your component is called card.html, create a custom element <card></card> in index.html. You can also load multiple instances of the component on the page, without duplicating the javascript or CSS. See `index.html` for an example.

## What it's not

This script is simply meant to help you write code in a more modular way, but it doesn't feature the wealth of extras Svelte offers (template language, two-way binding, CSS-scoping etc.). Let me know if there are any features/improvements you'd like to see.

If you do want templating, two-way-binding and a data-store, take a look at the Alpine.js version: <https://github.com/dashpilot/single-file-components-for-alpinejs>

## Press the :star: button

Don't forget to press the :star: button to let me know I should continue improving this project.
