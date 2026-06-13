<?php
header('Content-Type: application/json');
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['erro' => 'Método inválido']);
    exit;
}

$nome_social = trim($_POST['nome_social'] ?? '');
$matricula   = trim($_POST['matricula']   ?? '');
$categoria   = trim($_POST['categoria']   ?? '');
$fotoBase64  = $_POST['foto']             ?? '';

// Validações
if (empty($nome_social) || empty($matricula) || empty($categoria)) {
    echo json_encode(['erro' => 'Todos os campos são obrigatórios']);
    exit;
}

if (strlen($nome_social) > 30) {
    echo json_encode(['erro' => 'Nome social muito longo (máx. 30 caracteres)']);
    exit;
}

if (strlen($matricula) > 11) {
    echo json_encode(['erro' => 'Matrícula muito longa (máx. 11 caracteres)']);
    exit;
}

if (!in_array($categoria, ['Mister', 'Miss'])) {
    echo json_encode(['erro' => 'Categoria inválida']);
    exit;
}

if (empty($fotoBase64)) {
    echo json_encode(['erro' => 'Foto não enviada']);
    exit;
}

// Salvar foto Base64 como arquivo JPG
$pasta = __DIR__ . '/../uploads/';
if (!is_dir($pasta)) mkdir($pasta, 0755, true);

$nomeArquivo   = 'foto_' . uniqid() . '.jpg';
$caminhoFisico = $pasta . $nomeArquivo;

$imagemDados = preg_replace('/^data:image\/\w+;base64,/', '', $fotoBase64);
$imagemDados = base64_decode($imagemDados);

if (!$imagemDados || !file_put_contents($caminhoFisico, $imagemDados)) {
    echo json_encode(['erro' => 'Erro ao salvar a foto']);
    exit;
}

$caminhoFoto = 'uploads/' . $nomeArquivo;

try {
    $pdo  = getConnection();

    // Verifica se matrícula já está cadastrada
    $check = $pdo->prepare("SELECT id FROM candidatos WHERE matricula = ?");
    $check->execute([$matricula]);
    if ($check->fetch()) {
        echo json_encode(['erro' => 'Matrícula já cadastrada no concurso']);
        exit;
    }

    $stmt = $pdo->prepare("
        INSERT INTO candidatos (nome_social, matricula, categoria, foto, votos)
        VALUES (?, ?, ?, ?, 0)
    ");
    $stmt->execute([$nome_social, $matricula, $categoria, $caminhoFoto]);

    echo json_encode(['sucesso' => true]);

} catch (PDOException $e) {
    echo json_encode(['erro' => 'Erro no banco: ' . $e->getMessage()]);
}
?>
