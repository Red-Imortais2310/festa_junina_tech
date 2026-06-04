<?php
session_start();
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");

$host   = "sql312.infinityfree.com";
$dbname = "if0_41799046_aula_junina_proeja2026";
$user   = "if0_41799046";
$pass   = "Agenor2310";

// ── GET: listar candidatos ───────────────────────────────────
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['action']) && $_GET['action'] === 'listar') {
    try {
        $pdo  = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $user, $pass);
        $stmt = $pdo->query("SELECT id, nome, curso, categoria, foto_caminho, votos FROM candidatos ORDER BY nome ASC");
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    } catch (PDOException $e) {
        echo json_encode(["erro" => "Falha ao buscar candidatos."]);
    }
    exit;
}

// ── POST: registrar voto ─────────────────────────────────────
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Verifica sessão ativa (cadastro feito)
    if (empty($_SESSION['aluno_id']) || empty($_SESSION['pode_votar'])) {
        echo json_encode(["sucesso" => false, "erro" => "Você precisa se cadastrar antes de votar."]);
        exit;
    }

    // Verifica se já votou
    if ($_SESSION['ja_votou'] ?? false) {
        echo json_encode(["sucesso" => false, "erro" => "Você já votou! Apenas 1 voto por pessoa."]);
        exit;
    }

    $candidato_id = isset($_POST['id']) ? intval($_POST['id']) : 0;
    $aluno_id     = $_SESSION['aluno_id'];

    if ($candidato_id <= 0) {
        echo json_encode(["sucesso" => false, "erro" => "Candidato inválido."]);
        exit;
    }

    // Não pode votar em si mesmo
    if ($candidato_id === $aluno_id) {
        echo json_encode(["sucesso" => false, "erro" => "Você não pode votar em si mesmo."]);
        exit;
    }

    try {
        $pdo = new PDO(
            "mysql:host=$host;dbname=$dbname;charset=utf8mb4",
            $user, $pass,
            [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
        );

        // Verifica no banco se já votou (segurança dupla)
        $check = $pdo->prepare("SELECT ja_votou FROM candidatos WHERE id = ?");
        $check->execute([$aluno_id]);
        $aluno = $check->fetch(PDO::FETCH_ASSOC);

        if (!$aluno || $aluno['ja_votou']) {
            echo json_encode(["sucesso" => false, "erro" => "Voto já computado anteriormente."]);
            exit;
        }

        // Registra o voto no candidato
        $pdo->prepare("UPDATE candidatos SET votos = votos + 1 WHERE id = ?")->execute([$candidato_id]);

        // Marca quem votou
        $pdo->prepare("UPDATE candidatos SET ja_votou = 1 WHERE id = ?")->execute([$aluno_id]);

        // Atualiza sessão
        $_SESSION['ja_votou']   = true;
        $_SESSION['pode_votar'] = false;

        echo json_encode(["sucesso" => true, "msg" => "Voto registrado com sucesso! ✅"]);

    } catch (PDOException $e) {
        echo json_encode(["sucesso" => false, "erro" => "Erro no banco de dados."]);
    }
    exit;
}
?>
