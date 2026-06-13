<?php
header('Content-Type: application/json');
$bancoDeDados = 'candidatos.json';

if (file_exists($bancoDeDados)) {
    $candidatos = json_decode(file_get_contents($bancoDeDados), true);
    
    // Organiza por quem tem mais votos
    usort($candidatos, function($a, $b) {
        return $b['votos'] <=> $a['votos'];
    });
    echo json_encode($candidatos);
} else {
    echo json_encode([]);
}
?>
