angular.module('missionCtrl', [])

	
	.controller('missionAltController', function($scope, $stateParams, Mission) {
			
			var id = parseInt($stateParams.missionid);

			$scope.Durum 	= "";
			$scope.durumClass 	= "";

			var objDurum = {
				"warning" 	: "Lüften Bekleyiniz...",
				"success" 	: "İletişim bilgileriniz başarılı bir şekilde kaydedilmiştir.",
				"danger"	: "Kaydetme esnasında bir hata oluştu."
			}

			var durumAyarla = function(durum){
				$scope.durumClass = durum;
				$scope.Durum = objDurum[durum];
			}
			$scope.$back = function() { 
			    window.history.back();
			};

			$scope.mission_edit = {};
			$scope.getMission = function(){

				Mission
					.showMission(id)
					.success(function(data){
						$scope.mission_edit = data[0];
					});

			};

			$scope.updateMission = function(){
				durumAyarla("warning");

				

				Mission
					.update($scope.mission_edit)
					.success(function(data){
						durumAyarla("success");

						$edit = $scope.missionList;
						$newEdit = $scope.mission_edit;
						for (var i = $edit.length - 1; i >= 0; i--) {

							if ( $edit[i].id == $newEdit.id ){

								$scope.missionList[i].name 		= $scope.mission_edit.name;
								$scope.missionList[i].pid		= $scope.mission_edit.person_id;
								$scope.missionList[i].start 	= $scope.mission_edit.start;
								$scope.missionList[i].end 		= $scope.mission_edit.end;
								break;
							}

						};
						setTimeout($scope.$back, 500);
				});
			 
			}
			
		
			
			$scope.getMission();



	});

