<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// --- NETHELY ADATBÁZIS BEÁLLÍTÁSOK ---
$host = 'mysql.nethely.hu';
$db   = 'fel1_radio';  // <--- A Nethelyen ez a "radio_db" megfelelője (felhasználónév_adatbázisnév)
$user = 'fel1';
$pass = 'Asd123asd';

try {
    // Kapcsolódás a PDO segítségével
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    // Hiba esetén JSON formátumban válaszolunk
    die(json_encode(["error" => "Kapcsolódási hiba: " . $e->getMessage()]));
}

$method = $_SERVER['REQUEST_METHOD'];

// Adatok lekérése (READ)
if ($method == 'GET') {
    $stmt = $pdo->query("SELECT * FROM adok");
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
}

// Adat hozzáadása (CREATE)
if ($method == 'POST') {
    $data = json_decode(file_get_contents("php://input"));
    if($data) {
        $stmt = $pdo->prepare("INSERT INTO adok (freq, power, channel, location) VALUES (?, ?, ?, ?)");
        $stmt->execute([
            $data->freq ?? '', 
            $data->power ?? '', 
            $data->channel ?? '', 
            $data->location ?? ''
        ]);
        echo json_encode(["status" => "success"]);
    }
}

// Adat törlése (DELETE)
if ($method == 'DELETE') {
    if(isset($_GET['id'])) {
        $id = $_GET['id'];
        $stmt = $pdo->prepare("DELETE FROM adok WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(["status" => "deleted"]);
    }
}

// Az OPTIONS kérés kezelése a CORS (keresztlekérés) miatt
if ($method == 'OPTIONS') {
    http_response_code(200);
    exit;
}
?>
