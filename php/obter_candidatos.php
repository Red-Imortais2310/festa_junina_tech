<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");

$host   = "sql312.infinityfree.com";
$dbname = "if0_41799046_aula_junina_proeja2026";
$user   = "if0_41799046";
$pass   = "Agenor2310";

try {
    $pdo  = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $user, $pass);
    $stmt = $pdo->query("SELECT id, nome, curso, categoria, foto_caminho, votos FROM candidatos ORDER BY nome ASC");
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} catch (PDOException $e) {
    echo json_encode([]);
}
exit;
