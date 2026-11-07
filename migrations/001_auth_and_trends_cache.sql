ALTER TABLE users
  MODIFY password VARCHAR(255) NULL;

CREATE TABLE IF NOT EXISTS auth_otp_challenges (
  email VARCHAR(255) NOT NULL,
  purpose ENUM('signup', 'reset') NOT NULL,
  otp_hash CHAR(64) NOT NULL,
  password_hash VARCHAR(255) NULL,
  expires_at DATETIME NOT NULL,
  attempts TINYINT UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (email, purpose),
  INDEX idx_auth_otp_expires_at (expires_at)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS trends_cache (
  keyword VARCHAR(255) NOT NULL,
  payload JSON NOT NULL,
  fetched_at DATETIME NOT NULL,
  PRIMARY KEY (keyword),
  INDEX idx_trends_cache_fetched_at (fetched_at)
) ENGINE=InnoDB;
