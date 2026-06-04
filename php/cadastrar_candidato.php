<?php
// cadastrar_candidato.php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Credenciais exatas do seu painel InfinityFree
$host     = "sql312.infinityfree.com"; 
$dbname   = "if0_41799046_aula_junina_proeja2026";
$username = "if0_41799046"; 
$password = "Agenor2310"; 

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(["status" => "erro", "mensagem" => "Erro na conexão: " . $e->getMessage()]);
    exit;
}

// Pega o corpo da requisição enviada pelo Google Forms
$data = json_decode(file_get_contents("php://input"), true);

$nome         = isset($data['nome']) ? trim($data['nome']) : '';
$email        = isset($data['email']) ? trim($data['email']) : '';
$curso        = isset($data['curso']) ? trim($data['curso']) : '';
$categoria    = isset($data['categoria']) ? trim($data['categoria']) : ''; // 'Mister' ou 'Miss'
$foto_caminho = isset($data['foto_caminho']) ? trim($data['foto_caminho']) : '';

if (!empty($nome) && !empty($email) && !empty($categoria) && !empty($foto_caminho)) {
    try {
        $stmt = $pdo->prepare("INSERT INTO candidatos (nome, email, curso, categoria, foto_caminho) VALUES (?, ?, ?, ?, ?)");
        $stmt->execute([$nome, $email, $curso, $categoria, $foto_caminho]);
        echo json_encode(["status" => "sucesso", "mensagem" => "Candidato registrado com sucesso!"]);
    } catch (Exception $e) {
        echo json_encode(["status" => "erro", "mensagem" => "Email já cadastrado ou falha no banco."]);
    }
} else {
    echo json_encode(["status" => "erro", "mensagem" => "Campos obrigatórios vazios."]);
}
exit;