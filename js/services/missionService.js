
angular.module('missionService', [])

	.factory('Mission', function($http) {


		return {
			personal: {
				get : function(id) {
					return  $http({
						method: 'GET',
						url: 'http://localhost:8000/api/personalmission/' + id,
					});
				},
				save : function(datas) {
					return $http({
						method: 'POST',
						url: 'http://localhost:8000/api/personalmission/',
						headers: { 'Content-Type' : 'application/x-www-form-urlencoded' },
						data: $.param(datas)
					});
				}

			},
			get : function(id) {
				id = (id == undefined) ? "": id;
				return  $http({
					method: 'GET',
					url: '/api/mission/' + id,

				});
				
			},
			showMission : function(id) {
				id = (id == undefined) ? "": id;
				return  $http({
					method: 'GET',
					url: '/showMission/' + id ,

				});
				
			},
			getpersonal : function(id) {
				id = (id == undefined) ? "": id;
				return  $http({
					method: 'GET',
					url: '/missionpersonal/' + id,

				});
				
			},

			postpersonal : function(data) {
				
				return $http({
					method: 'POST',
					url: 'http://localhost:8000/api/missionpersonal/' + data.id,
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded' },
					data: $.param(data)
				});
				
			},

			postproject : function(data) {
				return $http({
					method: 'POST',
					url: 'http://localhost:8000/api/missionproject/' + data.id,
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded' },
					data: $.param(data)
				});
			},

			state : function(data) {
				
				return $http({
					method: 'POST',
					url: 'http://localhost:8000/api/missionstate/' + data.id,
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded' },
					data: $.param(data)
				});
				
			},

			mission : function(data) {
				
				return $http({
					method: 'POST',
					url: '/missionname/' + data.id,
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded' },
					data: $.param(data)
				});
				
			},

			save : function(data) {

				return $http({
					method: 'POST',
					url: '/api/mission',
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded' },
					data: $.param(data)
				});
			},

			update : function(data) {
				console.log(data);
				return $http({
					method: 'PUT',
					url: '/api/mission/' + data.id,
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded' },
					data: $.param(data)
				});
			},
			delete : function(id) {
				return $http({
					method: 'DELETE',
					url: '/api/mission/' + id,
				});
			}
		}

	});