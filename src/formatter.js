import $ from 'jquery';
import IMask from 'imask';
import CurrencyData from './currencyData.js';

//# sourceMappingURL=imask.js.map



export class Formatter {
    constructor(element) {
        this.element = $(element)[0];
        this.currencyData = null;
        this.value = null;
        this.mask_hundd = null;
        this.mask_thousd = null;
        this.mask_d = null;
        this.mask_hund = null;
        this.mask_thous = null;
        this.mask_ = null;
        this.maskval = null;
        this.decimal = null;
        this.maskval = null;
        this.decimal = null;
    }

    _engine() {
        var self = this;
        var element = document.getElementById('amount');
        var maskval = this.currencyData.maskval;
        var decimal = this.currencyData.decimal;
        console.log('decimal: '+decimal);
        var maskOptions = {
            mask: Number,
            min: 100
        }

        function gear() {
            console.log(self.currencyData);
            switch (mask_.unmaskedValue.length) {
                case 4:
                    var maskOptions = {
                        mask: self.currencyData.mask_thousd
                    }
                    break;
                case 5:
                    var maskOptions = {
                        mask: self.currencyData.mask_hundd
                    }
                    break;
                case 6:
                    var maskOptions = {
                        mask: self.currencyData.mask_
                    }
                    break;
                case 7:
                    var maskOptions = {
                        mask: self.currencyData.mask_thous
                    }
                    break;
                case 8:
                    var maskOptions = {
                        mask: self.currencyData.mask_hund
                    }
                    break;
                default:
                    var maskOptions = {
                        mask: self.currencyData.mask_d
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
        function createSel(field, start, end) {
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
        var mask_ = IMask(element, maskOptions);
        if (decimal) { mask_.on("accept", gear) }
        else { mask_.on("accept", check_ifnondecimalnull) }
        mask_.value = maskval.toString();
        if (decimal) { gear(); }
    }





    renderInput() {
        $.ajax({
            url: '/api/setLocale.php',
            type: 'GET',
            success: (response) => {

                this.currencyData = response;
                console.log('RESP: '+JSON.stringify(response));
                if (this.currencyData.intFracDigits > 0) {
                    this.maskval = "500";
                    this.decimal = "true";
                }
                else {
                    this.maskval = "500";
                    this.decimal = "false";
                }

                const container = document.createElement('div');

                container.innerHTML = '';

                if (this.currencyData.intFracDigits == "0") {
                    this.value = 500;
                }
                else {
                    this.value = 10;
                }
                var input = document.createElement('input');
                input.type = 'text';
                input.value = this.value;
                input.name = 'amount';
                input.id = 'amount';

                // Cria os elementos span
                let span1 = document.createElement('span');
                let span2 = document.createElement('span');
                console.log('prec '+this.currencyData.pCsPrecedes);
                if (this.currencyData.pCsPrecedes === (1 || "1")) {
                    span1.innerHTML = this.currencyData.currencySymbol;
                    span2.innerHTML = this.currencyData.intCurSymbol;

                    container.appendChild(span1);
                    container.appendChild(input);
                    container.appendChild(span2);
                } else {
                    span1.textContent = `${this.currencyData.currencySymbol} ${this.currencyData.intCurSymbol}`;

                    container.appendChild(input);
                    container.appendChild(span1);
                }

                /*var maskOptions = {
                    mask: '00000'
                };
                IMask(input, maskOptions);*/
                this.element.append(container);

                this._engine();
            },
            error: function (xhr, status, error) {
                console.log('Erro na requisição: status=' + status + ', erro=' + error);
            }


        });
        /*id(arg) {
            input.attr('id', arg);
        }
 
        name(arg) {
            this.input.attr('name', arg);
        }
 
        class(arg) {
            input.attr('class', arg);
        }
 
        renderIn(arg) {
            $(arg)[0].append(input);
        }*/
    }












    set intCurSymbol(value) {
        if (this.currencyData) {
            this.currencyData.intCurSymbol = value;
        }
    }
    get intCurSymbol() {
        return this.currencyData ? this.currencyData.intCurSymbol : undefined;
    }

    // Métodos set e get para currencySymbol
    set currencySymbol(value) {
        if (this.currencyData) {
            this.currencyData.currencySymbol = value;
        }
    }
    get currencySymbol() {
        return this.currencyData ? this.currencyData.currencySymbol : undefined;
    }

    // Métodos set e get para pCsPrecedes
    set pCsPrecedes(value) {
        if (this.currencyData) {
            this.currencyData.pCsPrecedes = value;
        }
    }
    get pCsPrecedes() {
        return this.currencyData ? this.currencyData.pCsPrecedes : undefined;
    }

    // Métodos set e get para thousandsSep
    set thousandsSep(value) {
        if (this.currencyData) {
            this.currencyData.thousandsSep = value;
        }
    }
    get thousandsSep() {
        return this.currencyData ? this.currencyData.thousandsSep : undefined;
    }

    // Métodos set e get para decimalPoint
    set decimalPoint(value) {
        if (this.currencyData) {
            this.currencyData.decimalPoint = value;
        }
    }
    get decimalPoint() {
        return this.currencyData ? this.currencyData.decimalPoint : undefined;
    }

    // Métodos set e get para intFracDigits
    set intFracDigits(value) {
        if (this.currencyData) {
            this.currencyData.intFracDigits = value;
        }
    }
    get intFracDigits() {
        return this.currencyData ? this.currencyData.intFracDigits : undefined;
    }

    // Métodos set e get para monDecimalPoint
    set monDecimalPoint(value) {
        if (this.currencyData) {
            this.currencyData.monDecimalPoint = value;
        }
    }
    get monDecimalPoint() {
        return this.currencyData ? this.currencyData.monDecimalPoint : undefined;
    }

    // Métodos set e get para monThousandsSep
    set monThousandsSep(value) {
        if (this.currencyData) {
            this.currencyData.monThousandsSep = value;
        }
    }
    get monThousandsSep() {
        return this.currencyData ? this.currencyData.monThousandsSep : undefined;
    }

    // Métodos set e get para maskval
    set maskval(value) {
        if (this.currencyData) {
            this.currencyData.maskval = value;
        }
    }
    get maskval() {
        return this.currencyData ? this.currencyData.maskval : undefined;
    }

    // Métodos set e get para decimal
    set decimal(value) {
        if (this.currencyData) {
            this.currencyData.decimal = value;
        }
    }
    get decimal() {
        return this.currencyData ? this.currencyData.decimal : undefined;
    }

    // Métodos set e get para mask_thousd
    set mask_thousd(value) {
        if (this.currencyData) {
            this.currencyData.mask_thousd = value;
        }
    }
    get mask_thousd() {
        return this.currencyData ? this.currencyData.mask_thousd : undefined;
    }

    // Métodos set e get para mask_hundd
    set mask_hundd(value) {
        if (this.currencyData) {
            this.currencyData.mask_hundd = value;
        }
    }
    get mask_hundd() {
        return this.currencyData ? this.currencyData.mask_hundd : undefined;
    }

    // Métodos set e get para mask_thous
    set mask_thous(value) {
        if (this.currencyData) {
            this.currencyData.mask_thous = value;
        }
    }
    get mask_thous() {
        return this.currencyData ? this.currencyData.mask_thous : undefined;
    }

    // Métodos set e get para mask_hund
    set mask_hund(value) {
        if (this.currencyData) {
            this.currencyData.mask_hund = value;
        }
    }
    get mask_hund() {
        return this.currencyData ? this.currencyData.mask_hund : undefined;
    }

    // Métodos set e get para mask_d
    set mask_d(value) {
        if (this.currencyData) {
            this.currencyData.mask_d = value;
        }
    }
    get mask_d() {
        return this.currencyData ? this.currencyData.mask_d : undefined;
    }

    // Métodos set e get para mask_
    set mask_(value) {
        if (this.currencyData) {
            this.currencyData.mask_ = value;
        }
    }
    get mask_() {
        return this.currencyData ? this.currencyData.mask_ : undefined;
    }
}

export { Formatter as default }