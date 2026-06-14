<?php
session_start();

$host   = "sql312.infinityfree.com";
$dbname = "if0_41799046_aula_junina_proeja2026";
$user   = "if0_41799046";
$pass   = "Agenor2310";

try {
    $pdo = new PDO(
        "mysql:host=$host;dbname=$dbname;charset=utf8mb4",
        $user, $pass,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );
} catch (PDOException $e) {
    die("<script>alert('❌ Falha na conexão com o banco.'); history.back();</script>");
}

// Validação dos campos
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

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    die("<script>alert('⚠️ E-mail inválido.'); history.back();</script>");
}

if (!in_array($categoria, ['Mister', 'Miss'])) {
    die("<script>alert('⚠️ Categoria inválida.'); history.back();</script>");
}

// Verifica se email já cadastrado
$check = $pdo->prepare("SELECT id FROM candidatos WHERE email = ?");
$check->execute([$email]);
if ($check->fetch()) {
    die("<script>alert('⚠️ Este e-mail já está cadastrado!'); history.back();</script>");
}

// Upload da foto
if (!isset($_FILES['foto']) || $_FILES['foto']['error'] !== UPLOAD_ERR_OK) {
    die("<script>alert('❌ Erro no envio da foto.'); history.back();</script>");
}

$tiposPermitidos = ['image/jpeg', 'image/png', 'image/webp'];
$finfo    = finfo_open(FILEINFO_MIME_TYPE);
$mimeType = finfo_file($finfo, $_FILES['foto']['tmp_name']);
finfo_close($finfo);

if (!in_array($mimeType, $tiposPermitidos)) {
    die("<script>alert('❌ Formato inválido. Use JPG, PNG ou WEBP.'); history.back();</script>");
}

$pastaDestino = __DIR__ . '/uploads/candidatos/';
if (!is_dir($pastaDestino)) mkdir($pastaDestino, 0755, true);

$nomeArquivo     = uniqid('candidato_', true) . '.jpg';
$caminhoFinal    = $pastaDestino . $nomeArquivo;
$caminhoRelativo = 'uploads/candidatos/' . $nomeArquivo;

if (!move_uploaded_file($_FILES['foto']['tmp_name'], $caminhoFinal)) {
    die("<script>alert('❌ Falha ao salvar a foto.'); history.back();</script>");
}

// Insere no banco
try {
    $stmt = $pdo->prepare("
        INSERT INTO candidatos (nome, email, curso, categoria, foto_caminho, votos, ja_votou)
        VALUES (:nome, :email, :curso, :categoria, :foto, 0, 0)
    ");
    $stmt->execute([
        ':nome'      => $nome,
        ':email'     => $email,
        ':curso'     => $curso,
        ':categoria' => $categoria,
        ':foto'      => $caminhoRelativo
    ]);

    $id = $pdo->lastInsertId();

    // Salva sessão — libera voto e quiz
    $_SESSION['aluno_id']    = $id;
    $_SESSION['aluno_nome']  = $nome;
    $_SESSION['aluno_email'] = $email;
    $_SESSION['pode_votar']  = true;
    $_SESSION['pode_quiz']   = true;

    header('Location: sucesso.html');
    exit;

} catch (PDOException $e) {
    if (file_exists($caminhoFinal)) unlink($caminhoFinal);
    die("<script>alert('❌ Erro ao salvar. Tente novamente.'); history.back();</script>");
}
?>


