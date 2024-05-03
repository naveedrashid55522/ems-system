<?php

if (!function_exists('showEmployeeTime')) {
    function showEmployeeTime($checkIn, $checkOut)
    {
        $check_in = strtotime($checkIn);
        $check_out = strtotime($checkOut);
        $totalSeconds = $check_out - $check_in;
        $hours = floor($totalSeconds / 3600);
        $minutes = floor(($totalSeconds % 3600) / 60);
        $seconds = $totalSeconds % 60;

        return sprintf('%02d:%02d:%02d', $hours, $minutes, $seconds);
    }
}


if (!function_exists('textFormating')) {
    function textFormating($text)
    {
        $status = str_replace('_', ' ', $text); 
        $status = ucwords($status);
        $status = str_replace('', ' ', $status);
        return  $status;
    }
}
