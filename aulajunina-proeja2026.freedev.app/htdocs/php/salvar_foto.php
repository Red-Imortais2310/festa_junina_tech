<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['erro' => 'Método inválido']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);
if (empty($data['foto'])) {
    echo json_encode(['erro' => 'Nenhuma foto recebida']);
    exit;
}

$fotoBase64 = $data['foto'];
if (strpos($fotoBase64, ',') !== false) {
    $fotoBase64 = explode(',', $fotoBase64)[1];
}
$fotoDecodificada = base64_decode($fotoBase64);
if (!$fotoDecodificada) {
    echo json_encode(['erro' => 'Erro ao decodificar a foto']);
    exit;
}

$pasta = __DIR__ . '/../uploads/';
if (!is_dir($pasta)) mkdir($pasta, 0755, true);

$nomeArquivo = $pasta . uniqid('foto_') . '.jpg';
if (file_put_contents($nomeArquivo, $fotoDecodificada)) {
    echo json_encode(['sucesso' => true, 'arquivo' => 'uploads/' . basename($nomeArquivo)]);
} else {
    echo json_encode(['erro' => 'Erro ao salvar a foto']);
}
?>
