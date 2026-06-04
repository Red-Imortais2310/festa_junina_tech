<?php
// obter_candidatos.php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");

$host     = "sql312.infinityfree.com"; 
$dbname   = "if0_41799046_aula_junina_proeja2026";
$username = "if0_41799046"; 
$password = "Agenor2310"; 

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $stmt = $pdo->query("SELECT id, nome, curso, categoria, foto_caminho, votos FROM candidatos ORDER BY nome ASC");
    $candidatos = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($candidatos);
} catch (PDOException $e) {
    echo json_encode([]);
}
exit;