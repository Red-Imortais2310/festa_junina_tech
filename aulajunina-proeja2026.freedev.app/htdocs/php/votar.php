<?php
header('Content-Type: application/json; charset=utf-8');

require_once 'config.php';

$debug_file = __DIR__ . '/debug_voto.txt';

function debug_log($msg) {
    global $debug_file;
    $log = date('Y-m-d H:i:s') . " | " . $msg . "\n";
    file_put_contents($debug_file, $log, FILE_APPEND);
}

try {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception('Método inválido');
    }

    $id        = intval($_POST['id'] ?? 0);
    $matricula = trim($_POST['matricula_votante'] ?? '');
    $categoria = trim($_POST['categoria_voto'] ?? '');

    debug_log("Voto recebido - ID: $id | Matrícula: $matricula | Categoria: $categoria");

    if (!$id || empty($matricula) || empty($categoria)) {
        throw new Exception('Dados incompletos');
    }

    $pdo = getConnection();

    // Buscar candidato
    $stmt = $pdo->prepare("SELECT id, nome_social, categoria FROM candidatos WHERE id = ?");
    $stmt->execute([$id]);
    $candidato = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$candidato) throw new Exception('Candidato não encontrado');

    if (strtolower($candidato['categoria']) !== strtolower($categoria)) {
        throw new Exception('Categoria incompatível');
    }

    // Verificar voto duplicado
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM votos WHERE matricula_votante = ? AND categoria_voto = ?");
    $stmt->execute([$matricula, $categoria]);
    if ($stmt->fetchColumn() > 0) {
        throw new Exception('Você já votou nesta categoria');
    }

    // Registrar voto
    $pdo->beginTransaction();

    $pdo->prepare("INSERT INTO votos (candidato_id, matricula_votante, categoria_voto) VALUES (?, ?, ?)")
         ->execute([$id, $matricula, $categoria]);

    $pdo->prepare("UPDATE candidatos SET votos = votos + 1 WHERE id = ?")
         ->execute([$id]);

    $pdo->commit();

    $stmt = $pdo->prepare("SELECT votos FROM candidatos WHERE id = ?");
    $stmt->execute([$id]);
    $votos = $stmt->fetchColumn();

    debug_log("VOTO REGISTRADO COM SUCESSO! Total: $votos");

    echo json_encode([
        'sucesso' => true,
        'mensagem' => 'Voto registrado com sucesso!',
        'votos_totais' => $votos
    ]);

} catch (Exception $e) {
    if (isset($pdo) && $pdo->inTransaction()) $pdo->rollBack();
    debug_log("ERRO: " . $e->getMessage());
    
    http_response_code(400);
    echo json_encode([
        'sucesso' => false,
        'erro' => $e->getMessage()
    ]);
}
?>