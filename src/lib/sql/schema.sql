-- TimeWise Database Schema
-- This schema defines the tables and relationships for the TimeWise application.

-- -----------------------------------------------------
-- Table `teams`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `teams` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `owner_id` INT NULL,
  PRIMARY KEY (`id`)
);


-- -----------------------------------------------------
-- Table `users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL,
  `display_name` VARCHAR(255) NOT NULL,
  `password_hash` VARCHAR(255) NOT NULL,
  `avatar_url` VARCHAR(255) NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `team_id` INT NULL,
  `role` ENUM('Member', 'Admin', 'Owner') NULL DEFAULT 'Member',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  INDEX `fk_users_teams_idx` (`team_id` ASC) VISIBLE,
  CONSTRAINT `fk_users_teams`
    FOREIGN KEY (`team_id`)
    REFERENCES `teams` (`id`)
    ON DELETE SET NULL
    ON UPDATE NO ACTION
);

-- Add the foreign key constraint for owner_id in the teams table after users table is created
ALTER TABLE `teams` 
ADD INDEX `fk_teams_users_owner_idx` (`owner_id` ASC) VISIBLE,
ADD CONSTRAINT `fk_teams_users_owner`
  FOREIGN KEY (`owner_id`)
  REFERENCES `users` (`id`)
  ON DELETE SET NULL
  ON UPDATE NO ACTION;

-- -----------------------------------------------------
-- Table `event_types`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `event_types` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `duration` INT NOT NULL COMMENT 'Duration in minutes',
  `description` TEXT NULL,
  `booking_url` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `booking_url_UNIQUE` (`booking_url` ASC) VISIBLE,
  INDEX `fk_event_types_users_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_event_types_users`
    FOREIGN KEY (`user_id`)
    REFERENCES `users` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
);


-- -----------------------------------------------------
-- Table `meetings`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `meetings` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `event_type_id` INT NOT NULL,
  `start_time` DATETIME NOT NULL,
  `end_time` DATETIME NOT NULL,
  `status` ENUM('Scheduled', 'Cancelled') NOT NULL DEFAULT 'Scheduled',
  PRIMARY KEY (`id`),
  INDEX `fk_meetings_event_types_idx` (`event_type_id` ASC) VISIBLE,
  CONSTRAINT `fk_meetings_event_types`
    FOREIGN KEY (`event_type_id`)
    REFERENCES `event_types` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
);


-- -----------------------------------------------------
-- Table `meeting_participants`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `meeting_participants` (
  `meeting_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`meeting_id`, `user_id`),
  INDEX `fk_meeting_participants_users_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_meeting_participants_meetings`
    FOREIGN KEY (`meeting_id`)
    REFERENCES `meetings` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_meeting_participants_users`
    FOREIGN KEY (`user_id`)
    REFERENCES `users` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
);
