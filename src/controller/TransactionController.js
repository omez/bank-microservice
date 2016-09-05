var _ = require('lodash');

module.exports = TransactionController;

function TransactionController(app, accountStorage, transactionManager){

	app.get('/transfer', function(req, res){

		var payerAccountId = req.query.from;
		var payer = accountStorage.find(payerAccountId);
		if(!payer){
			res.send(404, 'Payer not found');
			return;
		}

		var recepientAccountId = req.query.to;
		var recepient = accountStorage.find(recepientAccountId);
		if(!recepient){
			res.send(404, 'Recepient not found');
			return;
		}

		var amount = parseInt(req.query.amount);
		if(!amount){
			res.send(400, 'Amount required');
			return;
		}

		var transaction = transactionManager.transfer(payer, recepient, amount);

		res.json(201, transaction);
	});

	app.get('/transactions', function(req, res){

		res.json(transactionManager.storage.collection);

	});
}