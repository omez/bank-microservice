var express = require('express');
var app = express();

var EntityStorage = require('./src/service/EntityStorage');
var Person = require('./src/entity/Person');
var Bank = require('./src/entity/Bank');
var Account = require('./src/entity/Account');
var TransactionManager = new (require('./src/service/TransactionManager'))(new EntityStorage());
var personStorage = new EntityStorage();
var bankStorage = new EntityStorage();
var accountStorage = new EntityStorage();

(function fixtures(){

	var user1 = new Person('Mark');
	personStorage.add(user1);
	var user2 = new Person('Carl');
	personStorage.add(user2);
	var user3 = new Person('Lola');

	personStorage.add(user3);
	var bank1 = new Bank('SBS');
	bankStorage.add(bank1);
	var bank2 = new Bank('Alfa');

	bankStorage.add(bank2);
	var acc1 = new Account(user1, bank1);
	accountStorage.add(acc1);
	var acc2 = new Account(user2, bank1);
	accountStorage.add(acc2);
	var acc3 = new Account(user3, bank1);
	accountStorage.add(acc3);
	var acc4 = new Account(user1, bank2);
	accountStorage.add(acc4);
	var acc5 = new Account(user2, bank2);

	accountStorage.add(acc5);

	TransactionManager.transfer(acc1, acc2, 100);
	TransactionManager.transfer(acc2, acc3, 200);
	TransactionManager.transfer(acc1, acc3, 500);
	TransactionManager.transfer(acc5, acc1, 400);
})();

//init controllers
new (require('./src/controller/BankController'))(app, bankStorage, accountStorage, TransactionManager);
new (require('./src/controller/PersonController'))(app, personStorage, accountStorage, TransactionManager);
new (require('./src/controller/AccountController'))(app, accountStorage, TransactionManager);
new (require('./src/controller/TransactionController'))(app, accountStorage, TransactionManager);

app.listen(8080, function(){
	console.log('Server start on port 8080');
});

app.get('/', function(req, res){
	res.send('Hello');
});