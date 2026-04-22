<?php
header("Content-Type: application/json");

$host = "mysql.omega"; 
$user = "fel1"; 
$pass = "Asd123asd"; 
$db   = "fel1"; 

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Adatbázis hiba: " . $conn->connect_error]));
}

// Megnézzük, milyen típusú kérés érkezett (GET, POST, DELETE, PUT)
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    // 1. LISTÁZÁS: Ha csak simán megnyitják az oldalt, küldjük el az adatokat
    $sql = "SELECT id, freq, power, channel, location FROM radio_db";
    $result = $conn->query($sql);
    $radios = [];
    
    if ($result) {
        while($row = $result->fetch_assoc()) {
            $radios[] = $row;
        }
    }
    echo json_encode($radios);

} elseif ($method === 'POST') {
    // 2. MENTÉS: Új adat felvitele
    $data = json_decode(file_get_contents('php://input'), true);
    
    if ($data) {
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

} elseif ($method === 'DELETE') {
    // 3. TÖRLÉS: Az URL-ben érkező ID alapján
    if (isset($_GET['id'])) {
        $id = intval($_GET['id']);
        $sql = "DELETE FROM radio_db WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $id);
        
        if($stmt->execute()) {
            echo json_encode(["status" => "deleted"]);
        } else {
            echo json_encode(["status" => "error"]);
        }
    }
}

$conn->close();
?>