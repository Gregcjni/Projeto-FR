
function findProduct(){
    global.connection.query('SELECT 1 + 1 AS solution')
    .then("find products")
    .catch("erro no find products");

}
    
