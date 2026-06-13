<?php
// ============================================================
//  CONFIGURAÇÃO DO BANCO DE DADOS
// ============================================================

// ── Local (WAMP) ─────────────────────────────────────────────
define('DB_HOST', 'localhost');
define('DB_NAME', 'aula junina');
define('DB_USER', 'root');
define('DB_PASS', '');

// ── InfinityFree (deploy) ────────────────────────────────────
// define('DB_HOST', 'sql312.infinityfree.com');
// define('DB_NAME', 'if0_41799046_aula_junina_proeja2026');
// define('DB_USER', 'if0_41799046');
// define('DB_PASS', '***'); // ✅ Nunca deixe senha real em comentário

function getConnection(): PDO {
    static $pdo = null;

    if ($pdo === null) {
        try {
            $pdo = new PDO(
                "mysql:host=" . DB_HOST . ";charset=utf8mb4",
                DB_USER,
                DB_PASS,
                [
                    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES   => false,
                ]
            );

            // ✅ Seleciona o banco manualmente (suporta nomes com espaço)
            $pdo->exec("USE `" . DB_NAME . "`");

        } catch (PDOException $e) {
            http_response_code(500);
            die(json_encode([
                'sucesso'  => false,
                'mensagem' => 'Erro na conexão com o banco.',
                // 'debug' => $e->getMessage() // ← ative só em dev
            ]));
        }
    }

    return $pdo;
}
?>
