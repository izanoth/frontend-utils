<?php

if (isset($_SERVER['HTTP_ACCEPT_LANGUAGE'])) {
    $get_locale = locale_accept_from_http($_SERVER['HTTP_ACCEPT_LANGUAGE']);
}
else {
    $get_locale = 'en_US';
}
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
<html lang="<?= $get_locale ?>">
<meta name="title" content="Donate">
<meta name="description" content="">
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="author" content="Ivan Cilento" />

<meta property="og:title" content="Rifart - Donate">
<meta property="og:description" content="Help us to Still Alive!">
<meta property="og:url" content="https://donate.rifart.com.br">
<meta property="og:image" content="https://rifart.com.br/donate/img/znt1.png">
<meta property="og:type" content="website">
<head>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
	<link rel="stylesheet" href="css/bootstrap.min.css">
	<link rel="stylesheet" href="css/style.css">

	<script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
	<script src="js/script.js"></script>
	<link rel="stylesheet" href="css/style_main.css">
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
				switch (mask_.unmaskedValue.length) {
					case 4:

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

				if (mask_.unmaskedValue < 100) {
					mask_.value = '100';
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
	</script>
</head>
<style>

</style>

<body>
	<div class="film"><i class="fas fa-times"></i></div>
	<div class="startbox">
		<button id="payload"><i class="fa-solid fa-copy"></i> PIX Copia e Cola</button>
		<div id="qr">
			<div class="loading-qr"></div>
		</div>
	</div>

	<div class="container root" style="height:100%;width:100%;position:relative;">
		<div class="bx" style="width:568px;margin:auto;">
			<div class="row">
				<div class="col-md-6" style="position:relative;">
					<h1>Help us to still alive!</h1>
					<p>I'm a self-employed developer and, in essence, this is a start-up. The integration on the side is
						not a simple task. Your contribution would greatly support:</p>
					<ul>
						<li>Machinary upgrade</li>
						<li>Plan upgrade</li>
						<li>Enterprise formalization</li>
						<li>Investments all nature</li>
						<li>Studies</li>
						<li>Health care</li>
						<li>Save hungry brazilian folks</li>
					</ul>
					<div style="font-size:12px;line-height:1.3">For more information, bug reports or general questions,
						please contact me at <a class="btn-contact text-primary">ivan@rifart.com.br</a></div>
				</div>
				<style>
					.flex {
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						align-content: center;
					}
				</style>
				<div class="col-md-6">
					<div class="flex"
						style="width:100%;margin:auto;border:0px;border-radius: 10px;padding:30px;background-color:#eee ">
						<strong>Donate</strong>
						<div class="flex" style="width:100%;margin:auto;">
							<form class="form-group" id="payment-form" action="stripe/index.php" method="post">
								<div
									style="margin-right:20px;margin-left:20px;margin-top:20px;font-size:14px;font-weight:900;">
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
								<div class="flex" style="padding-bottom:20px;">
									<small style="font-size:10px;">Currency may vary according your card
										locale.</small>
								</div>
								<div class="flex" class="form-group don-info">
									<p>I'd like to know about you<br>
										<small style="font-size:10px;">(The fields below are optional)</small>
									</p>
									<div class="flex" style="margin:5px;">
										<input class="form-control" style="background-color:#eeffee;border:0px;"
											type="text" name="name" placeholder="Name" />
									</div>
									<div class="flex" style="margin:5px;">
										<input class="form-control" style="background-color:#eeffee;border:0px;"
											type="text" name="email" placeholder="E-mail" />
									</div>
								</div>
								<div style="width:100%;padding:5px;
							display:flex;flex-direction:column;justify-content:center;
							border:0px;border-radius:10px;">
									<?php
									if ($int_cur_symbol == "BRL") {
										echo "<button type='submit' class='btn btn-default' style='margin:auto;border:2px solid #00bdae;width:145px;background-color:rgb(225, 225, 250)';  box-shadow: 0 2px 2px 0 rgba(0,0,0,0.2), 0 2px 2px 0 rgba(0,0,0,0.19);'
											onclick='gen_qrcode(amount.value)'><img
												style='margin-left:auto;margin-rigth:auto;' src='img/pix.png'
												height='30' width='auto' /></button>
										<p style='padding-top:3px;text-align:center;font-weight:bold'>or</p>";
									}
									?>
									<div style="margin-left: auto;margin-right: auto;">
										<button type="submit" class="btn btn-success"
											style="width:120px;margin-left:auto;margin-right:auto;display:block;padding:10px;"><strong>Credit
												Card</strong></button>
										<img style="margin-left:auto;margin-right:auto;display:block;margin-top:12px;"
											src="img/stripesecure.png">
										<p style="font-weight:bold;text-align:center;font-size:10px;">No fees </p>
									</div>
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
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<script>
		$(document).ready(function () {
			$('.contact').hide();
			$('.pelicula').hide();
			$('.whoami').hide();

			$('.btn-contact').on('click', function () {
				if ($('.whoami').css('display') != 'none') {
					$('.whoami').fadeOut('fast');
				}
				$('.contact').fadeIn('fast');
				$('.pelicula').fadeIn('fast');
			})
			$('#whoami').on('click', function () {
				$('.whoami').fadeIn('fast');
				$('.pelicula').fadeIn('fast');
			})
			$('.fas').on('click', function () {
				if ($('.contact').css('display') == 'none') {
					$('.whoami').fadeOut('fast');
					$('.pelicula').fadeOut('fast');

				}
				else {
					$('.contact').fadeOut('fast');
					$('.pelicula').fadeOut('fast');
				}
			})



			$("#contact-form").on('submit', function (event) {
				event.preventDefault();
				async function send_mail() {
					let response = await fetch('includes/mail_request.php', {
						method: 'POST',
						headers: {
							'Accept': 'application/json, text/plain, */*',
							"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
						},
						body: JSON.stringify({
							name: document.querySelector('#contact-form').name.value,
							email: document.querySelector('#contact-form').email.value,
							subject: document.querySelector('#contact-form').subject.value,
							message: document.querySelector('#contact-form').message.value,
						})
					})
					if (response.status === 200) {
						let data = await response.text();
						$('.box').fadeOut('slow');
						$('.response').attr('class', 'alert alert-success response');
						$('.response').attr('role', 'alert');
						$('.response').html(data);
						$('.contact').fadeOut(2000);
						$('.pelicula').fadeOut(1000);
						$(".response").fadeIn(2000).delay(2000).fadeOut(2000);
					}
				}
				send_mail();
			});
		})

	</script>
	<!--Contact Elements-->
	<div class="pelicula"></div>

	<div class="box whoami card">
		<div class="card-body">
			<img src="img/ivan.jpg" style="padding:20px">
			<p style="text-align:justify">
				My name is Ivan Cilento, born in São Paulo's capital. I am a self-employed web developer and I created
				this
				platform from scratch. Due to a lack of working capital to open a store, the Rifart project actually
				woud be
				a raffle. ('Rifa', in portuguese, and 'rifa.art' would be most reasonable, but i hadn't $4000 wich was
				asking for) You can check out a demo of the project <a href="https://rifart.com.br/sample" target="_new">here</a>.

				Running the raffle itself requires digital marketing campaigns, partnerships, and acquiring the product
				(the
				prize). I've been working with PHP for over 8 years and, lately, with Laravel. I've also dabbled in
				Python
				for machine learning and other languages.

				This website was conceived as a project to apply the knowledge I've accumulated over the years. However,
				developing software without a team is quite challenging. The platform is integrated with reputable
				Fintech
				companies and is 100% secure.
				My main hobbies include composing music on MuseScore and drawing.
				I hope you have a great experience, and thank you for getting this far.
			</p>
		</div>
		<div class="card-footer">
			<button class="btn btn-primary btn-contact">Contact</button>
			<button class="btn btn-danger fas" style="position:absolute;right:15px;">Close</button>
		</div>
	</div>
	<style>
		.form-control {
			margin-bottom: 5px;
		}
	</style>
	<div class="panel panel-body response"></div>
	<div class="contact box card">
		<div style="height:50px">
			<i class="fas fa-times" style="top:5px;"></i>
		</div>
		<div class="card-body">
			<form action="" id="contact-form" class="form-group">
				<input class="form-control" type="text" name="name" placeholder="Nome..." />
				<input class="form-control" type="text" name="email" placeholder="E-mail..." />
				<label for="subject" class="form-label">Choose a subject:</label>
				<select class="form-select" name="subject" id="subject" placeholder="Subject...">
					<option value="I've a suggestion">I've a suggestion</option>

					<option value="I've a general question">I've a general question</option>
					<option value="I want to report a bug">I want to report a bug</option>
				</select>
				<textarea class="form-control" name="message" placeholder="Message..."></textarea>
				<input class="form-control btn btn-primary" type="submit" name="submit" />
			</form>
		</div>
	</div>
	<!--contact/-->
	<style type="text/css">
		.footer .row {
			margin: 20px;
		}

		.footer .col-sm-3 img {
			display: block;
			margin-left: auto;
			margin-right: auto;
			height: 20px;
		}

		@media (max-width: 576px) {
			.footer .col-sm-3 img {
				padding-top: 20px;
			}
		}

		#znt {
			margin: 20px;
			display: block;
			margin-left: auto;
			margin-right: auto;
		}

		.foot {
			max-width: 600px;
		}

		/*Owns*/
		.pelicula {
			width: 100%;
			height: 100%;
			background-color: #000;
			filter: opacity(0.5);
			z-index: 1;
			position: fixed;
			top: 0px;
			left: 0px;
		}

		.btn-contact-btn {
			position: fixed;
			bottom: 50px;
			right: 150px;
			z-index: 2;
			cursor: pointer;
		}

		.box {
			position: fixed;
			width: 300px;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			z-index: 2;
		}

		.box textarea {
			height: 200px;
		}

		.response {
			font-size: 26px;
			margin: auto;
			width: 100%;
			z-index: 3;
			position: fixed;
			top: 0px;
		}

		.text-primary {
			cursor: pointer;
		}

		.whoami {
			width: 600px;
		}

		.whoami img {
			float: right;
		}

		@media (max-width: 768px) {
			.whoami {
				width: 100%;
			}
		}
	</style>

	<div class="container foot">
		<div class="row pt-0 mt-0 d-flex flex-direction-row" style="margin-top:20px;">
			<div class="col text-center">
				<img src="img/apachelogo.png">
			</div>
			<div class="col text-center">
				<img src="img/postgreslogo.png">
			</div>
			<div class="col text-center">
				<img src="img/phplogo.png">
			</div>
			<div class="col text-center">
				<img class="img-fluid mr-0" src="img/ngroklogo.png">
			</div>
		</div>
		<div class="row">
			<div class="col-md-6 pt-4 h-100 text-md-start text-center">
				<ul class="list-inline mb-2">
					<li class="list-inline-item text-decoration-none text-primary" id="whoami">Who Am I</li>
					<li class="list-inline-item text-decoration-none text-primary btn-contact">Contact</li>
				</ul>
				<p class="text-muted small mb-md-0">Zanoth &copy; Independent Artworks 2023-2024. <br>All Rights
					Reserved.
				</p>
			</div>
			<div
				class="col-md-6 h-100 text-center text-md-end align-self-center align-items-center justify-content-center">
				<ul class="list-inline">
					<li class="list-inline-item">
						<a href="https://instagram.com/_zanoth_"><i style="font-size:32px"
								class="fa-brands fa-instagram"></i></a>
					</li>
					<li class="list-inline-item">
						<a href="https://linkedin.com/in/zanoth4"><i style="font-size:32px"
								class="fab fa-linkedin"></i></a>
					</li>
				</ul>
			</div>
		</div>
	</div>
</body>

</html>