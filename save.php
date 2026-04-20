<?php
header("Content-Type: application/json");

// Nethelyes adatok - PONTOSAN így:
$host = "mysql.omega"; 
$user = "fel1"; 
$pass = "Asd123asd"; 
$db   = "fel1"; 

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Adatbázis hiba: " . $conn->connect_error]));
}

$data = json_decode(file_get_contents('php://input'), true);

if ($data) {
    // Figyelj a kis/nagybetűkre: a script.js-ben Frekvencia (nagy F) van!
    $frekv = $data['Frekvencia']; 
    $telj  = $data['teljesitmeny'];
    $csat  = $data['csatorna'];
    $hely  = $data['adohely'];

    $sql = "INSERT INTO radio_db (freq, power, channel, location) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssss", $frekv, $telj, $csat, $hely);

    if($stmt->execute()) {
        echo json_encode(["status" => "success"]);
    } else {
        echo json_encode(["status" => "error", "message" => $stmt->error]);
    }
}
?>