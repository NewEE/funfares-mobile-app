exports.definition = {
	config: {
		"columns": { // configure the attribue from the remote server link
			"id":"INTEGER PRIMARY KEY",
			"Class":"text",
            "ValidDate":"numeric",
            "Quota":"integer",
            "B_Dates":"numeric",
            "E_Dates":"numeric",
            "Image":"text",
            "City":"text",
            "Region":"text",
            "Price":"integer"
		},

       "URL": "http://localhost:1337/Fanfares/jsonApp",  // jason format
      //  "URL":"https://api.myjson.com/bins/n4aef",

		"adapter" : {
			"type" : "sqlrest",
			"collection_name" : "webFans",  // table name in front end
			"idAttribute" : "id",
		},

		// delete all models on fetch
	   "deleteAllOnFetch": true
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
