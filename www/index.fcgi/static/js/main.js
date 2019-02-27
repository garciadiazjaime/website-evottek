$(window).load(function(){
	Mint.loadMenu();
	Mint.loadSubMenu();
	Mint.fixResponsiveMenu();

	window.addEventListener('resize', function(event){
		Mint.loadSubMenu();
	});
});
	
var Mint = {
	loadMenu: function (){
		$(window).scroll(function(){
			if($(window).scrollTop() > 100){
				$('#header').removeClass("static").addClass("condensed");
			}	
			else{
				$('#header').removeClass("condensed").addClass("static");
			}
			if(window.location.pathname.indexOf('solutions', 'soluciones')){
				if($('#historias-exito').length){
					if( $(window).scrollTop() + $('#header').height() >= $('#historias-exito').offset().top && 
						$(window).scrollTop() + $('#header').height() < $('#footer-contact').offset().top ){
						if(!$('#mobile_solutions').hasClass('visible')){
							$('#mobile_solutions').addClass('visible');	
						}
					}else{
						if($('#mobile_solutions').hasClass('visible')){
							$('#mobile_solutions').removeClass('visible');
						}
					}
				}
			}
		});
	},
	loadSubMenu: function (){
		if($(window).width()>1023){
			$( "#menu_servicios a" ).mouseenter(function() {
				if(!$( "#menu_servicios" ).hasClass("hover")){

						$( "#menu_servicios" ).addClass( "hover" );
						$( "#submenu_servicios").addClass( "active" );
				}
			});
			$( "#menu_nosotros a, #menu_soluciones a, #menu_contacto a" ).mouseenter(function() {
				$( "#menu_servicios" ).removeClass( "hover" );
				$( "#submenu_servicios").removeClass( "active" );
			});
			$( "#header").hover(function() {}, function() { 
			  $( "#submenu_servicios").hover(function() {}, function() { 
						$( "#menu_servicios" ).removeClass( "hover" );
						$( "#submenu_servicios").removeClass( "active" );
				})  
			});
		}
	},
	fixResponsiveMenu: function (){
		$('#mainmenu li a').click(function(e){
			if(!$('#responsive_btn').hasClass("collapsed")){
				$("#responsive_btn").addClass("collapsed");
				$('#mainmenu').parent().removeClass('in').css('height', '0');
			}
		});
	},
}