module.exports = EntityStorage;

function EntityStorage(payer, recepient, amount){
	this.collection = {};

	var generate = function(length){
		if(!length){
			length = 10;
		}
		var text = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		for(var i = 0; i < length; i++){
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		}

		return text;
	};

	this.add = function(entity){
		var id = generate();
		this.collection[id] = entity;
	};

	this.find = function(id){
		return this.collection[id];
	};
}