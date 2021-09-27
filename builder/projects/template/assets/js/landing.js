/*global jQuery */

(function ($) {
    "use strict";

    /* ------------------ BACKGROUND PARALLAX EFFECT ------------------ */

    var s = skrollr.init({
        forceHeight: false
    });

    if (s.isMobile()) {
        s.destroy();
    }

    /* ------------------ TYPED SCRIPT ------------------ */

    if ($(".typed-text").length > 0) {
        $(".typed-text").each(function () {
            var $string = $(this).data("typed-string") ? $(this).data("typed-string").split(",") : [];

            $(this).typed({
                strings: $string,
                typeSpeed: 0,
                loop: true,
            });
        });
    }

    /* ------------------ TYPED SCRIPT ------------------ */
    $(".builder-img").tilt({
        maxTilt: 15,
        perspective: 1400,
        easing: "cubic-bezier(.03,.98,.52,.99)",
        speed: 1200,
        glare: false,
        maxGlare: 0.2,
        scale: 1.04
    });

}(jQuery));