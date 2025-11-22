-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 22/11/2025 às 04:44
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `app_cadastro`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `assistidos`
--

CREATE TABLE `assistidos` (
  `id` int(11) NOT NULL,
  `id_responsavel` int(11) NOT NULL,
  `nome_completo` varchar(255) NOT NULL,
  `data_nascimento` date NOT NULL,
  `genero` varchar(50) DEFAULT NULL,
  `grau_parentesco` varchar(50) NOT NULL,
  `informacoes_adicionais` text DEFAULT NULL,
  `data_cadastro` timestamp NOT NULL DEFAULT current_timestamp(),
  `data_atualizacao` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `caracteristicas_ficha`
--

CREATE TABLE `caracteristicas_ficha` (
  `id` int(11) NOT NULL,
  `texto_caracteristica` varchar(255) NOT NULL,
  `tipo_resposta` enum('SimNao','Numero','TextoCurto') NOT NULL DEFAULT 'SimNao',
  `ordem` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `caracteristicas_ficha`
--

INSERT INTO `caracteristicas_ficha` (`id`, `texto_caracteristica`, `tipo_resposta`, `ordem`) VALUES
(1, 'Nível de Suporte', 'Numero', 1),
(2, 'Usa os verbos corretamente', 'SimNao', 2),
(3, 'Apresenta comportamento repetitivo', 'SimNao', 3),
(4, 'Possui sensibilidade ao som', 'SimNao', 4),
(5, 'Possui sensibilidade ao toque físico', 'SimNao', 5),
(6, 'Faz contato visual', 'SimNao', 6),
(7, 'Consegue expressar ideias', 'SimNao', 7),
(8, 'Apresenta dificuldade na fala', 'SimNao', 8),
(9, 'Demonstra interesses restritos em objetos', 'SimNao', 9);

-- --------------------------------------------------------

--
-- Estrutura para tabela `perguntas`
--

CREATE TABLE `perguntas` (
  `id` int(11) NOT NULL,
  `texto_pergunta` varchar(255) NOT NULL,
  `data_criacao` timestamp NOT NULL DEFAULT current_timestamp(),
  `tipo_pontuacao` enum('direta','invertida') NOT NULL DEFAULT 'direta'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `perguntas`
--

INSERT INTO `perguntas` (`id`, `texto_pergunta`, `data_criacao`, `tipo_pontuacao`) VALUES
(1, 'Usou os verbos corretamente?', '2025-11-14 19:12:40', 'direta'),
(2, 'Comportamento repetitivo?', '2025-11-14 19:12:40', 'invertida'),
(3, 'Sensibilidade ao som?', '2025-11-14 19:12:40', 'invertida'),
(4, 'Sensibilidade ao toque físico?', '2025-11-14 19:12:40', 'invertida'),
(5, 'Fez contato visual?', '2025-11-14 19:12:40', 'direta'),
(6, 'Expressou ideias?', '2025-11-14 19:12:40', 'direta'),
(7, 'Dificuldade na fala?', '2025-11-14 19:12:40', 'invertida'),
(8, 'Interesses em objetos?', '2025-11-14 19:12:40', 'direta');

-- --------------------------------------------------------

--
-- Estrutura para tabela `respostas`
--

CREATE TABLE `respostas` (
  `id` int(11) NOT NULL,
  `id_submissao` int(11) NOT NULL,
  `id_pergunta` int(11) NOT NULL,
  `resposta` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `respostas_ficha`
--

CREATE TABLE `respostas_ficha` (
  `id` int(11) NOT NULL,
  `id_assistido` int(11) NOT NULL,
  `id_caracteristica` int(11) NOT NULL,
  `valor_resposta` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `submissoes`
--

CREATE TABLE `submissoes` (
  `id` int(11) NOT NULL,
  `id_assistido` int(11) NOT NULL,
  `id_responsavel` int(11) NOT NULL,
  `data_submissao` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nome` varchar(50) DEFAULT NULL,
  `email` varchar(40) DEFAULT NULL,
  `senha` varchar(255) NOT NULL,
  `tipo` varchar(50) DEFAULT NULL,
  `area` varchar(50) DEFAULT NULL,
  `instituto` varchar(100) DEFAULT NULL,
  `criado_em` timestamp NOT NULL DEFAULT current_timestamp(),
  `email_verificado` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `verificacao_email`
--

CREATE TABLE `verificacao_email` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `token` varchar(255) NOT NULL,
  `expira_em` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `criado_em` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `assistidos`
--
ALTER TABLE `assistidos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_responsavel` (`id_responsavel`);

--
-- Índices de tabela `caracteristicas_ficha`
--
ALTER TABLE `caracteristicas_ficha`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `perguntas`
--
ALTER TABLE `perguntas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `texto_pergunta` (`texto_pergunta`);

--
-- Índices de tabela `respostas`
--
ALTER TABLE `respostas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_submissao` (`id_submissao`),
  ADD KEY `id_pergunta` (`id_pergunta`);

--
-- Índices de tabela `respostas_ficha`
--
ALTER TABLE `respostas_ficha`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `assistido_caracteristica_unique` (`id_assistido`,`id_caracteristica`),
  ADD KEY `id_caracteristica` (`id_caracteristica`);

--
-- Índices de tabela `submissoes`
--
ALTER TABLE `submissoes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_assistido` (`id_assistido`),
  ADD KEY `id_responsavel` (`id_responsavel`);

--
-- Índices de tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Índices de tabela `verificacao_email`
--
ALTER TABLE `verificacao_email`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `token` (`token`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `assistidos`
--
ALTER TABLE `assistidos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de tabela `caracteristicas_ficha`
--
ALTER TABLE `caracteristicas_ficha`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de tabela `perguntas`
--
ALTER TABLE `perguntas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de tabela `respostas`
--
ALTER TABLE `respostas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=129;

--
-- AUTO_INCREMENT de tabela `respostas_ficha`
--
ALTER TABLE `respostas_ficha`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- AUTO_INCREMENT de tabela `submissoes`
--
ALTER TABLE `submissoes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `verificacao_email`
--
ALTER TABLE `verificacao_email`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `assistidos`
--
ALTER TABLE `assistidos`
  ADD CONSTRAINT `assistidos_ibfk_1` FOREIGN KEY (`id_responsavel`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE;

--
-- Restrições para tabelas `respostas`
--
ALTER TABLE `respostas`
  ADD CONSTRAINT `respostas_ibfk_1` FOREIGN KEY (`id_submissao`) REFERENCES `submissoes` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `respostas_ibfk_2` FOREIGN KEY (`id_pergunta`) REFERENCES `perguntas` (`id`) ON DELETE CASCADE;

--
-- Restrições para tabelas `respostas_ficha`
--
ALTER TABLE `respostas_ficha`
  ADD CONSTRAINT `respostas_ficha_ibfk_1` FOREIGN KEY (`id_assistido`) REFERENCES `assistidos` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `respostas_ficha_ibfk_2` FOREIGN KEY (`id_caracteristica`) REFERENCES `caracteristicas_ficha` (`id`) ON DELETE CASCADE;

--
-- Restrições para tabelas `submissoes`
--
ALTER TABLE `submissoes`
  ADD CONSTRAINT `submissoes_ibfk_1` FOREIGN KEY (`id_assistido`) REFERENCES `assistidos` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `submissoes_ibfk_2` FOREIGN KEY (`id_responsavel`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE;

--
-- Restrições para tabelas `verificacao_email`
--
ALTER TABLE `verificacao_email`
  ADD CONSTRAINT `verificacao_email_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
