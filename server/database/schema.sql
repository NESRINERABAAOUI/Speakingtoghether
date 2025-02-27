create table users_App (
  Id_User int NOT NULL,
  Email varchar(255) not null unique,
  RoleUser char(1) not null,
  Pass_word varchar(255) not null,
  PRIMARY KEY (Email,RoleUser)
);
create table administrateur (
  Id_admin int NOT NULL AUTO_INCREMENT,
  Email varchar(255) not null unique,
  Password varchar(255) not null,
  FirstName varchar(255) not null,
  LastName varchar(255) not null,
  NumberPhone  varchar(10) null,
  PRIMARY KEY (Id_admin)
);
create table clients (
  Id_Client int NOT NULL AUTO_INCREMENT,
  Email varchar(255) not null unique,
  Password varchar(255) not null,
  FirstName varchar(255) not null,
  LastName varchar(255) not null,
  NumberPhone  varchar(10) null,
  PRIMARY KEY (Id_Client )
);

create table translators (
  Id_Translator int NOT NULL AUTO_INCREMENT,
  Email varchar(255) not null,
  Password varchar(255) not null,
  FirstName varchar(255) not null,
  LastName varchar(255) not null,
  NumberPhone  varchar(10) null,
  Language  varchar(10) null,
  PRIMARY KEY (Id_Translator)
);

create table Model_docs(
 Id_Doc int NOT NULL AUTO_INCREMENT, 
 Type_Doc varchar(255) not null,
 Languages_source varchar(255) not null,
 Status char(1) not null,
 Real_Path_Emplacement varchar(255) not null,
 Id_Client int,
 Id_Translator int ,
  FOREIGN KEY (Id_Client) REFERENCES clients (Id_Client),
  FOREIGN KEY (Id_Translator) REFERENCES translators(Id_Translator),
  PRIMARY KEY (Id_Doc)
);

create table Estimation(
  Id_Tarification  int NOT NULL AUTO_INCREMENT, 
  Email varchar(255) not null unique,
  Id_Translator int ,
  FirstClientName varchar(255) not null,
  LastClientName varchar(255) not null,
  Language_Doc varchar(255) not null,
  Id_Doc int, 
  PRIMARY KEY (Id_Tarification),
  FOREIGN KEY (Id_Translator) REFERENCES translators(Id_Translator),
  FOREIGN KEY (Id_Doc) REFERENCES Model_docs(Id_Doc)
 );

/*create table disponibility (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  Id_Translator int not null,
  Day_Dispo Date,
  Hour_Dispo varchar(10),
 FOREIGN KEY (Id_Translator) REFERENCES translators(Id_Translator)
);*/

/*create table TRANSLATED_DOC(
Id_Client int unsigned primary key auto_increment not null, 
 TYPE  varchar(255) not null unique
)*/

/*create table LANGUAGES(

Id_tarification int unsigned primary key auto_increment not null, 
name  varchar(255) not null, 
)*/