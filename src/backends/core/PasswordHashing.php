<?php
function manual_custom_hash($password)
{
    $salt = 'mySaltKey';
    $pepper = 'myPepperKey';

    $input = $salt . $password . $pepper;
    $hash = '';

    // Manual pseudo hashing: convert each char to ASCII, add position, and scramble
    for ($i = 0; $i < strlen($input); $i++) {
        $char = ord($input[$i]); // ASCII
        $char += $i * 7;         // Add some positional multiplier
        $hash .= dechex($char);  // Convert to hexadecimal
    }

    return $hash;
}
