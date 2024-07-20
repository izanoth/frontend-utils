<?php


$get_locale = locale_accept_from_http($_SERVER['HTTP_ACCEPT_LANGUAGE']);
setlocale(LC_ALL, $get_locale);
$locale_info = localeconv();
$int_cur_symbol = str_replace(" ", "", $locale_info['int_curr_symbol']);
$currency_symbol = $locale_info["currency_symbol"];
$p_cs_precedes = $locale_info["p_cs_precedes"];
$thousands_sep = $locale_info["thousands_sep"];
$decimal_point = $locale_info['decimal_point'];
$int_frac_digits = $locale_info["int_frac_digits"];
$mon_decimal_point = $locale_info['mon_decimal_point'];
$mon_thousands_sep = $locale_info['mon_thousands_sep'];
?>

<!DOCTYPE html>
<html>
<meta name="title" content="Donate">
<meta name="description" content="">
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="keywords" content="" />

<head>
	<link rel="stylesheet" href="css/bootstrap.css">
	<link rel="stylesheet" href="css/bootstrap.min.css">
	<script>
		function calc(param) {
			var result = param.value;
			var box = document.getElementById('result');
			box.innerHTML = "R$ <strong style='font-size:28px;'>" + result.toString() + "</strong> ,00";
		}		
	</script>
	<link rel="stylesheet" href="css/style_main.css">
	<script src="js/dropup1.1.js"></script>
	<script src="js/funcs.js"></script>

	<script src="https://unpkg.com/imask@6.4.2/dist/imask.js"></script>
	<script>
		window.onload = function () {
			var element = document.getElementById('amount');
			var maskOptions = {
				mask: '00000'
			};
			var mask = IMask(element, maskOptions);
		}
	</script>
	<script src="https://unpkg.com/imask@6.4.2/dist/imask.js"></script>
	<script>
		<?php
		$mask_hundd = "' 000" . $decimal_point . str_repeat("0", intval($int_frac_digits)) . "000'";
		$mask_thousd = "' 00" . $decimal_point . str_repeat("0", intval($int_frac_digits)) . "00'";
		$mask_d = "' 0" . $decimal_point . str_repeat("0", intval($int_frac_digits)) . "0'";

		$mask_hund = "'000" . $thousands_sep . "000" . $decimal_point . str_repeat("0", intval($int_frac_digits)) . "'";
		$mask_thous = "' 00" . $thousands_sep . "000" . $decimal_point . str_repeat("0", intval($int_frac_digits)) . "00'";
		$mask_ = "' 0" . $thousands_sep . "000" . $decimal_point . str_repeat("0", intval($int_frac_digits)) . "0'";
		if ($int_frac_digits > 0) {
			$maskval = "500";
			$decimal = "true";
		} else {
			$mask = "'00000'";
			$maskval = "500";
			$decimal = "false";
		}
		?>
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

		window.onload = function () {
			var element = document.getElementById('amount');
			var maskval = <?= $maskval ?>;
			var decimal = <?= $decimal ?>;
			console.log(decimal);
			if (decimal) {
				var maskOptions = {
					mask: Number,
					min: 100
				}
			}
			else {
				var maskOptions = {
					mask: Number,
					min: 100
				}
			}

			function gear() {
				console.log(mask_);
				switch (mask_.unmaskedValue.length) {
					case 4:
						console.log(mask_.value);
						var maskOptions = {
							mask: <?= $mask_thousd ?>
						}
						break;
					case 5:
						var maskOptions = {
							mask: <?= $mask_hundd ?>
						}
						break;
					case 6:
						var maskOptions = {
							mask: <?= $mask_ ?>
						}
						break;
					case 7:
						var maskOptions = {
							mask: <?= $mask_thous ?>
						}
						break;
					case 8:
						var maskOptions = {
							mask: <?= $mask_hund ?>
						}
						break;
					default:
						var maskOptions = {
							mask: <?= $mask_d ?>
						}
				}

				mask_.updateOptions(maskOptions);
				var field = document.getElementById('amount');
				createSel(field, (mask_.value.length - 1), mask_.value.length);
				console.log(mask_.unmaskedValue);
				if (mask_.unmaskedValue < 100) {
					mask_.value = '1,00';
				}
			}
			function check_ifnondecimalnull() {
				console.log(mask_.unmaskedValue);
				if (mask_.unmaskedValue == "") {
					mask_.unmaskedValue = "100";
				}
			}
			var mask_ = IMask(element, maskOptions);
			if (decimal) { mask_.on("accept", gear) }
			else { mask_.on("accept", check_ifnondecimalnull) }
			mask_.value = maskval.toString();
			if (decimal) { gear(); }
			console.log(mask_.masked);
		}
	</script>
</head>

<body>

	<form class="form-group" id="payment-form" action="stripe/index.php" method="post">
		<div style="margin-right:20px;margin-left:20px;margin-top:20px;font-size:14px;font-weight:900;">
			<?php
			$int_frac_digits == "0" ?
				$value = 500 :
				$value = 10;
			if ($p_cs_precedes == "1") {
				echo "<span>" . $currency_symbol . "</span> 
					         					<input class='form-control' type='text' id='amount' style='width:100%;direction:rtl;unicode-bidi:normal;border:0px;background-color:transparent;font-size:16px; padding:5px;display:inline-block;width:80px;margin-right:10px;margin-left:10px;' value='$value' name='amount'/>
													<span>" . $int_cur_symbol . "</span>";
			} else {
				echo "<input class='form-control' type='text' id='amount' style='width:100%;direction:rtl;unicode-bidi:normal;border:0px;background-color:transparent;font-size:16px; padding:5px;display:inline-block;width:80px;margin-right:10px;margin-left:10px;' value='$value' name='amount'/>
													<span>" . $currency_symbol . " " . $int_cur_symbol . "</span>";
			}

			?>
		</div>
		<div style="padding-bottom:20px;">
			<small style="font-size:10px;">Currency may vary according your card locale.</small>
		</div>
		<div class="form-group don-info">
			<p>I'd like to know about you<br>
				<small style="font-size:10px;">(The fields below are optional)</small>
			</p>
			<div style="margin:5px;">
				<input class="form-control" style="background-color:#eeffee;border:0px;" type="text" name="name"
					placeholder="Name" />
			</div>
			<div style="margin:5px;">
				<input class="form-control" style="background-color:#eeffee;border:0px;" type="text" name="email"
					placeholder="E-mail" />
			</div>
		</div>
		<div style="margin:20px;margin-left: auto;margin-right: auto;">
			<button type="submit" class="btn btn-success"
				style="width:120px;margin-left:auto;margin-right:auto;display:block;padding:10px;"><strong>Make
					it!</strong></button>
			<img style="margin-left:auto;margin-right:auto;display:block;margin-top:12px;" src="img/stripesecure.png">
			<p style="font-weight:bold;text-align:center;font-size:10px;">No fees Credit Card</p>
		</div>
		<?php
		!$p_cs_precedes ?
			$p_cs_precedes = "true" :
			$p_cs_precedes = "false";
		$int_frac_digits == "0" ?
			$int_frac_digits = "false" :
			$int_frac_digits = "true";
		?>
		<input type="hidden" value="<?= $p_cs_precedes ?>" name="p_cs_precedes" />
		<input type="hidden" value="<?= $currency_symbol ?>" name="currency_symbol" />
		<input type="hidden" value="<?= $int_cur_symbol ?>" name="int_cur_symbol" />
		<input type="hidden" value="<?= $int_frac_digits ?>" name="int_frac_digits" />
	</form>




</body>

</html>