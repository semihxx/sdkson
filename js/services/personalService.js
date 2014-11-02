
angular.module('personalService', [])

	.factory('Personal', function($http) {


		return {

			get : function(id) {
				id = id == undefined ? "": id;
				return  $http({
					method: 'GET',
					url: '/api/personal/' + id,
				});
				
			},
			
			save : function(commentData) {

				return $http({
					method: 'POST',
					url: '/api/personal',
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded' },
					data: $.param(commentData)
				});
			},

			update : function(commentData) {
				return $http({
					method: 'PUT',
					url: '/api/personal/' + commentData.id,
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded' },
					data: $.param(commentData)
				});
			},
			password : function(commentData) {
				console.log( '/api/personalpwd/' + commentData.id, commentData);
				return $http({
					method: 'PUT',
					url: '/personalpwd/' + commentData.id,
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded' },
					data: $.param(commentData)
				});
			},
			delete : function(id) {
				return $http({
					method: 'DELETE',
					url: '/api/personal/' + id,
				});
			}
		}

	});