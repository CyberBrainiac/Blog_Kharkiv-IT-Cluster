
CREATE DATABASE IF NOT EXISTS blog;

CREATE TABLE IF NOT EXISTS `blog`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(255) NOT NULL,
  `usersurname` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `blog`.`posts` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `desc` VARCHAR(1000) NOT NULL,
  `date` DATETIME NOT NULL,
  `uid` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `uid_idx` (`uid` ASC) VISIBLE,
  CONSTRAINT `uid`
  FOREIGN KEY (`uid`)
  REFERENCES `blog`.`users` (`id`)
  ON DELETE CASCADE
  ON UPDATE CASCADE
);