
// Map Data models

exports.definition = {
	config: {

        "columns": { // configure the attribue from the remote server link
			"id":"INTEGER PRIMARY KEY",
			"city":"TEXT", 
            "region":"TEXT",
            "country":"TEXT",
            "latitude":"REAL",
            "longitude":"REAL"
            
		},

		adapter: {
			type: "sql",
			collection_name: "consulate",

			"db_file" : "/Visa.sqlite", 
			"idAttribute" : "id"
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
		});

		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			// extended functions and properties go here

			// For Backbone v1.1.2, uncomment the following to override the
			// fetch method to account for a breaking change in Backbone.
			/*
			fetch: function(options) {
				options = options ? _.clone(options) : {};
				options.reset = true;
				return Backbone.Collection.prototype.fetch.call(this, options);
			}
			*/
		});

		return Collection;
	}
};