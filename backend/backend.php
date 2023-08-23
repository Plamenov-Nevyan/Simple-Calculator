<?php
    header('Content-Type: application/json');
     $jsonData = file_get_contents('php://input');
    $data = json_decode($jsonData, true);
    $num1 = floatval($_POST['num1']);
    $num2 = floatval($_POST['num2']);
    $operator = $_POST['operator'];
    if ($data !== null) {
        $num1 = $data['num1'];
        $operator = $data['operator'];
        $num2 = $data['num2'];
        echo $num1;
     }
?>