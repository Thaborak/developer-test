CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  googleId VARCHAR(255) NOT NULL,
  accessToken VARCHAR(2048),
  refreshToken VARCHAR(2048),
  expiryDate DATETIME,
  UNIQUE KEY unique_googleId (googleId)
);
