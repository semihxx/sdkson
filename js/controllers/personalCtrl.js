angular.module('personalCtrl', [])

	

	.controller('personalAltController', function($scope, $stateParams, Personal, Mission) {
			
			var id = parseInt($stateParams.id);
			$scope.currentProject = id;
			$scope.edit = {};
			$scope.durumAyarla("");

			$scope.getPersonal = function(){

				Personal
					.get(id)
					.success(function(data){

						list = $scope.personal = data.liste;
						if (data.gorev[0]){
							$scope.personal.gorev 	= data.gorev[0].type;
							$scope.personal.typeID 	= data.gorev[0].ID;
						}
						$scope.gorevler = data.gorevler;

						Project
							.projectpersonal(id)
							.success(function(data){
								$scope.projectList = data;
							});

					});

			};
			
			$scope.savePersonal = function(){
				
				Personal
					.update($scope.personal).success(function(){
					});
			 
			}

			
			
			$scope.btnGorevEkle = function(){
				Mission
					.personal
					.save({ 
						gorev 	: $scope.personal.yeniGorev, 
						id 		: id 
					})
					.success(function(data){
						$scope.missionList = data;
				});
			}

			$scope.missionObj = {
				get: function(){
					Mission
						.personal
						.get(id)
						.success(function(data){
							$scope.missionList = data;
						});
				},
				delete: function(id){
					Mission
						.delete(id)
						.success(function(data){
							$scope.missionObj.get();
						});
				},
				change: {
					project: function(prid, id){
						Mission
							.postproject({ 
								prid: prid, 
								id: id 
							});
					},
					state: function(state, id){
						Mission
							.state({ 
								state: (state == 1 ? 0 : 1), 
								id: id 
							});
							
					},
					mission: function(id, name){
						Mission
							.mission({ 
								name: name, 
								id: id 
							});
					}
				}

			};
			
	
			$scope.getPersonal();
			$scope.missionObj.get();
	});

