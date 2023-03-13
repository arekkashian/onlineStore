drop table if exists Product;
drop table if exists Customer;
drop table if exists groceryOrder;

create table Product (
	id integer not null primary key,
	name text not null,
	description text,
	price integer not null,
	quantity integer not null
);

create table groceryOrder (
	id integer not null primary key,
	customer text not null
);

create table orderProduct (
	orderId integer not null,
	productId integer not null,
	quantity integer not null
);

insert into Product values
(NULL, "Pork (kg)", "Comes from pigs", 5, 10),
(NULL, "Beef (kg)", "Comes from cows", 8, 10),
(NULL, "Chicken (kg)", "Comes from chickens", 4, 10),
(NULL, "Turkey (kg)", "Thanksgiving", 4, 10),
(NULL, "Eggs (cartons)", "Comes from chickens", 2, 100),
(NULL, "Milk (liters)", "Comes from cows", 2, 100),
(NULL, "Flour (kg)", "Comes from the ground", 1, 100),
(NULL, "Rice (kg)", "Comes from paddy", 1, 100);