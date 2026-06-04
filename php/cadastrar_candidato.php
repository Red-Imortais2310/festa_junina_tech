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
exit;<?php
// cadastrar.php

// ── Credenciais InfinityFree ─────────────────────────────────
$host    = "sql312.infinityfree.com";
$dbname  = "if0_41799046_aula_junina_proeja2026";
$user    = "if0_41799046";
$pass    = "Agenor2310";

// ── Conexão PDO ──────────────────────────────────────────────
try {
    $pdo = new PDO(
        "mysql:host=$host;dbname=$dbname;charset=utf8mb4",
        $user,
        $pass,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );
} catch (PDOException $e) {
    die("<script>alert('❌ Falha na conexão com o banco de dados.'); history.back();</script>");
}

// ── Validação dos campos de texto ────────────────────────────
$campos = ['nome', 'email', 'curso', 'categoria'];
foreach ($campos as $campo) {
    if (empty(trim($_POST[$campo] ?? ''))) {
        die("<script>alert('⚠️ Campo obrigatório faltando: $campo'); history.back();</script>");
    }
}

$nome      = trim($_POST['nome']);
$email     = trim($_POST['email']);
$curso     = trim($_POST['curso']);
$categoria = trim($_POST['categoria']);

if (!in_array($categoria, ['Mister', 'Miss'])) {
    die("<script>alert('⚠️ Categoria inválida.'); history.back();</script>");
}

// ── Validação e Upload da Foto ───────────────────────────────
if (!isset($_FILES['foto']) || $_FILES['foto']['error'] !== UPLOAD_ERR_OK) {
    die("<script>alert('❌ Erro no envio da foto. Tente novamente.'); history.back();</script>");
}

// Verifica o tipo real do arquivo (segurança)
$tiposPermitidos = ['image/jpeg', 'image/png', 'image/webp'];
$finfo    = finfo_open(FILEINFO_MIME_TYPE);
$mimeType = finfo_file($finfo, $_FILES['foto']['tmp_name']);
finfo_close($finfo);

if (!in_array($mimeType, $tiposPermitidos)) {
    die("<script>alert('❌ Formato de imagem inválido. Use JPG, PNG ou WEBP.'); history.back();</script>");
}

// Cria a pasta de uploads se não existir
$pastaDestino = __DIR__ . '/uploads/candidatos/';
if (!is_dir($pastaDestino)) {
    mkdir($pastaDestino, 0755, true);
}

// Gera nome único para o arquivo
$nomeArquivo  = uniqid('candidato_', true) . '.jpg';
$caminhoFinal = $pastaDestino . $nomeArquivo;
$caminhoRelativo = 'uploads/candidatos/' . $nomeArquivo; // salvo no banco

if (!move_uploaded_file($_FILES['foto']['tmp_name'], $caminhoFinal)) {
    die("<script>alert('❌ Falha ao salvar a foto no servidor.'); history.back();</script>");
}

// ── Inserção no Banco ────────────────────────────────────────
try {
    $stmt = $pdo->prepare("
        INSERT INTO candidatos (nome, email, curso, categoria, foto_caminho)
        VALUES (:nome, :email, :curso, :categoria, :foto)
    ");
    $stmt->execute([
        ':nome'      => $nome,
        ':email'     => $email,
        ':curso'     => $curso,
        ':categoria' => $categoria,
        ':foto'      => $caminhoRelativo
    ]);

    // ✅ Sucesso — redireciona para página de confirmação
    header('Location: sucesso.html');
    exit;

} catch (PDOException $e) {
    // Remove a foto salva para não deixar arquivo órfão
    if (file_exists($caminhoFinal)) unlink($caminhoFinal);

    // Erro de e-mail duplicado (UNIQUE no banco)
    if ($e->getCode() == 23000) {
        die("<script>alert('⚠️ Este e-mail já está inscrito no concurso!'); history.back();</script>");
    }

    die("<script>alert('❌ Erro ao salvar no banco. Tente novamente.'); history.back();</script>");
}
?>
