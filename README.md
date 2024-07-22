# Formatter

Author:
Ivan Cilento

---


## Useful input field renderizing for broad purposes



![Example](https://github.com/izanoth/input_formatter/blob/main/screenshot.png)

---

### Usage:<br>
<code><small>var element = Formatter(form-element)<small></code>
<br>
<br>The input will be rendered as a child node.


#### Quick Start

```javascript
import Formatter from './src/formatter.js';
import $ from 'jquery';

$(document).ready(function () {
    const formatter = new Formatter($('#form'));
    var inputIntCurr = formatter.create();
    inputIntCurr.attr('class', 'myclass');
    formatter.renderInt(inputIntCurr);
});
```
Which will be rendered inside of ***#form*** element as a child.

---

### Methods

#### create()
<small>Returns a input element as JQuey object.

#### renderInt()
<small>Renders an input field for comercial purposes, masked for all sort of currencies formats.</small>

<small>For development:<br>renderInt() method has an asynchronous calling.<br>
You should to targets the NPM proxy to your php server in <code>vite.config.js</code></small>

```javascript
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

The element created with renderInp()'s method has the following set of attributes:<br>
<code>name = 'amount';<br>
id = 'amount';</code>

Don't customize it for usage.


#### renderPhone()
<small>Renders an input field.</small>
<small>Usage:<br>

```javascript
import Formatter from './src/formatter.js';
import $ from 'jquery';

$(document).ready(function () {
    const formatter = new Formatter($('#form'));
    var inputPhone = formatter.create();
    formatter.renderPhone(inputPhone, '(00) 0000-0000');
});
```
The elements created with renderPhone()'s method has the following set of attributes bu default:<br>
<code>name = 'phone';<br>
id = 'phone';</code>

Don't customize it for usage.

#### renderCpf()
<small>Renders a convenient input field with frontend CPF validation.</small>


 
##### Bug reports: ivanzanoth@gmail.com
