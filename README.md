# Formatter

## Useful input field rendizing for broad purposes

### Manual:<br>
<code><small>Formatter(parent-element)<small></code>

The input will be rendered as a child node.

#### Quick Start
```
import Formatter from './src/formatter.js';
import $ from 'jquery';

$(document).ready(function () {
    const formatter = new Formatter($('#app'));
    formatter.renderInput();
});
```
### Methods

#### renderInt()
<small>Render an input field for comercial purposes, masked for all nature of currencies formats.</small>

<small>**For development**<br>renderInt() method has an asynchronous calling.<br>
You should to targets the NPM proxy to your php server in <code>vite.config.js</code></small>
```
server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
}
```