'use strict';


function handleTechListOnClick() {
  $('.tech-description').off('click').on('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  });

  $('li.dev-detail-trigger').off('click').on('click', function (e) {
    var $this = $(this);
    var devDetail = $this.data('dev-detail');
    if (devDetail !== undefined) {
      var $tbody = $('#dev-detail-modal tbody');
      $tbody.empty();
      for (var i = 0; i < devDetail.length; i++) {
        var $staffCode = $('<td></td>').text(devDetail[i].StaffCode);
        var $staffName = $('<td></td>').text(devDetail[i].StaffName);
        var $experience = $('<td></td>').text(devDetail[i].Experience);
        var $isAvailable = $('<td></td>').text(devDetail[i].IsAvailable === 1 ? 'Yes' : 'No');
        var $tr = $('<tr></tr>').append($staffCode).append($staffName).append($experience).append($isAvailable);
        /*if (devDetail[i].IsAvailable === 0) {
          $tr.addClass('table-warning');
        }*/
        $tbody.append($tr);
      }
    }

    $('#dev-detail-modal').modal('show');
  });
}

angular.module('techRadarApp')
  .controller('MainCtrl', ['$scope', '$timeout', 'radarService', function ($scope, $timeout, radarService) {
    $scope.radarData = radarService.radar.data;

    $scope.groupActive = radarService.groupActive;
    $scope.locationActive = radarService.locationActive;
    $scope.radarTechList = radarService.radar.getTechList(radarService.locationActive);

    $scope.showListDevs = function () {
      var result = 0;
      for (var i = 0; i < 10; i++) {
        result++;
      }
      return result;
    };

    $scope.setActive = function (status) {
      _.each($scope.radarData, function (status) { status.active = false; });
      status.active = true;
    };

    $scope.setActive($scope.radarData[0]);

    $scope.addTech = function (category, tech) {
      if (tech) {
        category.technologies.push({ label: tech });
        delete category.new;
      }
    };

    $scope.removeTech = function (category, tech) {
      category.technologies = _.without(category.technologies, tech);
    };

    $scope.highlightTechLabel = function (tech, isHighlight) {
      if (tech !== undefined && isHighlight !== undefined) {
        tech.active = isHighlight;
        $scope.technologies.each(function (d) {
          if (d.label === tech.label) {
            d.active = isHighlight;
            window.isHover = isHighlight;
            $scope.redrawTechCircles($scope.technologies, true);
          }
        });
      }
    }
    $scope.$watch('locationActive', function (data) {
      $scope.radarTechList = radarService.radar.getTechList($scope.locationActive);
      $timeout(handleTechListOnClick, 1800);
      return;
    }, true);


    console.log($scope.radarTechList);

    /*  $scope.$watch('groupActive' ,function(data){

        return;
      }, true);*/
    /*$scope.$watch('radarData', function(data){
      if(!data) return;
      $scope.activeCategory =  _.findWhere(_.flatten(_.pluck(data, 'categories')), {active: true});
      $scope.activeStatus = _.find(data, function(status){
        return _.indexOf(status.categories, $scope.activeCategory) >= 0;
      });
    }, true);*/


  }]);
