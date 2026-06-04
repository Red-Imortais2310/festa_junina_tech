<?php
// Configuração do Cabeçalho para API
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");

// Credenciais do Banco
$host     = "sql312.infinityfree.com"; 
$dbname   = "if0_41799046_aula_junina_proeja2026";
$username = "if0_41799046"; 
$password = "Agenor2310"; 

// 1. PROCESSAMENTO DE VOTO (POST)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = isset($_POST['id']) ? intval($_POST['id']) : 0;
    
    if ($id > 0) {
        try {
            $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            
            $stmt = $pdo->prepare("UPDATE candidatos SET votos = votos + 1 WHERE id = ?");
            $stmt->execute([$id]);
            
            echo json_encode(["sucesso" => true]);
        } catch (PDOException $e) {
            echo json_encode(["sucesso" => false, "erro" => "Erro na base de dados: " . $e->getMessage()]);
        }
    } else {
        echo json_encode(["sucesso" => false, "erro" => "ID do candidato inválido."]);
    }
    exit;
}

// 2. RETORNO DOS DADOS DOS CANDIDATOS (GET)
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['action']) && $_GET['action'] === 'listar') {
    try {
        $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
        $stmt = $pdo->query("SELECT id, nome, curso, categoria, foto_caminho, votos FROM candidatos ORDER BY nome ASC");
        $candidatos = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($candidatos);
    } catch (PDOException $e) {
        echo json_encode(["erro" => "Falha ao buscar candidatos: " . $e->getMessage()]);
    }
    exit;
}
?>