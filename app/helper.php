<?php

use Carbon\Carbon;


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

if (!function_exists('calculateAttendanceStatus')) {
    function calculateAttendanceStatus($checkInTime, $checkOutTime)
    {
        $lateCheckInTime = Carbon::createFromTime(8, 30, 0); // 8:30 AM
        $officeClosingTime = Carbon::createFromTime(17, 0, 0); // 5:00 PM

        $checkInTime = Carbon::createFromFormat('H:i:s', $checkInTime);
        $checkOutTime = Carbon::createFromFormat('H:i:s', $checkOutTime);

        $status = 'present';

        if ($checkInTime->greaterThan($lateCheckInTime)) {
            $status = 'late';
        }

        if ($checkOutTime->lessThan($officeClosingTime)) {
            $status = 'early_out';
        }

        if ($checkInTime->lessThan($lateCheckInTime) && $checkOutTime->greaterThan($officeClosingTime)) {
            $status = 'present';
        }

        if ($checkInTime->greaterThanOrEqualTo(Carbon::createFromTime(5, 30, 0)) && $checkOutTime->greaterThan($officeClosingTime)) {
            $status = 'ot';
        }

        $totalOvertime = 0;
        if ($checkOutTime->greaterThan($officeClosingTime)) {
            $totalOvertime = $checkOutTime->diffInMinutes($officeClosingTime);
            $status = 'ot';
        }

        return ['status' => $status, 'total_overtime' => $totalOvertime];
    }
}
