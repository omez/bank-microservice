var _ = require('lodash');

module.exports = PersonController;

function PersonController(app, personStorage, accountStorage, transactionManager){
	app.get('/people', function(req, res){
		res.json(personStorage.collection);
	});

	app.get('/person/:id/balance', function(req, res){

		var id = req.params.id;
		var person = personStorage.find(id);

		if(!person){
			res.send(404, 'Person not found');
			return;
		}

		var accounts = _.filter(accountStorage.collection, {
			person: person
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