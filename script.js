// BackBone Model

var Classified = Backbone.Model.extend({
	defaults: {
		title: "Backbone Demo",
		description: "Sumus tam adultis. Non est enim tibi nescio fingunt. Confusio esse cupio. Scio te debeo meae. At etiam, ut caveant ab his eu. In tuo positum, idem fecissem. Constitutione, quam molesta est mihi tres menses nescio quid de contractu fines nostros. Scis quare hoc facere. Lorem satis quaesitum. ",
		price: "24000",
		posted: "",
		contact: {
			"name": "John Doe",
      		"phone": "(555) 555-5555",
      		"email": "johndoe@gmail.com"

		},
      	"categories": [
      		"Vehicles",
      		"Parts and Accessories"
      		],		
		imageLink: "https://www.veriday.com/wp-content/uploads/2014/05/backbone.jpg",
		views: 312
	}	
});

// Backbone collection

var Classifieds = Backbone.Collection.extend({});

// instantiate Classifieds

var classifieds = new Classifieds();

// Backbone views for one Blog
var ClassifiedView = Backbone.View.extend({
	model: new Classified(),
	tagName: "div",
	initialize: function() {
		this.template = _.template($('.classifieds-list-template').html());
	},
	events: {
		"click .edit-classified": "edit",
		"click .update-classified": "update",
		"click .cancel": "cancel",
		"click .delete-classified": "delete",
		"click .contact-button": "contact",
		"click .admin-button": "admin",

	},
	varPass: {},	
	edit: function() {
		$("#title-action").text("Edit Classified");
		$(":button.update-classified").show();
		$(":button.add-classified").hide();

		

		var title = this.$(".title").html();
		console.log(title);
		var price = this.$(".price").html();
		var description = this.$(".description").html();
		var imageLink = this.$(".imageLink")[0].src;
		console.log("!!!!!!!!!!!!!!!!!");
		console.log(this);
		console.log("!!!!!!!!!!!!!!!!!");
		console.log(price+"----"+description+"+++++"+imageLink)
		openNav(true);
		

		
		$("input#title-input.form-control.title").val(title);
		$("input.form-control.price-input").val(price);
		$("input.form-control.description-input").val(description);
		$("input.form-control.imageLink-input").val(imageLink);

		
		varPass = this;
		
		

	},
	update: function(){

		console.log("||||||||||||||||||||||||");
		console.log(varPass);
		console.log("||||||||||||||||||||||||");
		varPass.model.set("title", $("input#title-input.form-control.title").val());
		varPass.model.set("price", $("input.form-control.price-input").val());
		varPass.model.set("description", $("input.form-control.description-input").val());
		varPass.model.set("imageLink", $("input.form-control.imageLink-input").val());
		closeNav();
		
	},
	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	},
	cancel: function() {
		classifiedsView.render();
	},
	delete: function() {
		console.log("///////////////////////");
		console.log(this);
		console.log("///////////////////////");
		this.model.destroy();
	},
	admin: function(){
		
		this.$(".button-section").hide();
		
		this.$(".admin-section").show();


		
	},
	contact: function(){

		this.$(".contact-button").hide();
		this.$(".contact-section").show();

		this.$(".detail-button").show();
		this.$(".detail-section").hide();

		

	

	}

});

//Backbone View for all blogs
var ClassifiedsView =  Backbone.View.extend({
	model: classifieds,
	el: $(".classifieds-list"),
	initialize: function() {
		var self = this;
		this.model.on("add", this.render, this);
		//console("========")
		this.model.on("change", function(){
		 	setTimeout(function(){
		 		self.render();				
		 	}, 30);
		}, this);
		this.model.on("remove", this.render, this);
	},	
	render: function() {
		var self = this;
		this.$el.html("");
		_.each(this.model.toArray(), function(classified) {
			self.$el.append((new ClassifiedView({model: classified})).render().$el);
		});
		return this;
	},
	filter: function(str){

	}
});

// instantiate BlogView
var classifiedsView = new ClassifiedsView();

$(document).ready(function() {
	$(".add-classified").on("click", function() {
		console.log("passa por aca");
		
		$("#title-action").text("Add Classified");
		var datenow = new Date().toString().slice(0,24);
		var classified = new Classified({
			title: $("input#title-input.form-control.title").val(),
			price: $("input.form-control.price-input").val(),
			description: $("input.form-control.description-input").val(),
			imageLink: $("input.form-control.imageLink-input").val(),
			posted: datenow

		});		
		


		classifieds.add(classified);
		closeNav();

	});
	
});



