<?php
// php/listar_candidatos.php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

require_once 'config.php';

try {
    $pdo = getConnection();

    $sql = "SELECT id, nome_social, matricula, categoria, foto, votos 
            FROM candidatos 
            ORDER BY categoria, nome_social";

    $stmt = $pdo->query($sql);
    if ($stmt === false) {
        throw new Exception('Falha ao executar consulta.');
    }

    $candidatos = $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];

    foreach ($candidatos as &$candidato) {
        $foto = trim($candidato['foto'] ?? '');

        if (!empty($foto)) {
            // Remove "uploads/" se estiver duplicado
            $foto = preg_replace('/^uploads\//i', '', $foto);
            // Garante que sempre comece com uploads/
            $candidato['foto'] = 'uploads/' . $foto;
        }
    }
    unset($candidato);

    echo json_encode([
        'sucesso'    => true,
        'candidatos' => $candidatos
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'sucesso'  => false,
        'mensagem' => 'Erro ao buscar candidatos.',
        'debug' => $e->getMessage()   // ← temporário para debug
    ]);
}
?>