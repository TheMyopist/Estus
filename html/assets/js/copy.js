(function ($) {
    "use strict";

    $("pre.prettyprint").each(function () {

        new ClipboardJS('.btn-clipboard', {
            target: function (trigger) {
                return trigger.nextElementSibling;
            }
        });
    })

}(jQuery));