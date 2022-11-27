
CREATE TABLE rol(
	id INT IDENTITY(1,1) PRIMARY KEY,
	name VARCHAR (50),
	description VARCHAR(200)
);

INSERT INTO rol(name,description) VALUES
('Administrador','Usuario en calidad de administrador el cual dispone con el control total del software'),
('Supervisor','Usuario en calidad de supervisor el cual dispone de funciones de supervisión');

CREATE TABLE users(
	id_email VARCHAR(100) PRIMARY KEY,
	password VARCHAR(200) NOT NULL,
	id_rol INT NOT NULL,
	name VARCHAR(200),
	FOREIGN KEY (id_rol) REFERENCES rol(id)
);

INSERT INTO users(id_email,password, id_rol,name) VALUES 
('admin@correo.com','1234',1,'Administrador');

CREATE TABLE biodigester(
	id_token VARCHAR(12) PRIMARY KEY,
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
	u_agri_environmental,
	temp_point,
	light,
	fan,
	proportional_gain,
	integral_time,
	derivative_time
) VALUES(
	'qe573c9DzlQ4',
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
	id_token VARCHAR(12) NOT NULL,
	PRIMARY KEY(id_email,id_token),
	FOREIGN KEY (id_email) REFERENCES users(id_email),
	FOREIGN KEY (id_token) REFERENCES biodigester(id_token)
);

CREATE TABLE read_biodigester(
	id_token VARCHAR(12) NOT NULL,
	date_read DATETIME NOT NULL,
	humidety FLOAT NOT NULL,
	temperature FLOAT NOT NULL,
	air_quality INT NOT NULL,
	gas INT NOT NULL,
	carbon_monoxide INT NOT NULL,
	PRIMARY KEY (id_token,date_read)
);
