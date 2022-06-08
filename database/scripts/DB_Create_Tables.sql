DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS products CASCADE;
CREATE TABLE products (
    id bigserial PRIMARY KEY,
    product_Name VARCHAR (255) NOT NULL,
    product_Description VARCHAR (511) NOT NULL,
    price NUMERIC(12,2) NOT NULL,
    stock NUMERIC(12,0) NOT NULL
);
