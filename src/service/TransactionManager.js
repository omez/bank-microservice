var _ = require('lodash');

module.exports = TransactionManager;

var Transaction = require('../entity/Transaction');

function TransactionManager(transactionStorage){

	this.storage = transactionStorage;

	this.transfer = function(payer, recepient, amount){
		var transaction = new Transaction(payer, recepient, amount);
		transactionStorage.add(transaction);
		return transaction;
	};

	this.balance = function(account){
		return _.reduce(this.storage.collection, function(result, value){
			if(value.payer === account){
				result -= value.amount;
			} else if(value.recepient === account){
				result += value.amount;
			}
			return result;
		}, 0);
	};
}