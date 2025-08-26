-- TimeWise Seed Data
-- This script populates the database with initial data for development and testing.

-- Assume password for all users is 'password'. In a real app, use a strong hashing algorithm.
-- The hash below is a bcrypt hash for 'password'.
SET @password_hash = '$2a$12$9/2A.V..fN9C1B9C1b9c1uGf9D8e7F6e5D4C3B2A1s0d9f8E7g6H';

-- -----------------------------------------------------
-- Create Users
-- -----------------------------------------------------
INSERT INTO `users` (`email`, `display_name`, `password_hash`, `avatar_url`, `role`) VALUES
('admin@example.com', 'Mock Admin', @password_hash, 'https://placehold.co/40x40.png', 'Owner'),
('user@example.com', 'Mock User', @password_hash, 'https://placehold.co/40x40.png', 'Member'),
('alex.j@example.com', 'Alex Johnson', @password_hash, 'https://placehold.co/40x40.png', 'Admin'),
('maria.g@example.com', 'Maria Garcia', @password_hash, 'https://placehold.co/40x40.png', 'Member'),
('d.smith@example.com', 'David Smith', @password_hash, 'https://placehold.co/40x40.png', 'Member'),
('sarah.lee@example.com', 'Sarah Lee', @password_hash, 'https://placehold.co/40x40.png', 'Member');

-- -----------------------------------------------------
-- Create a Team
-- -----------------------------------------------------
-- Get the owner's ID
SET @owner_id = (SELECT `id` FROM `users` WHERE `email` = 'admin@example.com' LIMIT 1);

INSERT INTO `teams` (`name`, `owner_id`) VALUES
('TimeWise Corp', @owner_id);

-- Get the new team's ID
SET @team_id = LAST_INSERT_ID();

-- -----------------------------------------------------
-- Assign all users to the new Team
-- -----------------------------------------------------
UPDATE `users` SET `team_id` = @team_id;


-- -----------------------------------------------------
-- Create Event Types for the Mock User
-- -----------------------------------------------------
SET @user_id = (SELECT `id` FROM `users` WHERE `email` = 'user@example.com' LIMIT 1);

INSERT INTO `event_types` (`user_id`, `title`, `duration`, `description`, `booking_url`) VALUES
(@user_id, '30 Minute Meeting', 30, 'A standard event type for quick scheduling.', 'https://timewise.com/link/user/30min'),
(@user_id, 'Project Kick-off', 60, 'A standard event type for quick scheduling.', 'https://timewise.com/link/user/kickoff'),
(@user_id, 'User Interview', 45, 'A standard event type for quick scheduling.', 'https://timewise.com/link/user/interview'),
(@user_id, 'Team Brainstorm', 90, 'A standard event type for quick scheduling.', 'https://timewise.com/link/user/brainstorm');


-- -----------------------------------------------------
-- Example of creating a meeting
-- -----------------------------------------------------
SET @event_type_id = (SELECT `id` FROM `event_types` WHERE `title` = '30 Minute Meeting' LIMIT 1);

INSERT INTO `meetings` (`event_type_id`, `start_time`, `end_time`, `status`) VALUES
(@event_type_id, NOW() + INTERVAL 1 DAY, NOW() + INTERVAL 1 DAY + INTERVAL 30 MINUTE, 'Scheduled');

SET @meeting_id = LAST_INSERT_ID();
SET @participant_id = (SELECT `id` FROM `users` WHERE `email` = 'maria.g@example.com' LIMIT 1);

INSERT INTO `meeting_participants` (`meeting_id`, `user_id`) VALUES
(@meeting_id, @user_id),
(@meeting_id, @participant_id);

SELECT 'Seed data successfully inserted.' as status;
