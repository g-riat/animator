Ember.LOG_BINDINGS = true;

//Create App app
App = Ember.Application.create();

//Map appropriate routes
App.Router.map(function() {
	this.resource('twod', function() {
		this.resource('twoduser', {
			path : ':user_id'
		});
	});
	this.resource('threed');

});

//Extend from the Ember Object
App.Model = Ember.Object.extend({

});

App.Twod = App.Model.extend({
	id : null,
	firstname : null,
	lastname : null,
	address : null,
	state : null,
	country : null,
	email : null,
	phone : null,
	experience : null,
	designation : null
});

App.TwodController = Ember.ObjectController.extend({

});

App.TwodController = Ember.ArrayController.extend({
	filteredContent : Ember.computed.oneWay("content"),
	selectedDesignation : null,
	designations : [{
		designation : "Design",
		id : 1
	}, {
		designation : "Writer",
		id : 2
	}],
	actions : {
		filter : function() {
			var designation = this.get('selectedDesignation.designation');
			var filtered = this.get('content').filterProperty('designation', designation);
			this.set("filteredContent", filtered);

			// var filtered = this.get('content').filterProperty('designation', "Writer");
			// this.set("filteredContent", filtered);

		}
	},
	filteredContent : function() {
		var searchText = this.get('searchText'), regex = new RegExp(searchText, 'i');

		return this.get('model').filter(function(item) {
			return regex.test(item.firstname);
		});
	}.property('searchText', 'model')
});

App.TwoduserRoute = Ember.Route.extend({
	model : function(params) {
		return App.Twod.findBy(params.user_id);
	}
});

App.Twod.reopenClass({
	findAll : function() {

		return new Ember.RSVP.Promise(function(resolve, reject) {
			$.getJSON("http://pioneerdev.us/users/index", function(data) {
				var result = data.users.map(function(row) {
					return App.Twod.create(row);
				});
				resolve(result);
			}).fail(reject);
		});
	},
	findBy : function(user_id) {

		return new Ember.RSVP.Promise(function(resolve, reject) {
			var user = App.Twod.create();
			$.getJSON("http://ankur.local/users/byId/" + user_id, function(data) {
				var result = user.setProperties(data.user);
				resolve(result);
			}).fail(reject);
		});
	}
});

App.TwodRoute = Ember.Route.extend({
	model : function() {
		return App.Twod.findAll();
	}
});
