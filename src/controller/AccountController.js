var _ = require('lodash');

module.exports = AccountController;

function AccountController(app, accountStorage, transactionManager){

	app.get('/accounts', function(req, res){
		res.json(accountStorage.collection);
	});

	app.get('/account/:id/balance', function(req, res){

		var id = req.params.id;
		var account = accountStorage.find(id);

		if(!account){
			res.send(404, 'Account not found');
			return;
		}

		res.json({
			account: account,
			balance: transactionManager.balance(account)
		});
	});
}