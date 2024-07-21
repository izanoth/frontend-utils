import Formatter from './src/formatter.js';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';

$(document).ready(function () {
    const formatter = new Formatter($('#form'));
    var inputInt = formatter.create();

    inputInt.attr('class', "form-control form-group bg-primary");
    console.log('main: ' + inputInt);
    formatter.renderInt(inputInt);

    var phone = formatter.create();
    phone.attr('class', "form-control form-group bg-primary");
    formatter.renderPhone(phone, '(00) 00000-0000');

    var inputCpf = formatter.create();
    inputCpf.attr('class', "form-control form-group bg-primary");
    formatter.renderCpf(inputCpf);
    /*el.id('test');
    el.name('name');
    el.classes('form-group form-control bg-info')
    el.rendrIn($('#app'));*/
});
