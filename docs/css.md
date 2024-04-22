## Styles

We can use "CSS Modules" or "CSS" to give styles to our application web.
With ccs modules we generate a hash for avoid repeat class names.

## CSS Modules

### Setup

Modify [`webpack.config.js`][webpackconfig]
to add the following rule:

```
  module: {
      rules: [
        {
          test: /\.module\.css$/,
          use: [
            isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                modules: {
                  mode: "local",
                  localIdentName: isDevelopment
                    ? "[path][name]__[local]--[hash:base64:5]"
                    : "[hash:base64:5]",
                },
                importLoaders: 1,
              },
            },
          ],
        },
    ]
  }
```

Added [css-modules.d.ts] to avoid problem with typeScript
path: podcast/types/css-modules.d.ts

```ts
declare module "*.module.css" {
  const classes: { [key: string]: string };
  export = classes;
}
```


### Usage

The syntax is very similar to css but adding `.modules.`. This way we avoid problem with names class due to our configuration.
The key difference in CSS Modules is that you import styles to a variable.

**`Button.module.css`**

```css
.danger {
  background-color: red;
}
```

**`Button.tsx`**

```tsx
import React from 'react';
import * as styles from "./Button.module.css";

function Button() {  
  return <button className={styles.danger}>Click me</button>;
}
```
> For more information about CSS Modules see https://github.com/css-modules/css-modules

## CSS 

### Setup

Modify [`webpack.config.js`][webpackconfig]
to add the following rule:

```
  module: {
      rules: [        
        {
          test: /\.css$/,
          exclude: /\.module\.css$/,
          use: [
            isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
            "css-loader",
          ],
        },
    ]
  }
```

### Usage

The key difference in CSS Modules is that you import the file and use the class name.

**`Button.css`**

```css
.danger {
  background-color: red;
}
```

**`Button.tsx`**

```tsx
import React from 'react';
import "./Button.css";

function Button() {  
  return <button className={"danger"}>Click me</button>;
}
```