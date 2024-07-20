// src/CurrencyData.js
export class CurrencyData {
    constructor({
        intCurSymbol,
        currencySymbol,
        pCsPrecedes,
        thousandsSep,
        decimalPoint,
        intFracDigits,
        monDecimalPoint,
        monThousandsSep,
        maskval,
        decimal,
        mask_thousd,
        mask_hundd,
        mask_thous,
        mask_hund,
        mask_d,
        mask_
    }) {
        this.intCurSymbol = intCurSymbol;
        this.currencySymbol = currencySymbol;
        this.pCsPrecedes = pCsPrecedes;
        this.thousandsSep = thousandsSep;
        this.decimalPoint = decimalPoint;
        this.intFracDigits = intFracDigits;
        this.monDecimalPoint = monDecimalPoint;
        this.monThousandsSep = monThousandsSep;
        this.maskval = maskval;
        this.decimal = decimal;
        this.mask_thousd = mask_thousd;
        this.mask_hundd = mask_hundd;
        this.mask_thous = mask_thous;
        this.mask_hund = mask_hund;
        this.mask_d = mask_d;
        this.mask_ = mask_;
    }

    // Adicione métodos se necessário para manipular os dados
    display() {
        console.log(`Currency Symbol: ${this.currencySymbol}`);
        console.log(`Decimal Point: ${this.decimalPoint}`);
        // Adicione mais exibições conforme necessário
    }

    toArray() {
        return [
            this.intCurSymbol,
            this.currencySymbol,
            this.pCsPrecedes,
            this.thousandsSep,
            this.decimalPoint,
            this.intFracDigits,
            this.monDecimalPoint,
            this.monThousandsSep,
            this.maskval,
            this.decimal,
            this.mask_thousd,
            this.mask_hundd,
            this.mask_thous,
            this.mask_hund,
            this.mask_d,
            this.mask_
        ];
    }

    toObject() {
        return {
            intCurSymbol: this.intCurSymbol,
            currencySymbol: this.currencySymbol,
            pCsPrecedes: this.pCsPrecedes,
            thousandsSep: this.thousandsSep,
            decimalPoint: this.decimalPoint,
            intFracDigits: this.intFracDigits,
            monDecimalPoint: this.monDecimalPoint,
            monThousandsSep: this.monThousandsSep,
            maskval: this.maskval,
            decimal: this.decimal,
            mask_thousd: this.mask_thousd,
            mask_hundd: this.mask_hundd,
            mask_thous: this.mask_thous,
            mask_hund: this.mask_hund,
            mask_d: this.mask_d,
            mask_: this.mask_
        };
    }
}



export {CurrencyData as default }