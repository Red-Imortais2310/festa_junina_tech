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

    // ✅ Verifica se query() retornou resultado válido
    $stmt = $pdo->query($sql);
    if ($stmt === false) {
        throw new Exception('Falha ao executar consulta.');
    }

    // ✅ fetchAll com fallback seguro — nunca retorna false
    $candidatos = $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];

    foreach ($candidatos as &$candidato) {
        $foto = $candidato['foto'] ?? '';
        if (!empty($foto) && !str_starts_with($foto, 'uploads/')) {
            $candidato['foto'] = 'uploads/' . $foto;
        }
        // Se vazio, mantém vazio — o JS trata com getFotoSrc()
    }
    unset($candidato); // ✅ Libera referência após foreach &

    echo json_encode([
        'sucesso'    => true,
        'candidatos' => $candidatos
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'sucesso'  => false,
        'mensagem' => 'Erro ao buscar candidatos.',
        // 'debug' => $e->getMessage() // ← descomente só em dev
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'sucesso'  => false,
        'mensagem' => 'Erro inesperado.',
        // 'debug' => $e->getMessage() // ← descomente só em dev
    ]);
}
