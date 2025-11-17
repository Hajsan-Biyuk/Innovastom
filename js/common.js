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

	$(document).mouseup(function (e) {
		var menu = $(".main-menu");
		if (menu.has(e.target).length === 0 && !$(e.target).closest('.sandwich').length){
			$(".main-menu").slideUp(200);
			$(".header").removeClass("active");
			$(".sandwich").removeClass("active");
		}
	});

	// Плавное появление фона у header при скролле
	$(window).scroll(function() {
		var scrollTop = $(window).scrollTop();
		if (scrollTop > 50) {
			$(".header").addClass("scrolled");
		} else {
			$(".header").removeClass("scrolled");
		}
	});

	// Слайдер преимуществ на мобильных (<=480px)
	(function initBillboardAdvantagesSlider() {
		var $advantages = $('.billboard__advantages');
		if (!$advantages.length || typeof $.fn.slick !== 'function') {
			return;
		}

		var sliderInitialized = false;

		function toggleSlider() {
			var windowWidth = $(window).width();
			if (windowWidth <= 480) {
				if (!sliderInitialized) {
					$advantages.slick({
						slidesToShow: 1,
						slidesToScroll: 1,
						arrows: false,
						dots: false,
						infinite: false,
						speed: 400,
						adaptiveHeight: true,
						touchMove: true,
						swipe: true
					});
					sliderInitialized = true;
				}
			} else if (sliderInitialized) {
				$advantages.slick('unslick');
				sliderInitialized = false;
			}
		}

		toggleSlider();
		$(window).on('resize.billboardAdvantages orientationchange.billboardAdvantages', function() {
			toggleSlider();
		});
	})();

	// Анимация чисел в статистике при скролле
	function animateNumber(element, targetValue, duration) {
		var startValue = 0;
		var startTime = null;
		
		// Извлекаем число из целевого значения (убираем пробелы и нецифровые символы)
		var numericValue = parseInt(targetValue.toString().replace(/\s/g, '').replace(/[^\d]/g, '')) || 0;
		
		function animate(currentTime) {
			if (!startTime) startTime = currentTime;
			var progress = Math.min((currentTime - startTime) / duration, 1);
			
			// Используем функцию easing для плавности
			var easeProgress = 1 - Math.pow(1 - progress, 3); // ease-out cubic
			
			var currentValue = Math.floor(startValue + (numericValue - startValue) * easeProgress);
			
			// Форматируем число с пробелами (8 000 вместо 8000)
			var formattedValue = currentValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
			element.textContent = formattedValue;
			
			if (progress < 1) {
				requestAnimationFrame(animate);
			} else {
				// Убеждаемся, что финальное значение точное
				var finalFormattedValue = numericValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
				element.textContent = finalFormattedValue;
			}
		}
		
		requestAnimationFrame(animate);
	}

	// Отслеживание появления блока статистики в viewport
	var statsAnimated = false;
	var statsSection = document.querySelector('.services__stats');
	
	if (statsSection) {
		var observer = new IntersectionObserver(function(entries) {
			entries.forEach(function(entry) {
				if (entry.isIntersecting && !statsAnimated) {
					statsAnimated = true;
					
					var statsNumbers = document.querySelectorAll('.services__stats-number');
					statsNumbers.forEach(function(numberElement) {
						var originalText = numberElement.textContent;
						numberElement.setAttribute('data-original', originalText);
						// Устанавливаем начальное значение 0
						numberElement.textContent = '0';
						// Запускаем анимацию к целевому значению
						animateNumber(numberElement, originalText, 2000); // 2 секунды анимации
					});
					
					observer.unobserve(statsSection);
				}
			});
		}, {
			threshold: 0.3 // Запускаем анимацию, когда 30% элемента видно
		});
		
		observer.observe(statsSection);
	}

	// Equipment tabs и слайдер
	if ($('.equipment__list-header').length) {
		var $equipmentTabs = $('.equipment__item');
		var $tabContents = $('.equipment__tab-content');
		var currentActiveSlider = null;
		
		// Функция получения настроек слайдера в зависимости от ширины экрана
		function getSliderSettings() {
			var windowWidth = $(window).width();
			return {
				slidesToShow: 1,
				slidesToScroll: 1,
				infinite: true,
				autoplay: true,
				autoplaySpeed: 10000,
				speed: 300,
				arrows: false,
				dots: windowWidth < 992,
				swipe: true,
				touchMove: true,
				onInit: function() {
					// Пересчитываем позицию после инициализации
					var $this = $(this);
					setTimeout(function() {
						$this.slick('setPosition');
					}, 50);
				},
				onAfterChange: function() {
					// Пересчитываем позицию после переключения слайда
					var $this = $(this);
					setTimeout(function() {
						$this.slick('setPosition');
					}, 10);
				}
			};
		}
		
		// Функция инициализации слайдера для конкретного таба
		function initSliderForTab($tabContent) {
			var $slider = $tabContent.find('.equipment__benefits-slider');
			
			// Если слайдер уже инициализирован, обновляем настройки
			if ($slider.hasClass('slick-initialized')) {
				var windowWidth = $(window).width();
				$slider.slick('slickSetOption', 'dots', windowWidth < 992, true);
				setTimeout(function() {
					$slider.slick('setPosition');
				}, 50);
				return $slider;
			}
			
			// Инициализация Slick Slider
			$slider.slick(getSliderSettings());
			
			return $slider;
		}
		
		// Функция переключения табов
		function switchTab(tabIndex) {
			// Убираем активный класс со всех табов и контентов
			$equipmentTabs.removeClass('active');
			$tabContents.removeClass('active');
			
			// Добавляем активный класс к выбранному табу и контенту
			$equipmentTabs.eq(tabIndex).addClass('active');
			var $activeTabContent = $tabContents.eq(tabIndex).addClass('active');
			
			// Небольшая задержка для применения стилей
			setTimeout(function() {
				// Инициализируем слайдер для активного таба, если он еще не инициализирован
				currentActiveSlider = initSliderForTab($activeTabContent);
				
				// Пересчитываем позицию слайдера после переключения таба
				if (currentActiveSlider && currentActiveSlider.length) {
					if (currentActiveSlider.hasClass('slick-initialized')) {
						currentActiveSlider.slick('setPosition');
					} else {
						// Ждем инициализации и пересчитываем
						currentActiveSlider.on('init', function() {
							setTimeout(function() {
								currentActiveSlider.slick('setPosition');
							}, 50);
						});
					}
				}
			}, 50);
		}
		
		// Инициализация слайдера для первого таба
		if ($tabContents.length > 0) {
			setTimeout(function() {
				currentActiveSlider = initSliderForTab($tabContents.first());
				// Пересчитываем позицию слайдера после инициализации
				if (currentActiveSlider && currentActiveSlider.length) {
					if (currentActiveSlider.hasClass('slick-initialized')) {
						setTimeout(function() {
							currentActiveSlider.slick('setPosition');
						}, 100);
					} else {
						// Ждем инициализации и пересчитываем
						currentActiveSlider.on('init', function() {
							setTimeout(function() {
								currentActiveSlider.slick('setPosition');
							}, 100);
						});
					}
				}
			}, 150);
		}
		
		// Переключение табов
		$equipmentTabs.on('click', function() {
			var $this = $(this);
			var tabIndex = parseInt($this.data('tab'));
			switchTab(tabIndex);
		});
		
		// Обработка кнопок навигации
		$('.equipment__nav--prev').on('click', function() {
			if (currentActiveSlider && currentActiveSlider.length) {
				var currentSlide = currentActiveSlider.slick('slickCurrentSlide');
				if (currentSlide > 0) {
					currentActiveSlider.slick('slickGoTo', currentSlide - 1);
				}
			}
		});
		
		$('.equipment__nav--next').on('click', function() {
			if (currentActiveSlider && currentActiveSlider.length) {
				var currentSlide = currentActiveSlider.slick('slickCurrentSlide');
				var totalSlides = currentActiveSlider.slick('getSlick').slideCount;
				if (currentSlide < totalSlides - 1) {
					currentActiveSlider.slick('slickGoTo', currentSlide + 1);
				}
			}
		});
		
		// Пересчет ширины слайдера при изменении размера окна
		$(window).on('resize', function() {
			if (currentActiveSlider && currentActiveSlider.length && currentActiveSlider.hasClass('slick-initialized')) {
				var windowWidth = $(window).width();
				currentActiveSlider.slick('slickSetOption', 'dots', windowWidth < 992, true);
				currentActiveSlider.slick('setPosition');
			}
		});
	}

	// Interior Reviews Slider
	if ($('.interior-reviews').length) {
		var interiorCurrentActiveSlider = null;

		// Функция получения настроек слайдера в зависимости от ширины экрана
		function getInteriorSliderSettings() {
			var windowWidth = $(window).width();
			return {
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: false,
				dots: windowWidth < 992,
				infinite: true,
				speed: 300
			};
		}

		// Функция инициализации слайдера для активного таба
		function initInteriorSliderForTab(tabContent) {
			var sliderFor = tabContent.find('.interior-reviews__slider-for');
			var sliderNav = tabContent.find('.interior-reviews__slider-nav');
			var dotsContainer = tabContent.find('.interior-reviews__dots');
			var sliderForId = 'interior-slider-for-' + tabContent.index();
			var sliderNavId = 'interior-slider-nav-' + tabContent.index();
			
			// Добавляем уникальные классы для синхронизации
			sliderFor.attr('id', sliderForId);
			sliderNav.attr('id', sliderNavId);
			
			// Инициализация основного слайдера
			if (sliderFor.length && !sliderFor.hasClass('slick-initialized')) {
				var sliderSettings = getInteriorSliderSettings();
				sliderSettings.asNavFor = '#' + sliderNavId;
				if (dotsContainer.length && sliderSettings.dots) {
					sliderSettings.appendDots = dotsContainer;
				}
				sliderSettings.onInit = function() {
					setTimeout(function() {
						sliderFor.slick('setPosition');
						sliderNav.slick('setPosition');
					}, 100);
				};
				sliderSettings.onAfterChange = function() {
					setTimeout(function() {
						sliderFor.slick('setPosition');
						sliderNav.slick('setPosition');
					}, 100);
				};
				sliderFor.slick(sliderSettings);
				interiorCurrentActiveSlider = sliderFor;
			} else if (sliderFor.length && sliderFor.hasClass('slick-initialized')) {
				var windowWidth = $(window).width();
				sliderFor.slick('slickSetOption', 'dots', windowWidth < 992, true);
				if (dotsContainer.length && windowWidth < 992) {
					sliderFor.slick('slickSetOption', 'appendDots', dotsContainer, true);
				}
				interiorCurrentActiveSlider = sliderFor;
			}
			
			// Инициализация навигационного слайдера
			if (sliderNav.length && !sliderNav.hasClass('slick-initialized')) {
				sliderNav.slick({
					slidesToShow: 3,
					slidesToScroll: 1,
					arrows: false,
					dots: false,
					infinite: false,
					speed: 300,
					asNavFor: '#' + sliderForId,
					focusOnSelect: true,
					centerMode: false,
					variableWidth: false,
					onInit: function() {
						setTimeout(function() {
							sliderNav.slick('setPosition');
							sliderFor.slick('setPosition');
						}, 100);
					},
					onAfterChange: function() {
						setTimeout(function() {
							sliderNav.slick('setPosition');
							sliderFor.slick('setPosition');
						}, 100);
					}
				});
			} else if (sliderNav.length && sliderNav.hasClass('slick-initialized')) {
				// Обновляем asNavFor, если слайдер уже инициализирован
				sliderNav.slick('setOption', 'asNavFor', '#' + sliderForId, true);
			}
		}

		// Функция переключения табов
		function switchInteriorTab(tab) {
			var tabName = tab.data('tab');
			var allTabs = $('.interior-reviews__tab');
			var allTabContents = $('.interior-reviews__tab-content');

			// Удаляем активный класс со всех табов и контентов
			allTabs.removeClass('active');
			allTabContents.removeClass('active');

			// Добавляем активный класс выбранному табу
			tab.addClass('active');

			// Показываем соответствующий контент
			var targetContent = $('.interior-reviews__tab-content[data-content="' + tabName + '"]');
			if (targetContent.length) {
				targetContent.addClass('active');
				
				// Инициализируем слайдер для этого таба, если еще не инициализирован
				setTimeout(function() {
					initInteriorSliderForTab(targetContent);
					if (interiorCurrentActiveSlider && interiorCurrentActiveSlider.length && interiorCurrentActiveSlider.hasClass('slick-initialized')) {
						setTimeout(function() {
							interiorCurrentActiveSlider.slick('setPosition');
						}, 100);
					}
				}, 50);
			}
		}

		// Инициализация первого слайдера при загрузке
		var firstTabContent = $('.interior-reviews__tab-content.active');
		if (firstTabContent.length) {
			initInteriorSliderForTab(firstTabContent);
		}

		// Обработчик кликов на табы
		$('.interior-reviews__tab').on('click', function() {
			switchInteriorTab($(this));
		});

		// Обработчики навигации
		$('.interior-reviews__nav--prev').on('click', function() {
			if (interiorCurrentActiveSlider && interiorCurrentActiveSlider.length && interiorCurrentActiveSlider.hasClass('slick-initialized')) {
				interiorCurrentActiveSlider.slick('slickPrev');
			}
		});

		$('.interior-reviews__nav--next').on('click', function() {
			if (interiorCurrentActiveSlider && interiorCurrentActiveSlider.length && interiorCurrentActiveSlider.hasClass('slick-initialized')) {
				interiorCurrentActiveSlider.slick('slickNext');
			}
		});

		// Пересчет ширины слайдера при изменении размера окна
		$(window).on('resize', function() {
			if (interiorCurrentActiveSlider && interiorCurrentActiveSlider.length && interiorCurrentActiveSlider.hasClass('slick-initialized')) {
				var windowWidth = $(window).width();
				var tabContent = interiorCurrentActiveSlider.closest('.interior-reviews__tab-content');
				var dotsContainer = tabContent.find('.interior-reviews__dots');
				interiorCurrentActiveSlider.slick('slickSetOption', 'dots', windowWidth < 992, true);
				if (dotsContainer.length && windowWidth < 992) {
					interiorCurrentActiveSlider.slick('slickSetOption', 'appendDots', dotsContainer, true);
				}
				interiorCurrentActiveSlider.slick('setPosition');
			}
		});
	}

	// Portfolio section tabs and card navigation
	if ($('.portfolio').length) {
		// Главные табы категорий
		$('.portfolio__tab').on('click', function() {
			const tab = $(this).data('tab');
			
			$('.portfolio__tab').removeClass('active');
			$(this).addClass('active');
			
			$('.portfolio__tab-content').removeClass('active');
			$(`.portfolio__tab-content[data-content="${tab}"]`).addClass('active');
		});

		// Табы внутри карточек
		$(document).on('click', '.portfolio__card-tab', function() {
			const card = $(this).closest('.portfolio__card');
			const tab = $(this).data('card-tab');
			
			card.find('.portfolio__card-tab').removeClass('active');
			$(this).addClass('active');
			
			card.find('.portfolio__card-tab-content').removeClass('active');
			card.find(`.portfolio__card-tab-content[data-card-content="${tab}"]`).addClass('active');
		});

		// Навигация стрелками внутри карточек
		$(document).on('click', '.portfolio__card-nav-prev', function() {
			const card = $(this).closest('.portfolio__card');
			const tabs = card.find('.portfolio__card-tab');
			const activeTab = card.find('.portfolio__card-tab.active');
			const activeIndex = tabs.index(activeTab);
			
			if (activeIndex > 0) {
				tabs.eq(activeIndex - 1).click();
			} else {
				tabs.last().click();
			}
		});

		$(document).on('click', '.portfolio__card-nav-next', function() {
			const card = $(this).closest('.portfolio__card');
			const tabs = card.find('.portfolio__card-tab');
			const activeTab = card.find('.portfolio__card-tab.active');
			const activeIndex = tabs.index(activeTab);
			
			if (activeIndex < tabs.length - 1) {
				tabs.eq(activeIndex + 1).click();
			} else {
				tabs.first().click();
			}
		});
	}

	// Documents Slider
	if ($('.documents__slider').length) {
		const $slider = $('.documents__slider');
		const $dotsContainer = $('.documents__dots');
		
		$slider.slick({
			slidesToShow: 2,
			slidesToScroll: 2,
			arrows: false,
			dots: true,
			infinite: true,
			speed: 500,
			appendDots: $dotsContainer,
			customPaging: function(slider, i) {
				return '<div class="slick-dot"></div>';
			},
			responsive: [
				{
					breakpoint: 992,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					}
				}
			],
			onInit: function() {
				setTimeout(function() {
					$slider.slick('setPosition');
				}, 100);
			},
			onAfterChange: function() {
				$slider.slick('setPosition');
			}
		});

		$('.documents__nav-prev').on('click', function() {
			$slider.slick('slickPrev');
		});

		$('.documents__nav-next').on('click', function() {
			$slider.slick('slickNext');
		});

		$(window).on('resize', function() {
			$slider.slick('setPosition');
		});
	}

	// FAQ Accordion
	$('.faq__question').on('click', function() {
		const $item = $(this).closest('.faq__item');
		const $answer = $item.find('.faq__answer');
		const $toggle = $item.find('.faq__toggle img');
		
		if ($item.hasClass('faq__item--active')) {
			$item.removeClass('faq__item--active');
			$answer.slideUp(300);
			$toggle.attr('src', 'img/plus-icon.svg');
		} else {
			$('.faq__item').removeClass('faq__item--active');
			$('.faq__answer').slideUp(300);
			$('.faq__toggle img').attr('src', 'img/plus-icon.svg');
			
			$item.addClass('faq__item--active');
			$answer.slideDown(300);
			$toggle.attr('src', 'img/minus-icon.svg');
		}
	});

	// Yandex Map initialization (Contacts section)
	if ($('#map').length) {
		if (window.ymaps && typeof window.ymaps.ready === 'function') {
			window.ymaps.ready(initMapInnovastom);
		} else {
			// Если API подгрузится позже
			var checkYmapsInterval = setInterval(function() {
				if (window.ymaps && typeof window.ymaps.ready === 'function') {
					clearInterval(checkYmapsInterval);
					window.ymaps.ready(initMapInnovastom);
				}
			}, 100);
		}
	}

	function initMapInnovastom() {
		try {
			var centerCoords = [54.777967, 32.017502]; // Смоленск, ул. Нормандия-Неман, 24Б
			var map = new ymaps.Map('map', {
				center: centerCoords,
				zoom: 16
			}, {
				searchControlProvider: 'yandex#search'
			});

			var placemark = new ymaps.Placemark(centerCoords, {}, {
				iconLayout: 'default#image',
				iconImageHref: 'img/pin.svg',
				hideIconOnBalloonOpen: false,
				iconImageSize: [65, 72],
				iconImageOffset: [-32, -72],
				balloonOffset: [0, -72]
			});

			map.controls.remove('searchControl');
			map.behaviors.disable('scrollZoom');
			map.geoObjects.add(placemark);
		} catch (e) {
			// fail silently
		}
	}

});

