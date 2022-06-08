-- Takes in 3 parameters and returns an array containing the user you created
CREATE OR REPLACE FUNCTION create_product(
    product_Name        products.product_Name%type,
    product_Description products.product_Description%type,
    price               products.price%type,
    stock               products.stock%type
) RETURNS SETOF products AS $$

DECLARE
product_id products.id%type;
 
BEGIN
INSERT INTO products (product_Name, product_Description, price, stock)
VALUES (product_Name, product_Description, price, stock)
RETURNING id INTO product_id;
 
RETURN QUERY
SELECT *
FROM products
WHERE products.id = product_id;
END;
 
$$ LANGUAGE 'plpgsql';