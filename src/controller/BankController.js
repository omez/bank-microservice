var _ = require('lodash');

module.exports = BankController;

function BankController(app, bankStorage, accountStorage, transactionManager){
	app.get('/banks', function(req, res){
		res.json(bankStorage.collection);
	});

	app.get('/banks/:id/accounts', function(req, res){

		var id = req.params.id;
		var bank = bankStorage.find(id);

		if(!bank){
			res.send(404, 'Bank not found');
			return;
		}

		var accounts = _.filter(accountStorage.collection, {
			bank : bank
		});

		res.json(accounts);
	});

	app.get('/bank/:id/balance', function(req, res){

		var id = req.params.id;
		var bank = bankStorage.find(id);

		if(!bank){
			res.send(404, 'Bank not found');
			return;
		}

		var accounts = _.filter(accountStorage.collection, {
			bank : bank
		});

		var output = _.reduce(accounts, function(result, value){
			var bl = transactionManager.balance(value);
			result.accounts.push({
				account : value,
				balance : bl
			});
			result.total += bl;
			return result;
		}, {
			total : 0,
			accounts : []
		});

		res.json(output);
	});
}