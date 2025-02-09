import $ from 'jquery';
import IMask from 'imask';
import intCurrenciesFormatter from './int_currencies.js';

export class Formatter {
	constructor(parent) {
		//this.el = document.createElement('input');
		this.parent = $(parent)[0];
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
		this.decimal = null;
	}

	create() {
		this.el = $(document.createElement('input'));
		return this.el;
	}
	
	renderInt(element_created) {
		var self = this;
		$.ajax({
			url: '/api/setLocale.php',
			type: 'GET',
			success: (response) => {

				this.currencyData = response;
				console.log(response);
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

				if (this.currencyData.intFracDigits === 0) {
					this.value = 500;
				}
				else {
					this.value = 10;
				}
				var input = element_created; //JQuery object
				var temp = element_created[0]; //Native element
				console.log('INPUT: '+input);
				input.attr('type', 'text');
				input.attr('value', this.value);
				input.attr('name', 'amount');
				input.attr('id', 'amount');
				//console.log('INPUT: '+	input);

				// Cria os elementos span
				let span1 = document.createElement('span');
				let span2 = document.createElement('span');
				console.log('prec ' + this.currencyData.pCsPrecedes);
				if (this.currencyData.pCsPrecedes === (1 || "1")) {
					$(span1).html(this.currencyData.currencySymbol);
					$(span2).html(this.currencyData.intCurSymbol);
					var input = element_created[0]; //Native element

					container.appendChild(span1);
					container.appendChild(input);
					container.appendChild(span2);
					console.log(container);
				} else {
					span1.textContent = `${this.currencyData.currencySymbol} ${this.currencyData.intCurSymbol}`;
					var input = element_created[0]; //Native element

					container.appendChild(input);
					container.appendChild(span1);
				}
				self.parent.appendChild(container);
				var intCurr = new intCurrenciesFormatter();
				intCurr._engine(this);
			},
			error: function (xhr, status, error) {
				console.log('Erro na requisição: status=' + status + ', erro=' + error);
			}
		});
	}

	renderPhone(element_created, string) {
		if (!mask) {
			return false;
		}
		var self = this;
		var input = element_created;
		input.attr('type', 'text');
		input.attr('name', 'phone');
		input.attr('id', 'phone');

		function mask(element, parameter) {
			IMask(element, {
				mask: parameter
			});
		}
		var input = input[0];
		mask(input, string);
		self.parent.append(input);
	}


	renderCpf(element_created) {
		//Masked
		var self = this;
		var input = element_created;
		input.attr('type', 'text');
		input.attr('name', 'cpf');
		input.attr('id', 'cpf');
		function mask(element, parameter) {
			IMask(element, {
				mask: parameter
			});
		}
		var input = input[0];
		mask(input, '000.000.000-00');
		self.parent.append(input);
		
		//frontend validaion
		$('#cpf').on('input', function () {
			var element = $('#cpf');
			var val = element.val();
			let cpfValue = val.replace(/\D/g, "");
			var result;
			cpfValue.length == 11 ?
				result = validateCpf(cpfValue) :
				result = false;
			console.log('RESULT: ', result);
			if (result) {
				$('#cpf').removeClass('is-invalid');
				$('#cpf').addClass('is-valid focused');
			} else {
				$('#cpf').addClass('is-invalid');
			}
		})
		//validateCpf(string) 
		function validateCpf(cpfString) {
			var strStorage = cpfString;
			let total = 0;
			let factor;
			let x;
	
			function gear(str, onceFirst) {
				if (!onceFirst) {
					var substr = str.substring(0, 9);
					x = validatingDigit(substr);
					console.log('match?: ', x == strStorage.substr(9, 1))
					if (x == strStorage.substr(9, 1)) {
						var withFirst = str.substring(0, 9) + str.substr(9, 1);
						return gear(withFirst, true);
					} else {
						return false;
					}
				} else {
					x = validatingDigit(str, true);
					console.log('match2? :', x == strStorage.substr(10, 1));
					if (x == strStorage.substr(10, 1)) {
						console.log('It worked!');
						return true;
					} else {
						console.log('no valid');
						return false;
					}
				}
				function validatingDigit(str, onceFirst) {
					onceFirst ?
						factor = 11 :
						factor = 10;
					total = 0;
					for (let i = 0; i < str.length; i++) {
						total += parseInt(str.charAt(i)) * factor;
						factor--;
					}
					var rest = total % 11;
					if (rest == 10) {
						x = 0;
					} else {
						x = Math.abs(11 - rest);
					}
					return x;
				}
			}
			if (cpfString.length == 11) {
				return gear(cpfString);
			}
		}
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