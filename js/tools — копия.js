jQuery(function($){


    var handlers = [
        team,
        services,
        sliderSlick,
        tabs,
        map,
        menu,
        masking,
        inputs,
        forms,
        pagescroll,
        accordion,
        nav,
        cases
    ];

    $.each(handlers, function(i, handler){
        try {
            handler.call();
        } catch (e) {
            console.log('Error! ' + e);
        }
    });

    function isMobile() {
        return window.matchMedia('(max-width: 1100px)').matches;
    }

    function cases() {
        $('.casesBlock .slider .items .item .itemImage .big, .casesBlock .slider .items .item .btnZoom')
            .on('click', function(e) {
                e.preventDefault();

                var items = [];

                $(this).closest('.item').data('images').split(',').forEach(function(item) {
                    items.push({src: item});
                })

                $.fancybox.open(items);
            })
    }

    function nav() {
        $('header .contactInfo .toMap a')
            .on('click', function(e) {
                e.preventDefault();

                if(isMobile()) {
                    $('html,body').animate({
                        scrollTop: $('.contactBlock').offset().top
                    })
                } else {
                    $.fn.fullpage.moveTo(9);
                }
            });

        $('.btnCall')
            .on('click', function(e) {
                e.preventDefault();

                if(isMobile()) {
                    $('html,body').animate({
                        scrollTop: $('.orderBlock').offset().top
                    })
                } else {
                    $.fn.fullpage.moveTo(8);
                }
            })

        $('.menu li a')
            .on('click', function(e) {
                if(isMobile()) {
                    e.preventDefault();

                    $('html,body').animate({
                        scrollTop: $('#wrapper > section').eq($('.menu li a').index(this)).offset().top
                    })
                }
            })
    }

    function accordion() {
        $('.helpBlock .tabsBlock .tabsContent .tab .title')
            .on('click', function() {
                if(document.body.offsetWidth < 1100) {
                    if($(this).toggleClass('open').hasClass('open')) {
                        $(this).siblings('.text').velocity('slideDown');
                    } else {
                        $(this).siblings('.text').velocity('slideUp');
                    }
                }
            })
    }

    function pagescroll() {
        var $body = $('body'),
            $btns = $('.contactInfo, .btnCall');

        var anchors = [];

        $('.menu ul li').each(function() {
            anchors.push($(this).data('menuanchor'));
        })


        var screenScroll = false;

        function setScreenScroll() {
            if(screenScroll) return;

            $('#wrapper').fullpage({
                sectionSelector: 'section:not(.teamBlockMobile)',
                verticalCentered: false,
                navigation: false,
                menu: '.menu ul',
                anchors: anchors,
                normalScrollElements: '[data-simplebar]',
                onLeave: function(index, nextIndex, direction){
                    switch(nextIndex) {
                        case 2:
                        case 4:
                        case 6:
                        case 8:
                            $body.addClass('white');
                            break;

                        default:
                            $body.removeClass('white');
                            break;
                    }

                    switch(nextIndex) {
                        case 1:
                            $('.navigation .up').addClass('notactive');
                            $('.navigation .down').removeClass('notactive')
                            break;

                        case 9:
                            $('.navigation .up').removeClass('notactive');
                            $('.navigation .down').addClass('notactive');
                            break;

                        default:
                            $('.navigation .up').removeClass('notactive');
                            $('.navigation .down').removeClass('notactive');
                            break;
                    }

                    if(nextIndex == 9) {
                        $btns.velocity('fadeOut');
                    } else if(index == 9) {
                        $btns.velocity('fadeIn');
                    }
                },
                afterLoad: function(anchorLink, index){

                }
            });

            screenScroll = true;
        }

        if(document.body.offsetWidth > 1100) {
            setScreenScroll();
        }

        $(window).on('ready load resize', function() {
            if(document.body.offsetWidth < 1100) {
                if(screenScroll) {
                    $.fn.fullpage.destroy('all');
                    screenScroll = false;
                }
            } else {
                setScreenScroll();
            }
        });


        $('.navigation .up')
            .on('click', function(e) {
                e.preventDefault();
                $.fn.fullpage.moveSectionUp();
            });

        $('.navigation .down')
            .on('click', function(e) {
                e.preventDefault();
                $.fn.fullpage.moveSectionDown();
            });
    }

    function team() {
        var mapItems = $('.team map area'),
            images = $('.team > img'),
            descriptions = $('.teamDescription'),
            popups = $('.teamPopup');

        mapItems
            .on('mouseover', function() {
                images.eq(mapItems.index(this)).addClass('hover');
                descriptions.eq(mapItems.index(this)).addClass('hover');
            })
            .on('mouseleave', function() {
                images.eq(mapItems.index(this)).removeClass('hover');
                descriptions.eq(mapItems.index(this)).removeClass('hover');
            })
            .on('click', function(e) {
                e.preventDefault();

                var $targetImage = images.eq(mapItems.index(this)),
                    $targetPopup = popups.eq(mapItems.index(this));

                images.not($targetImage).velocity('fadeOut', {
                    complete: function() {
                        $('.team').addClass('open');
                        $targetImage.addClass('open');
                        $targetPopup.addClass('open');
                        descriptions.removeClass('hover');
                        images.removeClass('hover');

                        $targetPopup.css({
                            display: 'block',
                            transform: 'translateY(100%)'
                        }).velocity({
                            translateY: [0, '100%']
                        });
                    }
                });


            })

        $('.teamPopup .btnClose').not('.teamBlockMobile .btnClose')
            .on('click', function(e) {
                e.preventDefault();

                $('.team').removeClass('open');
                images.removeClass('open');
                popups.filter('.open').velocity({
                    translateY: ['100%', 0],
                    display: 'none'
                }).removeClass('open');

                images.velocity('fadeIn');
            });

        $('.teamBlockMobile .teamSlider .item').find('> img, .teamDescription').on('click', function() {
            var $popup = $(this).closest('.item').find('.teamPopup');

            $popup.css({
                display: 'block',
                transform: 'translateY(100%)'
            }).velocity({
                translateY: [0, '100%']
            });

            $popup.closest('.item').css('height', $popup.outerHeight());

            $('.teamBlockMobile .team').addClass('open');
        })

        $('.teamBlockMobile .teamPopup .btnClose')
            .on('click', function(e) {
                e.preventDefault();

                $(this).closest('.teamPopup').velocity({
                    translateY: ['100%', 0]
                }, function() {
                    $(this).hide();
                }).removeClass('open');

                $(this).closest('.item').css('height', 472);
                $('.teamBlockMobile .team').removeClass('open');
            });
    }

    function services() {
        $('.serviceBlock .items .item .title').on('click', function() {
            if($(this).closest('.item').toggleClass('open').hasClass('open')) {
                $(this).siblings('p, .btn').velocity('slideDown');
            } else {
                $(this).siblings('p, .btn').velocity('slideUp');
            }


        })
    }

    function sliderSlick() {
        var $total = $('.casesBlock .slider .count .amount'),
            $current = $('.casesBlock .slider .count .active');

        $total.text($('.casesBlock .slider .item').length);

        var $cases = $('.slider .items')
            .on('beforeChange', function(e, slick, current, next) {
                $current.text(next + 1);
            })
            .slick({
                autoplay: false,
                autoplaySpeed: 3000,
                dots: false,
                arrows: true,
                infinite: true,
                speed: 1000,
                slidesToShow: 1
            });

        $('.casesBlock .slider .bottomNav .slick-prev')
            .on('click', function(e) {
                e.preventDefault();

                $cases.slick('slickPrev');
            });

        $('.casesBlock .slider .bottomNav .slick-next')
            .on('click', function(e) {
                e.preventDefault();

                $cases.slick('slickNext');
            });

        $('.teamSlider')
            .slick({
                autoplay: false,
                autoplaySpeed: 3000,
                dots: false,
                arrows: true,
                infinite: true,
                speed: 1000,
                slidesToShow: 1
            });
    }

    function tabs($ctx) {
        if(typeof $ctx == "undefined") {
            $ctx = $('body');
        }

        $('.tabsBlock', $ctx).each(function(){
            var $tabs = $('.tabs .tab', this);
            var $tabsContent = $('.tabsContent .tab', this);

            $tabs
                .removeClass('active')
                .first()
                .addClass('active');

            $tabsContent
                .removeClass('active')
                .first()
                .addClass('active');

            $tabs.find('a').on('click', function(e) {
                e.preventDefault();
            })

            $tabs.on('click', function(e) {
                e.preventDefault();

                if($(this).hasClass('active')) return;

                $tabs.removeClass('active');
                $(this).addClass('active');

                $tabsContent.removeClass('active');
                var $tabContent = $tabsContent.eq($tabs.index(this));
                $tabContent.addClass('active');

            });
        });
    }

    function map() {
        var $mapBlock = $('.map');
        if($mapBlock.length) {
            new Scheduler(function() {
                var map = new MMap(),
                    sch = this;

                map.show($mapBlock);


                map.setPin({
                    image: "images/pin.png",
                    size: { w: 90, h: 90 },
                    point: { x: 45, y: 45 },
                    position: { x: 0, y: 0 }
                });

                this.add($mapBlock.data('address'));

                this.onFinish = function() {
                    for(var i = 0; i < this.results.length; i++) {
                        var coords = this.results[i];

                        map.addPoint(coords, $mapBlock.data('address'));
                    }
                }

                this.run();
            });
        }
    }

    function forms() {
        function setMailHandler(formSelector, formLink) {
            var $form = $(formSelector);

            $form.on('submit', function (e) {
                e.preventDefault();

                $form.find('input, textarea').removeClass('error');

                var valid = true;

                $form.find('input,textarea').each(function() {
                    var $this = $(this);

                    switch($this.attr('name')) {
                        case 'email':

                        case 'phone':

                        case 'name':
                            if(!$this.val()) {
                                $this.addClass('error');
                                valid = false;
                            }
                            break;

                        default:
                            break;
                    }
                });

                if(!valid) return false;

                var $btn = $('button', $form);
                $btn.prop('disabled', true);

                $.post(formLink,
                    document.location.search.substr(1) + '&' + $form.serialize(),
                    function (res) {
                        switch (res.status) {
                            case 'wrong':
                                $.each(res.fields, function (id, val) {
                                    $form.find('[name=' + val + ']').addClass('error');
                                });

                                $btn.prop('disabled', false);
                                break;

                            case 'error':
                                $btn.prop('disabled', false);
                                break;

                            default:
                                $form[0].reset();
                                $btn.prop('disabled', false);
                        }
                    },
                    'json'
                );

                return false;
            });
        }
        $('form').each(function(){
            setMailHandler(this, 'mail/index.php');
        })
    }


    function masking() {
        $('input[name=phone]').inputmask({ mask: '+7 (999) 999-99-99', showMaskOnHover: false});
    }

    function inputs() {
        $('input').on('keypress change', function(){
            var $t = $(this);

            if($t.val().length) {
                $t.parent('.input').addClass('filled');
            } else {
                $t.parent('.input').removeClass('filled');
            }
        })
    }

    function menu() {
        $('.hamburger')
            .on('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
                $('.menuMobile').toggleClass('open')
                $('.hamburger').toggleClass('is-active');
            })

        $('body')
            .on('click', function(e) {

                $('.menuMobile').removeClass('open');
                $('.hamburger').removeClass('is-active');
            })
    }


});