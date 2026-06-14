<?php
require_once 'config.php';

echo "<h2>Teste de Conexão</h2>";

// Teste PDO
try {
    $pdo = getConnection();
    echo "✅ PDO conectou com sucesso!<br>";
} catch (Exception $e) {
    echo "❌ PDO falhou: " . $e->getMessage() . "<br>";
}

// Teste MySQLi
try {
    $mysqli = getConnectionMySQLi();
    echo "✅ MySQLi conectou com sucesso!<br>";
    echo "Banco atual: " . $mysqli->query("SELECT DATABASE()")->fetch_row()[0];
} catch (Exception $e) {
    echo "❌ MySQLi falhou: " . $e->getMessage() . "<br>";
}
?>
