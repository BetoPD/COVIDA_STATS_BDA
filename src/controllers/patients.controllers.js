import pool from '../db/database.js';

export const getQuery = async (req, res, next) => {
  const response = await pool.query(`
    SELECT products.productCode, products.productDescription, SUM(orderdetails.quantityOrdered) AS cantidadVendida, YEAR(orders.orderDate) as Año
        FROM products
        INNER JOIN orderdetails ON (products.productCode = orderdetails.productCode)
        INNER JOIN orders ON (orderdetails.orderNumber = orders.orderNumber)
        INNER JOIN customers ON (orders.customerNumber = customers.customerNumber)
        WHERE 
        	MATCH(productDescription) AGAINST('wood metal' IN BOOLEAN MODE)
            AND 
            customers.country IN ('France', 'UK')
            AND 
            YEAR(orders.orderDate) = 2004
        GROUP BY productCode
        ORDER BY cantidadVendida DESC;
  `);

  res.json(response[0]);
};
