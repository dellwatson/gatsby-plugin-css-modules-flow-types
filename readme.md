# gatsby-plugin-css-modules-flow-types

Gatsby plugin for generating Flow types for CSS Modules using
[css-modules-flow-types][].

## Usage

Install the plugin:

```
yarn add gatsby-plugin-css-modules-flow-types
```

Add it to your `gatsby-config.js` file:

```js
plugins: [
  'gatsby-plugin-css-modules-flow-types',
]
```

And that's it!

Now when you import a `.module.css` file, css-modules-flow-types
will automatically create
a corresponding `.module.css.flow` file containing its Flow types. Flow will
use it to warn you if you're using class names that aren't
defined in the `.module.css` file.

[css-modules-flow-types]: https://github.com/skovhus/css-modules-flow-types
