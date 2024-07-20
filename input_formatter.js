import $ from 'jquery';
import IMask from 'imask';

export class Formatter {
    constructor(element) {
        this.element = element;
        console.log(this.element);
    }
    configurate() {
        console.log(IMask);

        var maskOptions = {
            mask: '00000'
        };
        IMask(this.element, maskOptions);
        console.log('ok');

        $.ajax({
            url: './setLocale.php',
            type: 'GET',
            success: function (response) {
                console.log(response);
            },  
            error: function (xhr, status, error) {
                console.log('Erro na requisição: status=' + status + ', erro=' + error);
            }
        }
        );
    }

    engineStart() {
        var element = this.element;
        var maskval = this.maskval;
        var decimal = this.decimal;

        var maskOptions = {
            mask: Number,
            min: 100
        }

        function gear() {
            switch (mask_.unmaskedValue.length) {
                case 4:
                    var maskOptions = {
                        mask: this.mask_thousd
                    }
                    break;
                case 5:
                    var maskOptions = {
                        mask: this.mask_hundd
                    }
                    break;
                case 6:
                    var maskOptions = {
                        mask: mask_
                    }
                    break;
                case 7:
                    var maskOptions = {
                        mask: this.mask_thous
                    }
                    break;
                case 8:
                    var maskOptions = {
                        mask: this.mask_hund
                    }
                    break;
                default:
                    var maskOptions = {
                        mask: this.mask_d
                    }
            }

            mask_.updateOptions(maskOptions);
            var field = document.getElementById('amount');
            createSel(field, (mask_.value.length - 1), mask_.value.length);

            if (mask_.unmaskedValue < 100) {
                mask_.value = '1,00';
            }
        }
        function check_ifnondecimalnull() {

            if (mask_.unmaskedValue == "") {
                mask_.unmaskedValue = "100";
            }
        }
        var mask_ = IMask(element, maskOptions);
        if (decimal) { mask_.on("accept", gear) }
        else { mask_.on("accept", check_ifnondecimalnull) }
        mask_.value = maskval.toString();
        if (decimal) { gear(); }

    }



    createSel(field, start, end) {
        if (field.createTextRange) {
            var selRange = field.createTextRange();
            selRange.collapse(true);
            selRange.moveStart('character', start);
            selRange.moveEnd('character', end);
            selRange.select();
            field.focus();
        } else if (field.setSelectionRange) {
            field.focus();
            field.setSelectionRange(start, end);
        } else if (typeof field.selectionStart != 'undefined') {
            field.selectionStart = start;
            field.selectionEnd = end;
            field.focus();
        }
    }
}

//export { Formatter as default };



