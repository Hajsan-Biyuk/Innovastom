$(document).ready(function() {

	//кнопка sandwich
	$(".sandwich").click(function() {
		if ($(".main-menu").is(":hidden")) {
			$(".main-menu").slideDown(200);
			$(".header").addClass("active");
			$(".sandwich").addClass("active");
			$("body").addClass("no-scroll-mob");
		} else {
			$(".main-menu").slideUp(200);
			$(".header").removeClass("active");
			$(".sandwich").removeClass("active");
			$("body").removeClass("no-scroll-mob");
		}
	});

	{
		if ($(window).width() < 992) { 
			$(".item-box__head").click(function() {
				$(this).parent().toggleClass("active");
				$(this).siblings().slideToggle(200);
				$(this).parent().siblings(".item-box").removeClass("active");
				$(this).parent().siblings(".item-box").find(".item-box__content").slideUp(200);
			  });
		}
	  }


	$(document).mouseup(function (e) {
		var menu = $(".main-menu");
		if (menu.has(e.target).length === 0){
			$(".main-menu").slideUp(200);
			$(".header").removeClass("active");
			$(".sandwich").removeClass("active");
		}
	  });

	$(".info-mob__sign").click(function() {
		if ($(".info-mob__content").is(":hidden")) {
			$(".info-mob__content").fadeIn(200);
		} else {
			$(".info-mob__content").fadeOut(200);
		}
	});

	$(document).mouseup(function (e) {
		var container = $(".info-mob__content");
		if (container.has(e.target).length === 0){
			$(".info-mob__content").fadeOut(200);
		}
	  });

	  
	//плавный скролл
	$(".nav-page li a").mPageScroll2id({
		offset: 160
	});


	//слайдер

	$('.slider-sales').slick({
		arrows: true,
		dots: false,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		prevArrow: '<div class="slick-prev slick-arrow"><i class="far fa-chevron-left"></i><div/>',
		nextArrow: '<div class="slick-next slick-arrow"><i class="far fa-chevron-right"></i><div/>',
		responsive: [
			{
				breakpoint: 992,
				settings: {
					arrows: false,
					dots: true,
				}
			}
			]
		});

	$('.slider-team').slick({
		arrows: true,
		dots: false,
		infinite: true,
		slidesToShow: 3,
		slidesToScroll: 1,
		prevArrow: '<div class="slick-prev slick-arrow"><i class="far fa-chevron-left"></i><div/>',
		nextArrow: '<div class="slick-next slick-arrow"><i class="far fa-chevron-right"></i><div/>',
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 2,
				}
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 1,
					arrows: false,
					dots: true,
				}
			}
			]
		});

	$('.slider-documents').slick({
		arrows: true,
		dots: false,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		prevArrow: '<div class="slick-prev slick-arrow"><i class="far fa-chevron-left"></i><div/>',
		nextArrow: '<div class="slick-next slick-arrow"><i class="far fa-chevron-right"></i><div/>',
		responsive: [
			{
				breakpoint: 992,
				settings: {
					arrows: false,
					dots: true,
				}
			}
			]
		});

	$('.slider-for').slick({
		arrows: false,
		dots: false,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		asNavFor: '.slider-nav',
		prevArrow: '<div class="slick-prev slick-arrow"><i class="fas fa-chevron-left"></i><div/>',
		nextArrow: '<div class="slick-next slick-arrow"><i class="fas fa-chevron-right"></i><div/>',
	});

	$('.slider-nav').slick({
		arrows: false,
		dots: false,
		infinite: true,
		slidesToShow: 3,
		slidesToScroll: 1,
		asNavFor: '.slider-for',
		focusOnSelect: true,
		prevArrow: '<div class="slick-prev slick-arrow"><i class="fas fa-chevron-left"></i><div/>',
		nextArrow: '<div class="slick-next slick-arrow"><i class="fas fa-chevron-right"></i><div/>',
	});

	$('.slider-services-mob').slick({
		arrows: false,
		dots: true,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		prevArrow: '<div class="slick-prev slick-arrow"><i class="far fa-chevron-left"></i><div/>',
		nextArrow: '<div class="slick-next slick-arrow"><i class="far fa-chevron-right"></i><div/>',
		});

		$('.slider-mobile-services').slick({
			arrows: false,
			dots: true,
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			prevArrow: '<div class="slick-prev slick-arrow"><i class="far fa-chevron-left"></i><div/>',
			nextArrow: '<div class="slick-next slick-arrow"><i class="far fa-chevron-right"></i><div/>',
		});

		$('.slider-cases').slick({
			arrows: true,
			dots: false,
			infinite: true,
			slidesToShow: 2,
			slidesToScroll: 1,
			prevArrow: '<div class="slick-prev slick-arrow"><i class="far fa-chevron-left"></i><div/>',
			nextArrow: '<div class="slick-next slick-arrow"><i class="far fa-chevron-right"></i><div/>',
			responsive: [
				{
					breakpoint: 1200,
					settings: {
						slidesToShow: 1,
						arrows: false,
						dots: true,
					}
				}
				]
			});

		$('.slider-reviews').slick({
			arrows: true,
			dots: false,
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			prevArrow: '<div class="slick-prev slick-arrow"><i class="far fa-chevron-left"></i><div/>',
			nextArrow: '<div class="slick-next slick-arrow"><i class="far fa-chevron-right"></i><div/>',
			responsive: [
				{
					breakpoint: 992,
					settings: {
						arrows: false,
						dots: true,
					}
				}
				]
			});

		$('.slider-interior').slick({
			arrows: true,
			dots: false,
			infinite: true,
			slidesToShow: 2,
			slidesToScroll: 1,
			prevArrow: '<div class="slick-prev slick-arrow"><i class="far fa-chevron-left"></i><div/>',
			nextArrow: '<div class="slick-next slick-arrow"><i class="far fa-chevron-right"></i><div/>',
			responsive: [
				{
					breakpoint: 1200,
					settings: {
						slidesToShow: 1,
						arrows: false,
						dots: true,
					}
				}
				]
			});

			$('.slider-comparsion').slick({
				arrows: true,
				dots: false,
				infinite: true,
				slidesToShow: 2,
				slidesToScroll: 1,
				prevArrow: '<div class="slick-prev slick-arrow"><i class="far fa-chevron-left"></i><div/>',
				nextArrow: '<div class="slick-next slick-arrow"><i class="far fa-chevron-right"></i><div/>',
				responsive: [
					{
						breakpoint: 1200,
						settings: {
							slidesToShow: 1,
							arrows: false,
							dots: true,
						}
					}
					]
				});

				$('.slider-comparsion-case').slick({
					arrows: true,
					dots: false,
					infinite: true,
					slidesToShow: 1,
					slidesToScroll: 1,
					prevArrow: '<div class="slick-prev slick-arrow"><i class="far fa-chevron-left"></i><div/>',
					nextArrow: '<div class="slick-next slick-arrow"><i class="far fa-chevron-right"></i><div/>',
					responsive: [
						{
							breakpoint: 1200,
							settings: {
								dots: true,
							}
						}
						]
					});

		$('.filter-list_tabs li a').click(function(event) {
			event.preventDefault();
			$(this).parent().parent().find("li").removeClass('active');
			$(this).parent().addClass('active');
			$(this).parents("section").find(".tab-pane-filter").fadeOut(0);
			var selectTab = $(this).attr("href");
			$(selectTab).fadeIn(200);
			$(this).parents("section").find(".slider-reviews").slick('refresh');
		  });

		  $('.tabs-main li a').click(function(event) {
			event.preventDefault();
			$(this).parent().parent().find("li").removeClass('active');
			$(this).parent().addClass('active');
			$(this).parents("section").find(".tab-pane-main").fadeOut(0);
			var selectTab = $(this).attr("href");
			$(selectTab).fadeIn(200);
		  });

		  $('.more-service .btn-main').click(function(event) {
			event.preventDefault();
			if ($(".text-service").hasClass("active")) {
				$(this).parent().siblings(".text-service").removeClass("active");
				$(this).html("Посмотреть весь текст");
			} else {
				$(this).parent().siblings(".text-service").addClass("active");
				$(this).html("Свернуть");
			}
		  });

		  $('.tab-head-mobile').click(function(event) {
			event.preventDefault();
			$(this).parent().siblings().removeClass("active");
			$(this).parent().siblings().find(".tab-content-mobile").slideUp(200);
			if ($(this).siblings(".tab-content-mobile").is(":hidden")) {
				$(this).siblings(".tab-content-mobile").slideDown(200);
				$(this).parent().addClass("active");
			} else {
				$(this).siblings(".tab-content-mobile").slideUp(200);
				$(this).parent().removeClass("active");
			}
		  });

	$(".input-phone").mask("+7 (999) 999-99-99");

	$(".item-question__head").click(function() {
		$(this).parent().toggleClass("active");
		$(this).siblings().slideToggle(200);
		$(this).parent().siblings(".item-question").removeClass("active");
		$(this).parent().siblings(".item-question").find(".item-question__content").slideUp(200);
	  });
	  
	  $('.tabs-services li a').click(function(event) {
		event.preventDefault();
		$(this).parent().parent().find("li").removeClass('active');
		$(this).parent().addClass('active');
		$(".tab-pane-services").fadeOut(0);
		var selectTab = $(this).attr("href");
		$(selectTab).fadeIn(200);
	  });

	  $('.video-main').click(function() {
		var videoURL = $(this).find("iframe").prop('src');
		videoURL += "&autoplay=1";
		$(this).find("iframe").prop('src',videoURL);
		$(this).addClass("active");
	  });

	  $('.item-sidebar__head').click(function(event) {
		event.preventDefault();
		$(this).parent().siblings(".item-sidebar").removeClass("active");
		$(this).parent().siblings(".item-sidebar").find(".item-sidebar__content").slideUp(200);
		$(this).parent().toggleClass("active");
		$(this).siblings(".item-sidebar__content").slideToggle(200);
	  });


	  //sidebar
	  $(".btn-main_filter").click(function(e) {
		e.preventDefault();
		$(this).toggleClass("active");
		$(".sidebar-filter").slideToggle(200);
	});


	 // стайлер для select
	 $('.item-form select').styler();

	//Попап менеджер FancyBox
	//Документация: http://fancybox.net/howto
	//<a class="fancybox"><img src="image.jpg" /></a>
	//<a class="fancybox" data-fancybox-group="group"><img src="image.jpg" /></a>
	$(".fancybox").fancybox({
		autoFocus: false,
		backFocus: false,
	});


	objectFitImages();


});


/*polifyl*/
  /*! npm.im/object-fit-images 3.2.4 */
  var objectFitImages=function(){"use strict";function t(t,e){return"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='"+t+"' height='"+e+"'%3E%3C/svg%3E"}function e(t){if(t.srcset&&!p&&window.picturefill){var e=window.picturefill._;t[e.ns]&&t[e.ns].evaled||e.fillImg(t,{reselect:!0}),t[e.ns].curSrc||(t[e.ns].supported=!1,e.fillImg(t,{reselect:!0})),t.currentSrc=t[e.ns].curSrc||t.src}}function i(t){for(var e,i=getComputedStyle(t).fontFamily,r={};null!==(e=u.exec(i));)r[e[1]]=e[2];return r}function r(e,i,r){var n=t(i||1,r||0);b.call(e,"src")!==n&&h.call(e,"src",n)}function n(t,e){t.naturalWidth?e(t):setTimeout(n,100,t,e)}function c(t){var c=i(t),o=t[l];if(c["object-fit"]=c["object-fit"]||"fill",!o.img){if("fill"===c["object-fit"])return;if(!o.skipTest&&f&&!c["object-position"])return}if(!o.img){o.img=new Image(t.width,t.height),o.img.srcset=b.call(t,"data-ofi-srcset")||t.srcset,o.img.src=b.call(t,"data-ofi-src")||t.src,h.call(t,"data-ofi-src",t.src),t.srcset&&h.call(t,"data-ofi-srcset",t.srcset),r(t,t.naturalWidth||t.width,t.naturalHeight||t.height),t.srcset&&(t.srcset="");try{s(t)}catch(t){window.console&&console.warn("https://bit.ly/ofi-old-browser")}}e(o.img),t.style.backgroundImage='url("'+(o.img.currentSrc||o.img.src).replace(/"/g,'\\"')+'")',t.style.backgroundPosition=c["object-position"]||"center",t.style.backgroundRepeat="no-repeat",t.style.backgroundOrigin="content-box",/scale-down/.test(c["object-fit"])?n(o.img,function(){o.img.naturalWidth>t.width||o.img.naturalHeight>t.height?t.style.backgroundSize="contain":t.style.backgroundSize="auto"}):t.style.backgroundSize=c["object-fit"].replace("none","auto").replace("fill","100% 100%"),n(o.img,function(e){r(t,e.naturalWidth,e.naturalHeight)})}function s(t){var e={get:function(e){return t[l].img[e?e:"src"]},set:function(e,i){return t[l].img[i?i:"src"]=e,h.call(t,"data-ofi-"+i,e),c(t),e}};Object.defineProperty(t,"src",e),Object.defineProperty(t,"currentSrc",{get:function(){return e.get("currentSrc")}}),Object.defineProperty(t,"srcset",{get:function(){return e.get("srcset")},set:function(t){return e.set(t,"srcset")}})}function o(){function t(t,e){return t[l]&&t[l].img&&("src"===e||"srcset"===e)?t[l].img:t}d||(HTMLImageElement.prototype.getAttribute=function(e){return b.call(t(this,e),e)},HTMLImageElement.prototype.setAttribute=function(e,i){return h.call(t(this,e),e,String(i))})}function a(t,e){var i=!y&&!t;if(e=e||{},t=t||"img",d&&!e.skipTest||!m)return!1;"img"===t?t=document.getElementsByTagName("img"):"string"==typeof t?t=document.querySelectorAll(t):"length"in t||(t=[t]);for(var r=0;r<t.length;r++)t[r][l]=t[r][l]||{skipTest:e.skipTest},c(t[r]);i&&(document.body.addEventListener("load",function(t){"IMG"===t.target.tagName&&a(t.target,{skipTest:e.skipTest})},!0),y=!0,t="img"),e.watchMQ&&window.addEventListener("resize",a.bind(null,t,{skipTest:e.skipTest}))}var l="fregante:object-fit-images",u=/(object-fit|object-position)\s*:\s*([-.\w\s%]+)/g,g="undefined"==typeof Image?{style:{"object-position":1}}:new Image,f="object-fit"in g.style,d="object-position"in g.style,m="background-size"in g.style,p="string"==typeof g.currentSrc,b=g.getAttribute,h=g.setAttribute,y=!1;return a.supportsObjectFit=f,a.supportsObjectPosition=d,o(),a}();

