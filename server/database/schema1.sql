-- Unified user table with role differentiation
CREATE TABLE users (
  Id_User INT NOT NULL AUTO_INCREMENT,
  Email VARCHAR(255) NOT NULL UNIQUE,
  Password VARCHAR(255) NOT NULL,
  FirstName VARCHAR(255) NOT NULL,
  LastName VARCHAR(255) NOT NULL,
  PhoneNumber VARCHAR(15),
  Role ENUM('ADMIN', 'CLIENT', 'TRANSLATOR') NOT NULL,
  PRIMARY KEY (Id_User)
);

-- Table for translators' specific details
CREATE TABLE translators (
  Id_Translator INT NOT NULL AUTO_INCREMENT,
  Id_User INT NOT NULL,
  Language VARCHAR(255),
  FOREIGN KEY (Id_User) REFERENCES users (Id_User),
  PRIMARY KEY (Id_Translator)
);

-- Documents table
CREATE TABLE documents (
  Id_Doc INT NOT NULL AUTO_INCREMENT,
  Type VARCHAR(255) NOT NULL,
  Language_Source VARCHAR(255) NOT NULL,
  Status ENUM('PENDING', 'IN_PROGRESS', 'COMPLETED', 'REJECTED') NOT NULL,
  Real_Path VARCHAR(255) NOT NULL,
  Id_Client INT NOT NULL,
  Id_Translator INT,
  FOREIGN KEY (Id_Client) REFERENCES users (Id_User),
  FOREIGN KEY (Id_Translator) REFERENCES translators (Id_Translator),
  PRIMARY KEY (Id_Doc)
);

-- Estimation table
CREATE TABLE estimations (
  Id_Estimation INT NOT NULL AUTO_INCREMENT,
  Id_Translator INT NOT NULL,
  Id_Client INT NOT NULL,
  Language_Doc VARCHAR(255) NOT NULL,
  Id_Doc INT NOT NULL,
  FOREIGN KEY (Id_Translator) REFERENCES translators (Id_Translator),
  FOREIGN KEY (Id_Client) REFERENCES users (Id_User),
  FOREIGN KEY (Id_Doc) REFERENCES documents (Id_Doc),
  PRIMARY KEY (Id_Estimation)
);

-- Availability table for translators
CREATE TABLE availability (
  Id_Availability INT NOT NULL AUTO_INCREMENT,
  Id_Translator INT NOT NULL,
  Available_Date DATE NOT NULL,
  Available_Hours VARCHAR(50),
  FOREIGN KEY (Id_Translator) REFERENCES translators (Id_Translator),
  PRIMARY KEY (Id_Availability)
);

-- Languages table for supported languages
CREATE TABLE languages (
  Id_Language INT NOT NULL AUTO_INCREMENT,
  Name VARCHAR(255) NOT NULL UNIQUE,
  PRIMARY KEY (Id_Language)
);

-- Translator-Language mapping table for many-to-many relation
CREATE TABLE translator_languages (
  Id_Translator INT NOT NULL,
  Id_Language INT NOT NULL,
  FOREIGN KEY (Id_Translator) REFERENCES translators (Id_Translator),
  FOREIGN KEY (Id_Language) REFERENCES languages (Id_Language),
  PRIMARY KEY (Id_Translator, Id_Language)
);
