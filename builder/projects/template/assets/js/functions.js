/*global jQuery */
/* Contents
// ------------------------------------------------>
1.  LOADING SCREEN
2.  BACKGROUND INSERT
3.  HEADER AFFIX
4.  COUNTER UP
5.  COUNTDOWN DATE
6.  AJAX MAILCHIMP
7.  AJAX CAMPAIGN MONITOR
8.  AJAX CONTACT FORM
9.  OWL CAROUSEL
10. MAGNIFIC POPUP
11. MAGNIFIC POPUP VIDEO
12. BACK TO TOP
13. PORTFOLIO FLITER
14. SCROLL TO
15. PROGRESS BAR
16. GOOGLE MAP
17. QNATITY OF DEVICES

*/
(function ($) {
    "use strict";

    /* ------------------  LOADING SCREEN ------------------ */

    $(window).on("load", function () {
        $(".page-loader").fadeOut(10000);
        $(".page-loader").remove();
    });

    /* ------------------ LANDING PORTFOLIO HOVER EFFECT ------------------ */

    $('.promo-pages .portfolio-item').on("mouseenter", function () {
        $(this).children('.portfolio-item-box').removeClass('active');
        $(this).siblings().children('.portfolio-item-box').addClass('active');
    });

    $('.promo-pages .portfolio-item').on("mouseleave", function () {
        $(this).children('.portfolio-item-box').removeClass('active');
        $(this).siblings().children('.portfolio-item-box').removeClass('active');
    });

    /*------------------- SWITCHER BOX -----------------------*/
    $('#switcher-options a:first').on("click", function (e) {
        e.preventDefault();
        $('#switcher-nav').toggleClass('active');
        $('.wrapper').addClass('switcher-active');

    });

    $('.switcher-active').on("click", function () {
        $('#switcher-nav').removeClass('active');

    });

    $(document).on('click', function (event) {
        if (!($(event.target).closest("#switcher-nav.active").length)) {
            // Hide .target-div
            $('#switcher-nav').removeClass("active");
            $(".wrapper").removeClass("switcher-active");
        }

    });

    /* ------------------  Color Switcher ------------------ */

    var colorOption = $(".switcher-color ul li");

    colorOption
        .eq(0).css("backgroundColor", "#485cc7").end()
        .eq(1).css("backgroundColor", "#bb8c4b").end()
        .eq(2).css("backgroundColor", "#ffc527").end()
        .eq(3).css("backgroundColor", "#00c389").end()
        .eq(4).css("backgroundColor", "#ff4444").end()
        .eq(5).css("backgroundColor", "#fa6742");

    colorOption.click(function () {

        $("link[href*='theme']").attr("href", $(this).attr("data-value"));
        $(this).addClass('active');
        $(this).siblings().removeClass('active');

    });


    /* ------------------  ToolTIP ------------------ */
    $('[data-toggle="tooltip"]').tooltip();
    /* ------------------  LOADING SCREEN ------------------ */

    $(window).on("load", function () {
        $(".preloader").fadeOut(5000);
        $(".preloader").remove();
    });

    /* ------------------  Background INSERT ------------------ */

    var $bgSection = $(".bg-section");
    var $bgPattern = $(".bg-pattern");
    var $colBg = $(".col-bg");

    $bgSection.each(function () {
        var bgSrc = $(this).children("img").attr("src");
        var bgUrl = 'url(' + bgSrc + ')';
        $(this).parent().css("backgroundImage", bgUrl);
        $(this).parent().addClass("bg-section");
        $(this).remove();
    });

    $bgPattern.each(function () {
        var bgSrc = $(this).children("img").attr("src");
        var bgUrl = 'url(' + bgSrc + ')';
        $(this).parent().css("backgroundImage", bgUrl);
        $(this).parent().addClass("bg-pattern");
        $(this).remove();
    });

    $colBg.each(function () {
        var bgSrc = $(this).children("img").attr("src");
        var bgUrl = 'url(' + bgSrc + ')';
        $(this).parent().css("backgroundImage", bgUrl);
        $(this).parent().addClass("col-bg");
        $(this).remove();
    });

    /* ------------------ HEADER AFFIX ------------------ */

    //    var $navAffix = $(".header-fixed .navbar-fixed-top");
    //    $navAffix.affix({
    //        offset: {
    //            top: 50
    //        }
    //    });

    /* ------------------  COUNTER UP ------------------ */

    if ($(".counting").length > 0) {
        $(".counting").counterUp({
            delay: 10,
            time: 1000
        });
    }
    /* ------------------ COUNTDOWN DATE ------------------ */

    $(".countdown").each(function () {
        var $countDown = $(this),
            countDate = $countDown.data("count-date"),
            newDate = new Date(countDate);
        $countDown.countdown({
            until: newDate,
            format: "dHMS" //"MMMM Do , h:mm:ss a"
        });
    });

    /* ------------------  AJAX MAILCHIMP ------------------ */

    $('.mailchimp').each(function () {

        var closestwrap = $(this).closest('.form-subscription').find('.subscribe-alert');


        $(this).ajaxChimp({
            url: "http://wplly.us5.list-manage.com/subscribe/post?u=91b69df995c1c90e1de2f6497&id=aa0f2ab5fa", //Replace with your own mailchimp Campaigns URL.
            callback: chimpCallback

        });

        function chimpCallback(resp) {
            if (resp.result === 'success') {
                closestwrap.html('<div class="alert alert-success">' + resp.msg + '</div>').fadeIn(1000);

            } else if (resp.result === 'error') {
                closestwrap.html('<div class="alert alert-danger">' + resp.msg + '</div>').fadeIn(1000);
            }
        }

    });

    /* ------------------  AJAX CAMPAIGN MONITOR  ------------------ */

    $('#campaignmonitor').submit(function (e) {
        e.preventDefault();
        $.getJSON(
            this.action + "?callback=?",
            $(this).serialize(),
            function (data) {
                if (data.Status === 400) {
                    alert("Error: " + data.Message);
                } else { // 200
                    alert("Success: " + data.Message);
                }
            });
    });

    /* ------------------  AJAX CONTACT FORM  ------------------ */

    var contactForm = $(".contactForm");

    contactForm.each(function () {

        var contactResult = $(this).closest('.container').find('.contact-result');

        $(this).validate({

            debug: false,
            submitHandler: function (contactForm) {
                $(contactResult, contactForm).html('Please Wait...');
                $.ajax({
                    type: "POST",
                    url: "assets/php/contact.php",
                    data: $(contactForm).serialize(),
                    timeout: 20000,
                    success: function (msg) {
                        $(contactResult, contactForm).html('<div class="alert alert-success" role="alert"><strong>Thank you. We will contact you shortly.</strong></div>').delay(3000).fadeOut(2000);
                    },
                    error: $('.thanks').show()
                });
                return false;
            }
        });

    });

    /* ------------------ OWL CAROUSEL ------------------ */
    var $deviceSlide = $(".device-carousel");

    $(".carousel").each(function () {
        var $Carousel = $(this);
        $Carousel.owlCarousel({
            loop: $Carousel.data('loop'),
            autoplay: $Carousel.data("autoplay"),
            margin: $Carousel.data('space'),
            nav: $Carousel.data('nav'),
            dots: $Carousel.data('dots'),
            center: $Carousel.data('center'),
            dotsSpeed: $Carousel.data('speed'),
            responsive: {
                0: {
                    items: 1,
                },
                600: {
                    items: $Carousel.data('slide-rs'),
                },
                1000: {
                    items: $Carousel.data('slide'),
                }
            }
        });
    });

    $deviceSlide.owlCarousel({
        thumbs: true,
        thumbsPrerendered: true,
        loop: true,
        margin: 0,
        autoplay: false,
        nav: false,
        dots: false,
        dotsSpeed: 200,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    });

    /* ------------------ MAGNIFIC POPUP ------------------ */

    var $imgPopup = $(".img-popup");
    $imgPopup.magnificPopup({
        type: "image"
    });
    $('.img-gallery-item').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true
        }
    });

    /* ------------------  MAGNIFIC POPUP VIDEO ------------------ */

    $('.popup-video,.popup-gmaps').magnificPopup({
        disableOn: 700,
        mainClass: 'mfp-fade',
        removalDelay: 0,
        preloader: false,
        fixedContentPos: false,
        type: 'iframe',
        iframe: {
            markup: '<div class="mfp-iframe-scaler">' +
                '<div class="mfp-close"></div>' +
                '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
                '</div>',
            patterns: {
                youtube: {
                    index: 'youtube.com/',
                    id: 'v=',
                    src: '//www.youtube.com/embed/%id%?autoplay=1'
                }
            },
            srcAction: 'iframe_src',
        }
    });

    /* ------------------  BACK TO TOP ------------------ */

    var backTop = $('#back-to-top');

    if (backTop.length) {
        var scrollTrigger = 200, // px
            backToTop = function () {
                var scrollTop = $(window).scrollTop();
                if (scrollTop > scrollTrigger) {
                    backTop.addClass('show');
                } else {
                    backTop.removeClass('show');
                }
            };
        backToTop();
        $(window).on('scroll', function () {
            backToTop();
        });
        backTop.on('click', function (e) {
            e.preventDefault();
            $('html,body').animate({
                scrollTop: 0
            }, 700);
        });
    }

    /* ------------------ PORTFOLIO FLITER ------------------ */

    var $portfolioFilter = $(".portfolio-filter"),
        portfolioLength = $portfolioFilter.length,
        protfolioFinder = $portfolioFilter.find("a"),
        $portfolioAll = $("#portfolio-all");

    // init Isotope For portfolio
    protfolioFinder.on("click", function (e) {
        e.preventDefault();
        $portfolioFilter.find("a.active-filter").removeClass("active-filter");
        $(this).addClass("active-filter");
    });
    if (portfolioLength > 0) {
        $portfolioAll.imagesLoaded().progress(function () {
            $portfolioAll.isotope({
                filter: "*",
                animationOptions: {
                    duration: 750,
                    itemSelector: ".portfolio-item",
                    easing: "linear",
                    queue: false,
                }
            });
        });
    }
    protfolioFinder.on("click", function (e) {
        e.preventDefault();
        var $selector = $(this).attr("data-filter");
        $portfolioAll.imagesLoaded().progress(function () {
            $portfolioAll.isotope({
                filter: $selector,
                animationOptions: {
                    duration: 750,
                    itemSelector: ".portfolio-item",
                    easing: "linear",
                    queue: false,
                }
            });
            return false;
        });
    });

    /* ------------------  SCROLL TO ------------------ */

    var aScroll = $('a[data-scroll="scrollTo"]');
    aScroll.on('click', function (event) {
        var target = $($(this).attr('href'));
        if (target.length) {
            event.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top
            }, 1000);
            if ($(this).hasClass("menu-item")) {
                $(this).parent().addClass("active");
                $(this).parent().siblings().removeClass("active");
            }
        }
    });

    /* ------------------  SCROLL TO ------------------ */

    var $toggler = $('.navbar-toggler');

    $toggler.on('click', function () {
        $(this).toggleClass('toggler-active');
    })

    /* ------------------ PROGRESS BAR ------------------ */

    if ($(".skills").length > 0) {
        $(window).scroll(function () {
            var skillsTop = $(".skills").offset().top - 50,
                skillsHight = $(this).outerHeight(),
                wScroll = $(window).scrollTop();
            if (wScroll > skillsTop - 1 && wScroll < skillsTop + skillsHight - 1) {
                $(".progress-bar").each(function () {
                    $(this).width($(this).attr('aria-valuenow') + '%');
                });
            }
        });
    }

    if ($(".skills-scroll").length > 0) {
        $(".progress-bar").each(function () {
            $(this).width($(this).attr('aria-valuenow') + '%');
        });
    }

    /* ------------------ GOOGLE MAP ------------------ */

    $(".googleMap").each(function () {
        var $gmap = $(this);
        $gmap.gMap({
            address: $gmap.data('map-address'),
            zoom: $gmap.data('map-zoom'),
            maptype: $gmap.data('map-type'),
            markers: [{
                address: $gmap.data('map-address'),
                maptype: $gmap.data('map-type'),
                html: $gmap.data('map-info'),
                icon: {
                    image: $gmap.data('map-marker'),
                    iconsize: [41, 54],
                    iconanchor: [41, 54]
                }
            }]
        });

    });

    /* ------------------ QNATITY OF DEVICES ------------------ */

    $('.add-num').on('click', function () {
        var $qty = $("#pices");
        var currentVal = parseInt($qty.val());
        if (!isNaN(currentVal)) {
            $qty.val(currentVal + 1);
        }
    });

    $('.minus-num').on('click', function () {
        var $qty = $("#pices");
        var currentVal = parseInt($qty.val());
        if (!isNaN(currentVal) && currentVal > 0) {
            $qty.val(currentVal - 1);
        }
        if (!isNaN(currentVal) && currentVal <= 1) {
            $qty.val(currentVal);
        }
    });

    /* ------------------ Date Picker  ------------------ */
    var cnt = 0;
    if ($('.type-cal')) {
        $('.type-cal').datepicker({
            autohide: true,
            format: 'yyyy-mm-dd',
            yearFirst: true,
            monthsShort: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
        }).on('show.datepicker', function () {
            cnt = 1;
            //console.log(cnt)
        }).on('hide.datepicker', function () {
            cnt = 0;
            // console.log(cnt)
        });
    }
    $('.show').on('click', function (e) {
        var $t = $(this).prev();
        console.log(cnt);
        if (cnt === 1) {
            e.stopPropagation();
            $t.datepicker('hide');
        } else if (cnt === 0) {
            e.stopPropagation();
            $t.datepicker('show');
        }
    });

    // Input number increment and decrement
    window.inputNumber = function (el) {

        var min = el.attr('min') || false;
        var max = el.attr('max') || false;

        var els = {};

        els.dec = el.prev();
        els.inc = el.next();

        el.each(function () {
            init($(this));
        });

        function init(el) {

            els.dec.on('click', decrement);
            els.inc.on('click', increment);

            function decrement() {
                var value = el[0].value;
                value--;
                if (!min || value >= min) {
                    el[0].value = value;
                }
            }

            function increment() {
                var value = el[0].value;
                value++;
                if (!max || value <= max) {
                    el[0].value = value++;
                }
            }
        }
    };

    inputNumber($('.input--number'));


    /* ------------------  PARALLAX EFFECT ------------------ */

    siteFooter();
    $(window).resize(function () {
        siteFooter();
    });

    function siteFooter() {
        var siteContent = $('#wrapperParallax');

        var siteFooter = $('#footerParallax');
        var siteFooterHeight = siteFooter.height();

        siteContent.css({
            "margin-bottom": siteFooterHeight
        });
    };

}(jQuery));