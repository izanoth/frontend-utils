import Formatter from './src/formatter.js';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import EventIn from './src/events.js';

$(document).ready(function () {
    const formatter = new Formatter($('#form'));
    var inputInt = formatter.create();

    inputInt.attr('class', "form-control bg-primary");
    console.log('main: ' + inputInt);
    formatter.renderInt(inputInt);

    var phone = formatter.create();
    phone.attr('class', "form-control bg-primary");
    formatter.renderPhone(phone, '(00) 00000-0000');

    var inputCpf = formatter.create();
    inputCpf.attr('class', "form-control form-group bg-primary");
    formatter.renderCpf(inputCpf);


    var btn = new EventIn($('#button'));
    btn.infoup('test.html').color('#11cc11');
});
