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
	this.resource('threed', function() {
		this.resource('threeduser', {
			path : ':user_id'
		});
	});

});

//Extend from the Ember Object
App.Model = Ember.Object.extend({

});
//Create Model for 2D Pipeline
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

//Create Model for 3D Pipeline
App.Threed = App.Model.extend({
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

//Controller for 3D Pipeline
App.ThreedController = Ember.ObjectController.extend({});
//3D

App.TwodController = Ember.ObjectController.extend({//2D

});

//Controller for 3D Route
App.ThreedController = Ember.ArrayController.extend({
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
		},
		refresh : function() {
			var refresh = this.get('content');
			this.set("filteredContent", refresh);
		}
	},
	filteredContent : function() {
		var searchText = this.get('searchText'), regex = new RegExp(searchText, 'i');

		return this.get('model').filter(function(item) {
			return regex.test(item.firstname);
		});
	}.property('searchText', 'model')
});

//Controller for 2D Route
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

		},
		refresh : function() {
			var refresh = this.get('content');
			this.set("filteredContent", refresh);
		}
	},
	filteredContent : function() {
		var searchText = this.get('searchText'), regex = new RegExp(searchText, 'i');

		return this.get('model').filter(function(item) {
			return regex.test(item.firstname);
		});
	}.property('searchText', 'model')
});

//2D User Route
App.TwoduserRoute = Ember.Route.extend({
	model : function(params) {
		return App.Twod.findBy(params.user_id);
	}
});

//3D User Route
App.ThreeduserRoute = Ember.Route.extend({
	model : function(params) {
		return App.Threed.findBy(params.user_id);
	}
});

//Model Functions
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

//Get 3D Users
App.Threed.reopenClass({
	findAll : function() {

		return new Ember.RSVP.Promise(function(resolve, reject) {
			$.getJSON("http://pioneerdev.us/users/index", function(data) {
				var result = data.users.map(function(row) {
					return App.Threed.create(row);
				});
				resolve(result);
			}).fail(reject);
		});
	},
	findBy : function(user_id) {

		return new Ember.RSVP.Promise(function(resolve, reject) {
			var user = App.Threed.create();
			$.getJSON("http://ankur.local/users/byId/" + user_id, function(data) {
				var result = user.setProperties(data.user);
				resolve(result);
			}).fail(reject);
		});
	}
});

//Which model to back the 2D route?
App.TwodRoute = Ember.Route.extend({
	model : function() {
		return App.Twod.findAll();
	}
});

//Which Model to back the 3D route?
App.ThreedRoute = Ember.Route.extend({
	model : function() {
		return App.Threed.findAll();
	}
});

