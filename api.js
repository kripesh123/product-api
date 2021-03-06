var express=require('express');
var status=require('http-status');

module.exports=function(wagner){
	var api=express.Router();

	api.get('/product/id/:id',wagner.invoke(function(Product){
		return function(req,res){
			Product.findOne({_id:req.params.id},
			handleOne.bind(null,'product',res));
		};
	}));

	api.get('/product/category/:id',wagner.invoke(function(Product){
		return function(req,res){
			//load product by category'name || ?price=1
			var sort={name:1};
			if(req.query.price === "1"){
				sort={'internal.approximatePriceUSD':1};
			}else if(req.query.price ==="-1"){
				sort={'internal.approximatePriceUSD':-1};
			}

			Product.find({'category.ancestors':req.params.id}).
			sort(sort).
			exec(handleMany.bind(null,'products',res));
		};
	}));

	return api;
};

function handleOne(property,res,error,result){
	if(error){
		return res.status(status.INTERNAL_SERVER_ERROR).
		json({error:error.toString() });
	}
	if(!result){
		return res.status(status.NOT_FOUND).
		json({error:'Not_Found'});
	}

	var json={};
	json[property]=result;
	res.json(json);
};

function handleMany(property,res,error,result){
	if(error){
		return res.status(status.INTERNAL_SERVER_ERROR).
		json({error:error.toString() });
	}

	var json={};
	json[property]=result;
	res.json(json);

};
