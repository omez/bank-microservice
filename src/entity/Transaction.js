module.exports = Transaction;

function Transaction(payer, recepient, amount){
	this.payer = payer;
	this.recepient = recepient;
	this.amount = amount;
}