/** 导航菜单 **/

define(['angularAMD'], function (angularAMD) {

    var list =  [
                    {
                        name: '首页',
                        url: 'home',
                    },
                    {
                        name: '快速开始',
                        url: 'get-started',
                    },
                    {
                        name: '目录划分',
                        url: 'directory',
                    },
                    {
                        name: '路由',
                        url: 'route',
                    },
                    {
                        name: '控制器',
                        url: 'controller',
                    },
                    {
                        name: '更多阅读',
                        url: 'more-doc',
                    },
                ];   
    angular.module('Vued.cat', [] )
        .directive('cat', function () {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
            },
            templateUrl: './js/templates/cat.tpl.html',
            controller: function ($scope ) {
                
                $scope.list =  list;   
            }
        };
    })
    
    .factory('catset',function($location){

        return function() {
            list.map(function(item) {
                if(item.url == location.hash.replace('#/','')) {
                    item.active = true;
                }else{
                    item.active = false;
                }
            });
            console.log(list);
            
        }
    });
    
    
});