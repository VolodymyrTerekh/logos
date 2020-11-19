-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Ноя 19 2020 г., 17:42
-- Версия сервера: 8.0.19
-- Версия PHP: 7.4.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `users`
--
CREATE DATABASE IF NOT EXISTS `users` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `users`;

-- --------------------------------------------------------

--
-- Структура таблицы `entitlements`
--

DROP TABLE IF EXISTS `entitlements`;
CREATE TABLE `entitlements` (
  `id` int NOT NULL,
  `can_view_users` tinyint(1) NOT NULL DEFAULT '0',
  `can_edit_users` tinyint(1) NOT NULL DEFAULT '0',
  `can_delete_users` tinyint(1) NOT NULL DEFAULT '0',
  `can_view_details` tinyint(1) NOT NULL DEFAULT '0',
  `can_view_details_full` tinyint(1) NOT NULL DEFAULT '0',
  `can_edit_users_full` tinyint(1) NOT NULL DEFAULT '0',
  `user_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `entitlements`
--

INSERT INTO `entitlements` (`id`, `can_view_users`, `can_edit_users`, `can_delete_users`, `can_view_details`, `can_view_details_full`, `can_edit_users_full`, `user_id`) VALUES
(1, 1, 1, 1, 1, 1, 1, 1),
(2, 1, 1, 0, 1, 0, 0, 2),
(3, 1, 1, 1, 1, 1, 1, 6);

-- --------------------------------------------------------

--
-- Структура таблицы `refreshtoken`
--

DROP TABLE IF EXISTS `refreshtoken`;
CREATE TABLE `refreshtoken` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `refreshToken` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `refreshtoken`
--

INSERT INTO `refreshtoken` (`id`, `user_id`, `refreshToken`) VALUES
(2, 1, 'b2d22971-0343-4d19-990a-b1d09e6f550d'),
(3, 1, 'f6d90227-684b-4865-8a32-91c840a52787'),
(4, 1, 'ab155007-7d74-4df7-b7f1-5edaf7349b7e'),
(5, 1, '16fca0db-1fe7-4cec-83f6-8546e58af545'),
(6, 1, 'bd8efe1a-4c7a-4fcb-b67f-229fd7151be7'),
(7, 1, 'ad4f1bee-a974-46fe-8cba-41e25f1abe57');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int NOT NULL,
  `name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `login` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` date NOT NULL,
  `update_at` date NOT NULL,
  `admin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `name`, `login`, `email`, `password`, `created_at`, `update_at`, `admin`) VALUES
(1, 'Anton', 'anton', 'anton@gmail.com', '123456qwerty', '2020-01-02', '2020-03-15', 1),
(2, 'Mariana', 'mariana', 'mariana@gmail.com', 'qwerty123456', '2020-02-22', '2020-04-23', 0),
(3, 'Volodymyr', 'volodymyr', 'volodymyr@gmail.com', '1234567890', '2020-01-02', '2020-01-02', 1),
(4, 'Iryna', 'iryna', 'iryna@gmail.com', '0987654321', '2020-01-02', '2020-01-02', 0),
(5, 'Test', 'test', 'test@gmail.com', 'test', '2020-06-06', '2020-06-09', 1),
(6, 'Volodymyr', 'volodymyr', 'volodymyr@gmail.com', '123456', '2020-10-05', '2020-10-05', 0);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `entitlements`
--
ALTER TABLE `entitlements`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Индексы таблицы `refreshtoken`
--
ALTER TABLE `refreshtoken`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `entitlements`
--
ALTER TABLE `entitlements`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `refreshtoken`
--
ALTER TABLE `refreshtoken`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `entitlements`
--
ALTER TABLE `entitlements`
  ADD CONSTRAINT `entitlements_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Ограничения внешнего ключа таблицы `refreshtoken`
--
ALTER TABLE `refreshtoken`
  ADD CONSTRAINT `refreshtoken_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
