# Formatter

## Useful input field renderizing for broad purposes

![Example](https://github.com/izanoth/input_formatter/blob/master/screenshot.png)

### Usage:<br>
<code><small>var element = Formatter(form-element)<small></code>
<small>The input will be rendered as a child node.</small>

####

#### Quick Start
```
import Formatter from './src/formatter.js';
import $ from 'jquery';

$(document).ready(function () {
    const formatter = new Formatter($('#form'));
    var inputIntCurr = formatter.create();
    inputIntCurr.attr('class', 'myclass');
    formatter.renderInt(inputIntCurr);
});
```
Which will be rendered inside of ***form*** element as first child.
### Methods

#### create()
<small>Returns a input element as JQuey object.

#### renderInt()
<small>Renders an input field for comercial purposes, masked for all nature of currencies formats.</small>

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

The element created with renderInp()'s method has the following set of attributes:
name = 'amount';
id = 'amount';

Your are not encouraged to customize its attributes for usage.


#### renderPhone()
<small>Renders an input field.</small>
<small>Usage:<br>
```
import Formatter from './src/formatter.js';
import $ from 'jquery';

$(document).ready(function () {
    const formatter = new Formatter($('#form'));
    var inputPhone = formatter.create();
    formatter.renderPhone(inputPhone, '(00) 0000-0000'); //Or whatever other mask you want
});
```
The elements created with renderPhone()'s method has the following set of attributes bu default:
name = 'phone';
id = 'phone';

Your are not encouraged to customize its attributes for usage.

#### renderCpf()
<small>Renders a convenient input field with frontend Cpf validation.</small>

