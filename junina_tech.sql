-- 1. Criação do Banco de Dados (caso ainda não exista no servidor)
CREATE DATABASE IF NOT EXISTS junina_tech
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE junina_tech;

-- 2. Criação da Tabela de Candidatos (Mister e Miss)
CREATE TABLE IF NOT EXISTS candidatos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE, -- Evita que o mesmo e-mail se inscreva duas vezes
    curso VARCHAR(100) NOT NULL,
    categoria ENUM('Mister', 'Miss') NOT NULL, -- Define estritamente o gênero/categoria
    foto_caminho VARCHAR(255) NOT NULL, -- Armazena a rota local do arquivo .jpg no servidor do IFSP
    votos INT DEFAULT 0, -- Centraliza a contagem para alimentar o painel de líderes
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 3. Inserção de Dados Fictícios para Testar o seu Painel de Líderes (Opcional)
-- Isso vai te ajudar a ver o contêiner do topo funcionando antes das inscrições reais começarem.

INSERT INTO candidatos (nome, email, curso, categoria, foto_caminho, votos) VALUES
('João Silva', 'joao.informatica@ifsp.edu.br', 'Técnico em Informática', 'Mister', 'uploads/candidatos/mister1.jpg', 28),
('Mateus Santos', 'mateus.mecanica@ifsp.edu.br', 'Técnico em Mecânica', 'Mister', 'uploads/candidatos/mister2.jpg', 14),
('Maria Oliveira', 'maria.cozinha@ifsp.edu.br', 'Cozinha Proeja', 'Miss', 'uploads/candidatos/miss1.jpg', 42),
('Ana Costa', 'ana.evento@ifsp.edu.br', 'Hospedagem', 'Miss', 'uploads/candidatos/miss2.jpg', 19);