var mainApp = angular.module('mainApp', ['ngRoute', 'mainControllers']);

mainApp.config(['$routeProvider', '$locationProvider', '$interpolateProvider',
	function($routeProvider, $locationProvider, $interpolateProvider) {
		$routeProvider.
			when('/', {
				templateUrl: '/partials/inicio',
				controller: 'mainCtrl'
			}).
			when('/inicio', {
				templateUrl: '/partials/inicio',
				controller: 'mainCtrl'
			}).
			when('/nosotros', {
				templateUrl: '/partials/nosotros',
				controller: 'mainCtrl'
			}).
			when('/nosotros/:section', {
				templateUrl: '/partials/nosotros',
				controller: 'mainCtrl'
			}).
			when('/servicios', {
				templateUrl: '/partials/servicios',
				controller: 'mainCtrl'
			}).
			when('/servicios/:section', {
				templateUrl: '/partials/servicios',
				controller: 'mainCtrl'
			}).
			when('/soluciones', {
				templateUrl: '/partials/soluciones',
				controller: 'mainCtrl'
			}).
			when('/soluciones/:section', {
				templateUrl: '/partials/soluciones',
				controller: 'mainCtrl'
			}).
			when('/contacto', {
				templateUrl: '/partials/contacto',
				controller: 'mainCtrl'
			}).
			when('/contacto/:section', {
				templateUrl: '/partials/contacto',
				controller: 'mainCtrl'
			}).
			when('/home', {
				templateUrl: '/partials/home',
				controller: 'mainCtrl'
			}).
			when('/about-us', {
				templateUrl: '/partials/aboutus',
				controller: 'mainCtrl'
			}).
			when('/about-us/:section', {
				templateUrl: '/partials/aboutus',
				controller: 'mainCtrl'
			}).
			when('/services', {
				templateUrl: '/partials/services',
				controller: 'mainCtrl'
			}).
			when('/services/:section', {
				templateUrl: '/partials/services',
				controller: 'mainCtrl'
			}).
			when('/solutions', {
				templateUrl: '/partials/solutions',
				controller: 'mainCtrl'
			}).
			when('/solutions/:section', {
				templateUrl: '/partials/solutions',
				controller: 'mainCtrl'
			}).
			when('/contact', {
				templateUrl: '/partials/contact',
				controller: 'mainCtrl'
			}).
			when('/contact/:section', {
				templateUrl: '/partials/contact',
				controller: 'mainCtrl'
			}).
			otherwise({
				redirectTo: '/'
			});

		$locationProvider.html5Mode(true);
		$interpolateProvider.startSymbol('{[{').endSymbol('}]}');
	}
]);

var mainControllers = angular.module('mainControllers', []);

mainControllers.controller('GralCtrl', ['$scope', '$http', 
	function ($scope, $http) {

		$scope.load_page = function(){
			window.location = $('.lang_link:first').attr('href');
		}
		
	}
]);

mainControllers.controller('mainCtrl', ['$scope', '$http', '$location', '$route', '$routeParams',
	function ($scope, $http, $location, $route, $routeParams) {
		$scope.$route = $route;
		$scope.$location = $location;
		$scope.$routeParams = $routeParams;
		$scope.stories = [];
		$scope.bigImages = [];
		$scope.story_selected = 0;

		$scope.gotoTop = function(id, myoffset) {
			id = (typeof(id) == "undefined") ? '' : id;
			myoffset = typeof myoffset != "undefined" ? myoffset : 0;
			var scrollTop = $('#'+id).length ? $('#'+id).offset().top + myoffset : 0;
			$('html, body').animate({
				scrollTop: scrollTop
			}, 750);
		}

		$scope.updateLangURL = function() {
			var lang_switch_url = $('#mainmenu').find('li.active a:first').attr('lang-switch-url');
			if (typeof lang_switch_url != 'undefined'){
				$('.lang_link').attr('href', lang_switch_url);
			} else {
				$('.lang_link').attr('href', $('#home_logo').attr('lang-switch-url') );
			}		
		}

		$scope.submit = function(form){
			$scope.submitted = true;
			if (form.$invalid) {
				$scope.messages = messages[lang].required_fields;
				$('#messages').removeClass().addClass('alert alert-danger');
				return;
			}
			var config = {
				params : {
					'name' : $scope.name,
					'company': $scope.company,
					'email' : $scope.email,
					'phone': $scope.phone,
					'service': $scope.service,
					'message': $scope.message
				},
			};

			$('#messages').removeClass().addClass('alert alert-info');
			$scope.messages = messages[lang].sending;
			$http.get('/send_msg', config)
				.success(function(data, status, headers, config) {
					$scope.messages = data.msg;
					if(typeof data.status != 'undefined' && data.status == 1){
						$('#messages').removeClass().addClass('alert alert-success');
						$scope.name = null;
						$scope.email = null;
						$scope.company = null;
						$scope.phone = null;
						$scope.service = '';
						$scope.message = null;
						$scope.submitted = false;
						$timeout(function() {
							$scope.messages = null;
						}, 4000);
					}else{
						$('#messages').removeClass().addClass('alert alert-danger');
					}	
				})
				.error(function(data, status, headers, config) {
					$('#messages').removeClass().addClass('alert alert-danger');
					$scope.messages = messages[lang].network_error;
				});
		}

		$scope.setModalIndex = function(index){
			$scope.bigImageIndex = index;
		}

		$scope.loadCarouselSoluciones = function(){
			$('#solutions-carousel').click(function(e){
				e.preventDefault();
			});
			$('#solutions-carousel').carousel({
				interval: false
			})
			$('#mobile_solutions').click(function(e){
				e.preventDefault();
				$scope.gotoTop('success_content', -$('#header').height());
			});

			$http.get('/api/get_soluciones', {})
				.success(function(data, status, headers, config) {
					if(typeof data.status != 'undefined' && data.status == 1){
						$scope.stories = data.data.stories
						$scope.loadCarouselImages(0, true);
					}	
				});
		}

		$scope.loadCarouselImages = function(index, flag){
			$scope.bigImages = $scope.stories[index].images;
			if( typeof flag == 'undefined' && $('#responsive_btn').is(':visible')){
				$scope.gotoTop('success_content', -$('#header').height());
			}
		}

		$scope.loadCarouselInicio = function(){
			$('#homeCarousel').carousel();
		}

		$scope.carruselNav = function(direction){
			var real_index = {
				'prev': [4, 0, 1, 2, 3], 
				'next': [1, 2, 3, 4, 0]
			};
			$scope.loadCarouselImages(real_index[direction][$('#success_menu .active').data('slide-to')], true);
		}

		$scope.init = function(){
			var path = $scope.$location.path();
			var items = path.split("/");
			if(typeof $scope.$routeParams.section != "undefined"){
				$scope.gotoTop($scope.$routeParams.section);
			}else if($(window).scrollTop() > $(window).height()){
				$("html, body").animate({ scrollTop: 0 });
			}

			if(items.length > 2){
				path = "/" + items[1];
			}

			if(path.length){
				$('#mainmenu').find('.active').removeClass('active');
				if(path != '/'){
					$('#mainmenu').find('a[href="'+path+'"]').parent().addClass('active');
				}

				if (path == '/contacto' || path == '/contact'){
					$('#footer-contact').hide();
				} else {
					$('#footer-contact').show();
				}
			}

			if(path == '/' || path.indexOf('inicio', 'home') != -1){
				$scope.loadCarouselInicio();
			}
			else if(path.indexOf('soluciones', 'solutions') != -1){
				$scope.loadCarouselSoluciones();
			}

			$scope.updateLangURL();
		}

		$scope.init();
	}
]);

