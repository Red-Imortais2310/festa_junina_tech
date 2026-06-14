<?php
// ============================================================
//  CONFIGURAÇÃO DO BANCO DE DADOS
// ============================================================

// ── Local (WAMP) ─────────────────────────────────────────────
define('DB_HOST', 'localhost');
define('DB_NAME', 'aula junina'); // ✅ COM ESPAÇO!
define('DB_USER', 'root');
define('DB_PASS', '');

// ── InfinityFree (deploy) ────────────────────────────────────
// define('DB_HOST', 'sql312.infinityfree.com');
// define('DB_NAME', 'if0_41799046_aula_junina_proeja2026');
// define('DB_USER', 'if0_41799046');
// define('DB_PASS', '***');

// ✅ CONEXÃO PDO (moderna, segura)
function getConnection(): PDO {
    static $pdo = null;

    if ($pdo === null) {
        try {
            // ✅ dbname com espaço funciona quando entre aspas
            $pdo = new PDO(
                "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4",
                DB_USER,
                DB_PASS,
                [
                    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES   => false,
                ]
            );
        } catch (PDOException $e) {
            http_response_code(500);
            die(json_encode([
                'sucesso'  => false,
                'mensagem' => 'Erro na conexão com o banco (PDO).',
                'erro' => $e->getMessage() // ← debug ativo
            ]));
        }
    }

    return $pdo;
}

// ✅ CONEXÃO MySQLi (para compatibilidade com código antigo)
function getConnectionMySQLi(): mysqli {
    // ✅ MySQLi também aceita nome com espaço diretamente
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    
    if ($conn->connect_error) {
        http_response_code(500);
        die(json_encode([
            'sucesso' => false,
            'erro' => 'Erro ao conectar ao banco de dados (MySQLi): ' . $conn->connect_error
        ]));
    }
    
    $conn->set_charset("utf8mb4");
    return $conn;
}
?>
