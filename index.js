import Formatter from './src/formatter.js';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';

$(document).ready(function () {
    const formatter = new Formatter($('#app'));
    //formatter.setLocale();

    formatter.renderInput();
    /*el.id('test');
    el.name('name');
    el.classes('form-group form-control bg-info')
    el.rendrIn($('#app'));*/
});
