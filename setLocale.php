<?php
header('Content-Type: application/json');

$locale = locale_accept_from_http($_SERVER['HTTP_ACCEPT_LANGUAGE']);
setlocale(LC_ALL, 'ja_JP');
$localeInfo = localeconv();
$intCurSymbol = str_replace(" ", "", $localeInfo['int_curr_symbol']);
$currencySymbol = $localeInfo["currency_symbol"];
$pCsPrecedes = $localeInfo["p_cs_precedes"];
$thousandsSep = $localeInfo["thousands_sep"];
$decimalPoint = $localeInfo['decimal_point'];
$intFracDigits = $localeInfo["int_frac_digits"];
$monDecimalPoint = $localeInfo['mon_decimal_point'];
$monThousandsSep = $localeInfo['mon_thousands_sep'];
$mask_hundd = " 000" . $decimalPoint . str_repeat("0", intval($intFracDigits)) . "000";
$mask_thousd = " 00" . $decimalPoint . str_repeat("0", intval($intFracDigits)) . "00";
$mask_d = " 0" . $decimalPoint . str_repeat("0", intval($intFracDigits)) . "0'";
$mask_hund = "000" . $thousandsSep . "000" . $decimalPoint . str_repeat("0", intval($intFracDigits)) . "";
$mask_thous = " 00" . $thousandsSep . "000" . $decimalPoint . str_repeat("0", intval($intFracDigits)) . "00";
$mask_ = " 0" . $thousandsSep . "000" . $decimalPoint . str_repeat("0", intval($intFracDigits)) . "0";

if ($intFracDigits > 0) {
    $maskval = "500";
    $decimal = "true";
} else {
    $mask = "00000";
    $maskval = "500";
    $decimal = "false";
}
 // Simular dados retornados pelo PHP
$data = [
    'intCurSymbol' => $intCurSymbol,
    'currencySymbol' => $currencySymbol,
    'pCsPrecedes' => $pCsPrecedes,
    'thousandsSep' => $thousandsSep,
    'decimalPoint' => $decimalPoint,
    'intFracDigits' => $intFracDigits,
    'monDecimalPoint' => $monDecimalPoint,
    'monThousandsSep' => $monThousandsSep,
    'maskval' => $maskval,
    'decimal' => $decimal,
    'mask_thousd' => $mask_thousd,
    'mask_hundd' => $mask_hundd,
    'mask_thous' => $mask_thous,
    'mask_hund' => $mask_hund,
    'mask_d' => $mask_d,
    'mask_' => $mask_
];

echo json_encode($data);
