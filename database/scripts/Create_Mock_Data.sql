SET client_min_messages TO WARNING;
 
SELECT * FROM create_product('Neurotoxins', 'A bottle of neurotoxins.', 19.99, 22);
SELECT * FROM create_product('Wobbly Ladder', 'A wobbly ladder.', 99.99, 0);
SELECT * FROM create_product('Slippery Boots', 'A pair of slippery boots.', 49.99, 3);
SELECT * FROM create_product('Conductive Gloves', 'A pair of conductive gloves.', 19.99, 2);
SELECT * FROM create_product('Open Toed Shoes', 'A pair of open toed shoes.', 49.99, 6);