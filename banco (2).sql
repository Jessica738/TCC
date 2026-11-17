-- ATUALIZAÇÃO 16/11 — BANCO DIDÁTICO VOZATIVA
-- Executar os comandos em uma conexão MySQL. NÃO está conectado automaticamente ao site.
-- Este exercício usa APENAS usuários fictícios. Nunca salve denúncias ou relatos reais.

CREATE DATABASE IF NOT EXISTS vozativa
CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE vozativa;

CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    senha_hash VARCHAR(255) NULL,
    data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Os cinco registros são iguais aos do JSON, sem senha armazenada no SQL.
INSERT INTO usuarios (id, nome, email) VALUES
(1, 'Ana Exemplo', 'ana@vozativa.example'),
(2, 'Beatriz Exemplo', 'beatriz@vozativa.example'),
(3, 'Carla Exemplo', 'carla@vozativa.example'),
(4, 'Daniela Exemplo', 'daniela@vozativa.example'),
(5, 'Fernanda Exemplo', 'fernanda@vozativa.example')
ON DUPLICATE KEY UPDATE nome=VALUES(nome);

SELECT id, nome, email FROM usuarios;
