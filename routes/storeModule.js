const connection = require('./dbConnection.js').liteConnect();

module.exports.adminProducts = 
	(req , res , next) => {

      connection.all('select * from Product',
    	(err , rows) => {
	        if(err)
	            console.log("Error Selecting : %s ",err);
	        res.render('listAdminView',
	        	{title:"List of Products", data:rows});
    	});
};

module.exports.adminUpdate =
  	(req , res , next) => {

		for (let i = 0; i < Object.keys(req.body).length; i++) {
			connection.all("update Product set quantity = quantity + ? where id = ?", [req.body[i+1], i+1]);
		}
		if (req.body.delete < 0) {
			connection.all("insert into Product values (NULL, ?, ?, ?, ?)", [req.body.newProduct, req.body.newDescription, req.body.newPrice, req.body.newQuantity]);
		} else if (req.body.delete > 0) {
			connection.all("delete from Product where id = ?", [req.body.delete]);
		}
		
		res.redirect('/adminProducts');
};
  
module.exports.listOrders = 
	(req , res , next) => {
      connection.all('select groceryOrder.id, customer, Product.name, orderProduct.quantity from (groceryOrder left join orderProduct on groceryOrder.id=orderProduct.orderId) as A left join Product on A.productId=Product.id',
    	(err , rows) => {
	        if (err)
	            console.log("Error Selecting : %s ",err);
	        res.render('listOrderView',
	        	{title:"List of Orders", data:rows});
    	});
};

module.exports.listOrdersByCustomer = 
	(req , res , next) => {
      connection.all('select groceryOrder.id, customer, Product.name, orderProduct.quantity from (groceryOrder left join orderProduct on groceryOrder.id=orderProduct.orderId) as A left join Product on A.productId=Product.id where customer=?', [req.params.customer],
    	(err , rows) => {
	        if (err)
	            console.log("Error Selecting : %s ",err);
	        res.render('listOrderView',
	        	{title:"List of Orders", data:rows});
    	});
};

module.exports.listProducts = 
	(req , res , next) => {

      connection.all('select * from Product',
    	(err , rows) => {
	        if(err)
	            console.log("Error Selecting : %s ",err);
	        res.render('listProductView',
	        	{title:"List of Products", data:rows});
    	});
};
	
module.exports.restOrder = 
	(req , res , next) => {

      connection.all('select orderId, customer, name as "product", description, orderProduct.quantity from groceryOrder left join orderProduct on groceryOrder.id=orderProduct.orderId left join Product on productId = Product.id',
    	(err , rows) => {
	        if(err)
	            console.log("Error Selecting : %s ",err);
	        return res.send(rows);
    	});
};

module.exports.restProduct = 
	(req , res , next) => {

      connection.all('select * from Product',
    	(err , rows) => {
	        if(err)
	            console.log("Error Selecting : %s ",err);
	        return res.send(rows);
    	});
};

module.exports.saveOrder = 
	(req , res , next) => {

		flag = true;

		connection.all('select id, quantity from Product', (err, rows) => {
			for (i = 0; i < rows.length; i++) {
				if (rows[i].quantity < req.body[i+1]) flag = false;
			}
			if (flag) connection.run('insert into groceryOrder values (NULL, ?)', [req.body.customer], function () {
				for (i = 0; i < Object.keys(req.body).length - 1; i++) {
					if (req.body[i+1] > 0) {
						connection.run('insert into orderProduct values (?, ?, ?)', [this.lastID, i+1, req.body[i+1]]);
						connection.run('update Product set quantity = quantity - ? where id = ?', [req.body[i+1], i+1]);
					}
				}
			});
		});
		
		res.redirect('/listProducts');
};

