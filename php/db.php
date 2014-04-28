

CREATE DATABASE HackFMI;

USE HackFMI;

CREATE TABLE User(
	User_ID INT AUTO_INCREMENT,
	Username VARCHAR(15) NOT NULL UNIQUE,
	Password VARCHAR(15) NOT NULL,
	Email VARCHAR(50) UNIQUE,
	PRIMARY KEY(User_ID)
	);

CREATE TABLE MyModules(
	Module_ID INT AUTO_INCREMENT,
	Name VARCHAR(20),
	Title VARCHAR(30),
	MainWidget VARCHAR(20),
	PRIMARY KEY(Module_ID)
	);

CREATE TABLE MU(
	User_ID INT,
	Module_ID INT,
	FOREIGN KEY(User_ID) REFERENCES User(User_ID),
	FOREIGN KEY(Module_ID) REFERENCES MyModules(Module_ID)
	);

CREATE TABLE JunkAcceptors(
	ID INT AUTO_INCREMENT,
	Title VARCHAR(50) NOT NULL,
	Description VARCHAR(200),
	Email VARCHAR(50) NOT NULL,
	User_ID INT,
	PRIMARY KEY(ID),
	FOREIGN KEY(User_ID) REFERENCES User(User_ID)
	);

INSERT INTO User(Username, Password, Email) VALUES
('HowTroublesome', '123451', 'justforthestyle@abv.bg'),
('Johnny', '543215', 'typsym@abv.bg'),
('Scourge', '555551', 'scourge@abv.bg');

INSERT INTO JunkAcceptors(Title, Description, Email, User_ID) VALUES
('Junk Acceptors', 'Accepting Junks And Stuff...!', 'junkacceptors@abv.bg', '2'),
('Garbage Collector', 'Collecting Garbage...!', 'gcollector@abv.bg', '1'),
('Junk Acceptors', 'Accepting Junks And Stuff...!', 'junkacceptors@abv.bg', '1');

INSERT INTO MyModules(Name, Title, MainWidget) VALUES ('Give Me Away', 'Second Hand Finder', 'modules/RazdaiMe/widgets/UT.razdaiMe');

INSERT INTO MU(User_ID, Module_ID) VALUES
('1', '1'),
('2', '1'),
('3', '1');

