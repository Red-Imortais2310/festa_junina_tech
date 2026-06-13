<?php
header('Content-Type: application/json');
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['sucesso' => false, 'mensagem' => 'Método inválido']);
    exit;
}

// ── Leitura via $_POST (FormData) ──────────────────────────
$id        = intval($_POST['id']              ?? 0);
$matricula = trim($_POST['matricula_votante'] ?? '');
$categoria = trim($_POST['categoria_voto']    ?? '');

// ── Categorias aceitas ──────────────────────────────────────
$categoriasValidas = ['Mister', 'Miss'];

// ✅ Limite de 100 chars — compatível com o formato gerado pelo JS
// Formato JS: "device_1718224326000_k3f9xz" = ~28 chars
if ($id <= 0 || empty($matricula) || strlen($matricula) > 100 || !in_array($categoria, $categoriasValidas)) {
    http_response_code(400);
    echo json_encode(['sucesso' => false, 'mensagem' => 'Dados inválidos.']);
    exit;
}

// ✅ $pdo declarado fora do try — acessível no catch
$pdo = null;

try {
    $pdo = getConnection();

    // ✅ Todas as verificações DENTRO da transação — evita race condition
    $pdo->beginTransaction();

    // 1. Verifica se o candidato existe e pertence à categoria correta
    $stmt = $pdo->prepare("
        SELECT id FROM candidatos 
        WHERE id = :id AND categoria = :categoria
    ");
    $stmt->execute([':id' => $id, ':categoria' => $categoria]);

    if (!$stmt->fetch()) {
        $pdo->rollBack();
        http_response_code(404);
        echo json_encode(['sucesso' => false, 'mensagem' => 'Candidato não encontrado.']);
        exit;
    }

    // 2. Verifica se a matrícula já votou nessa categoria
    $stmt = $pdo->prepare("
        SELECT id FROM votos 
        WHERE matricula_votante = :matricula AND categoria_voto = :categoria
    ");
    $stmt->execute([':matricula' => $matricula, ':categoria' => $categoria]);

    if ($stmt->fetch()) {
        $pdo->rollBack();
        http_response_code(409);
        echo json_encode(['sucesso' => false, 'mensagem' => 'Você já votou nesta categoria.']);
        exit;
    }

    // 3. Registra o voto na tabela votos
    $stmt = $pdo->prepare("
        INSERT INTO votos (candidato_id, matricula_votante, categoria_voto, criado_em)
        VALUES (:candidato_id, :matricula, :categoria, NOW())
    ");
    $stmt->execute([
        ':candidato_id' => $id,
        ':matricula'    => $matricula,
        ':categoria'    => $categoria,
    ]);

    // 4. ✅ Incrementa o contador de votos no candidato
    $stmt = $pdo->prepare("
        UPDATE candidatos 
        SET votos = votos + 1 
        WHERE id = :id
    ");
    $stmt->execute([':id' => $id]);

    // 5. Confirma a transação
    $pdo->commit();

    echo json_encode(['sucesso' => true, 'mensagem' => 'Voto registrado com sucesso!']);

} catch (PDOException $e) {
    // ✅ Seguro — $pdo pode ser null se getConnection() falhou
    if ($pdo !== null && $pdo->inTransaction()) {
        $pdo->rollBack();
    }
    http_response_code(500);
    echo json_encode([
        'sucesso'  => false,
        'mensagem' => 'Erro interno no servidor.',
        // 'debug' => $e->getMessage() // ← descomente só em dev
    ]);
}
