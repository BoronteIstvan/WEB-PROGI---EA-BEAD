<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

$host = 'localhost';
$db   = 'radio_db';
$user = 'root';
$pass = '';


try {
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $pass);
} catch (PDOException $e) {
    die(json_encode(["error" => $e->getMessage()]));
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method == 'GET') {
    $stmt = $pdo->query("SELECT * FROM adok");
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
}

if ($method == 'POST') {
    $data = json_decode(file_get_contents("php://input"));
    $stmt = $pdo->prepare("INSERT INTO adok (freq, power, channel, location) VALUES (?, ?, ?, ?)");
    $stmt->execute([$data->freq, $data->power, $data->channel, $data->location]);
    echo json_encode(["status" => "success"]);
}

if ($method == 'DELETE') {
    $id = $_GET['id'];
    $stmt = $pdo->prepare("DELETE FROM adok WHERE id = ?");
    $stmt->execute([$id]);
    echo json_encode(["status" => "deleted"]);
}
?>
