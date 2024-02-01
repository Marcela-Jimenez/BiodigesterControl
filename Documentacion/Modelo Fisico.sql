CREATE TABLE rol(
	id INT IDENTITY(1,1) PRIMARY KEY,
	name VARCHAR (50),
	description VARCHAR(200)
);

INSERT INTO rol(name,description) VALUES
('Administrador','Usuario en calidad de administrador el cual dispone con el control total del software'),
('Supervisor','Usuario en calidad de supervisor el cual dispone de funciones de supervisi�n');

CREATE TABLE users(
	id_email VARCHAR(100) PRIMARY KEY,
	password VARCHAR(200) NOT NULL,
	id_rol INT NOT NULL,
	name VARCHAR(200),
	FOREIGN KEY (id_rol) REFERENCES rol(id)
);

INSERT INTO users(id_email,password, id_rol,name) VALUES 
('admin@correo.com','ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f',1,'Administrador');

CREATE TABLE biodigester(
	id INT IDENTITY(1,1) PRIMARY KEY,
	id_token VARCHAR(12) NOT NULL UNIQUE,
	state BIT NOT NULL,
	u_agri_environmental VARCHAR(150) NOT NULL,
	temp_point INT NOT NULL,
	light BIT NOT NULL,
	fan BIT NOT NULL,
	proportional_gain FLOAT NOT NULL,
	integral_time FLOAT NOT NULL,
	derivative_time FLOAT NOT NULL
);

INSERT INTO biodigester(
	id_token,
	state,
	u_agri_environmental,
	temp_point,
	light,
	fan,
	proportional_gain,
	integral_time,
	derivative_time
) VALUES(
	'qe573c9DzlQ4',
	1,
	'Vergel',
	20,
	1,
	1,
	1000,
	0,
	0.1
);

CREATE TABLE user_biodigester(
	id_email VARCHAR(100) NOT NULL,
	id_bio INT NOT NULL,
	PRIMARY KEY(id_email,id_bio),
	FOREIGN KEY (id_email) REFERENCES users(id_email),
	FOREIGN KEY (id_bio) REFERENCES biodigester(id)
);

CREATE TABLE read_biodigester(
	id_bio INT NOT NULL,
	date_read DATETIME NOT NULL,
	relative_humidety FLOAT NOT NULL,
	inside_temperature FLOAT NOT NULL,
	outside_temperature FLOAT NOT NULL,
	ph_biol FLOAT NOT NULL,
	presion FLOAT NOT NULL,
	MiliVoltios FLOAT NOT NULL,
	PRIMARY KEY (id_bio,date_read),
	FOREIGN KEY (id_bio) REFERENCES biodigester(id)
);
