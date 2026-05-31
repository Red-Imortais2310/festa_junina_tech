<?php
// votar.php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *"); // Permite requisições de outras origens se necessário
header("Access-Control-Allow-Methods: POST, GET");

// 1. CONFIGURAÇÃO DA CONEXÃO COM O BANCO DE DADOS (Ajuste com os dados da sua hospedagem)
$host     = "localhost";
$dbname   = "junina_tech";
$username = "root"; // Mude para o usuário da sua hospedagem (ex: InfinityFree)
$password = "";     // Mude para a senha do banco da sua hospedagem

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(["status" => "erro", "mensagem" => "Falha na conexão com o banco: " . $e->getMessage()]);
    exit;
}

// 2. LÓGICA PARA ATUALIZAR O PAINEL DE LÍDERES (Requisição GET)
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        // Busca o Mister mais votado
        $stmtMister = $pdo->query("SELECT id, nome, votos FROM candidatos WHERE categoria = 'Mister' ORDER BY votos DESC LIMIT 1");
        $topMister = $stmtMister->fetch(PDO::FETCH_ASSOC);

        // Busca a Miss mais votada
        $stmtMiss = $pdo->query("SELECT id, nome, votos FROM candidatos WHERE categoria = 'Miss' ORDER BY votos DESC LIMIT 1");
        $topMiss = $stmtMiss->fetch(PDO::FETCH_ASSOC);

        echo json_encode([
            "status" => "sucesso",
            "topMister" => $topMister ? $topMister : ["nome" => "Nenhum cadastrado", "votos" => 0],
            "topMiss" => $topMiss ? $topMiss : ["nome" => "Nenhuma cadastrada", "votos" => 0]
        ]);
    } catch (Exception $e) {
        echo json_encode(["status" => "erro", "mensagem" => $e->getMessage()]);
    }
    exit;
}

// 3. LÓGICA PARA COMPUTAR O VOTO NO BANCO DE DADOS (Requisição POST)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Recebe o ID enviado pelo JavaScript
    $data = json_decode(file_get_contents("php://input"), true);
    $candidatoId = isset($data['id']) ? intval($data['id']) : 0;

    if ($candidatoId > 0) {
        try {
            // Executa o comando SQL para incrementar o voto
            $stmt = $pdo->prepare("UPDATE candidatos SET votos = votos + 1 WHERE id = ?");
            $stmt->execute([$candidatoId]);

            echo json_encode(["status" => "sucesso", "mensagem" => "Voto computado no MySQL com sucesso!"]);
        } catch (Exception $e) {
            echo json_encode(["status" => "erro", "mensagem" => "Erro ao gravar voto: " . $e->getMessage()]);
        }
    } else {
        echo json_encode(["status" => "erro", "mensagem" => "ID de candidato inválido."]);
    }
    exit;
}