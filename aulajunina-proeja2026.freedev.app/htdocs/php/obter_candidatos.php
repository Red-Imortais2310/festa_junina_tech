<?php
error_reporting(E_ALL);
ini_set('display_errors', 0);

header('Content-Type: application/json; charset=utf-8');

require_once __DIR__ . '/config.php';

$conn = @new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

if ($conn->connect_error) {
    echo json_encode(["sucesso" => false, "mensagem" => "Falha na conexão: " . $conn->connect_error]);
    exit();
}

$conn->set_charset("utf8mb4");

$resultado = $conn->query(
    "SELECT id, nome, categoria, foto_caminho, votos FROM candidatos ORDER BY categoria, nome"
);

if (!$resultado) {
    echo json_encode(["sucesso" => false, "mensagem" => "Erro ao buscar candidatos."]);
    $conn->close();
    exit();
}

$candidatos = [];
while ($row = $resultado->fetch_assoc()) {
    $candidatos[] = $row;
}

$conn->close();
echo json_encode(["sucesso" => true, "candidatos" => $candidatos]);
exit();
?>
