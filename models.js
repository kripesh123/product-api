var mongoose=require('mongoose');
var _ =require('underscore');

module.exports=function(wagner){
	mongoose.connect('mongodb://localhost:27017/test');

	var Category=mongoose.model('Category',require('./category'));
	var Product=mongoose.model('Product',require('./product'));

	/*var PRODUCT_ID = '000000000000000000000001';
    var product = {
      name: 'LG G4',
      _id: PRODUCT_ID,
      price: {
        amount: 300,
        currency: 'USD'
      }

    Product.save(products,function(error,category){
    	if(error){
    		console.log(error);
    	}
    })
    };*/
/*     var categories = [
      { _id: 'Electronics' },
      { _id: 'Phones', parent: 'Electronics' },
      { _id: 'Laptops', parent: 'Electronics' },
      { _id: 'Bacon' }
    ];
    var products=[
      {
        name: 'LG G4',
        category: { _id: 'Phones', ancestors: ['Electronics', 'Phones'] },
        price: {
          amount: 300,
          currency: 'USD'
        }
      },
      {
        name: 'Asus Zenbook Prime',
        category: { _id: 'Laptops', ancestors: ['Electronics', 'Laptops'] },
        price: {
          amount: 2000,
          currency: 'USD'
        }
      },
      {
        name: 'Flying Pigs Farm Pasture Raised Pork Bacon',
        category: { _id: 'Bacon', ancestors: ['Bacon'] },
        price: {
          amount: 20,
          currency: 'USD'
        }
      }
    ];
    Category.create(categories,function(error,categories){
    	if(error){
    		console.log(error);
    	}
    	Product.create(products,function(error,products){
	    	if(error){
	    		console.log(error);
	    	}
    	});
    });*/
   


	var models={
		Category:Category,
		Product:Product
	};
	//DRY ness Dont Repeat Yourself, register factories in a loop
	_.each(models,function(value,key){
		wagner.factory(key,function(){
			return value;
		});
	});

	return models;
};

/*wagner.factory('Category',function(){
	return Category;
});
return{
	Category:Category
};*/
