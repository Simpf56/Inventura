
--db_a98acf_wp6 od profesora

SELECT name, collation_name FROM sys.databases;
GO
ALTER DATABASE db_ab2817_inventorija   SET SINGLE_USER WITH
ROLLBACK IMMEDIATE;
GO
ALTER DATABASE db_ab2817_inventorija   COLLATE Croatian_CI_AS;
GO
ALTER DATABASE db_ab2817_inventorija   SET MULTI_USER;
GO
SELECT name, collation_name FROM sys.databases;
GO

create table Nabavljaci(
	sifra int not null primary key identity (1,1),
	ime varchar (100) not null,
	prezime varchar (100) not null,
	naziv varchar (100) not null,
	kontakt varchar (100) not null,
	br_tel varchar (100) not null
);

create table Proizvodi(
	sifra int not null primary key identity (1,1),
	naziv varchar (100)not null,
	cijena decimal (22,2) not null,
	nabavljac int foreign key references Nabavljaci(sifra)
);

create table Kupci(
	sifra int not null primary key identity (1,1),
	ime varchar (50)not null,
	prezime varchar (50)not null,
	br_tel varchar (50) not null,
	adresa varchar (100), 
	datum_rod date
);

create table Narudzbe(
	sifra int not null primary key identity (1,1),
	ukupan_iznos decimal (22,2) not null,
	datum date,
	[status] varchar (20),
	kupac int foreign key references Kupci(sifra)
);



create table Stavke_narudzbe(
	sifra int not null primary key  identity (1,1),
	proizvod int foreign key references Proizvodi(sifra),
	narudzba int foreign key references Narudzbe(sifra),
	kolicina int not null,
	cijena decimal (22,2)
);

insert into Nabavljaci ( naziv,ime,prezime,kontakt,br_tel)
values	('Dobavljač d.o.o.','Ivan','Perić','ivan.peric@dobavljac.hr',0911234567),
		('Global Supplies Ltd.','Petra','Novak','petra.novak@global.com',0917654321);

insert into Proizvodi ( naziv,cijena)
values	('T-Shirt',20.00),
		('Laptop',4500.00),
		('Kava',60.00);

insert into Kupci (ime,prezime,br_tel,adresa,datum_rod)
values	('Marko','Horvat',0912345678,'Ulica Marka 5, Zagreb','1990-05-15'),
		('Ana','Kovačić',0918765432,'Ulica Ane 10, Split','1985-12-20');

insert into Narudzbe (ukupan_iznos,datum,status,kupac)
values	(100.00,'2024-11-22','Poslana',1),
		(60.00,'2024-11-21','U tijeku',2);

insert into Stavke_narudzbe (proizvod,narudzba,kolicina,cijena)
values	(1,1,2,40.00),
		(1,2,1,60.00),
		(2,2,1,60.00);