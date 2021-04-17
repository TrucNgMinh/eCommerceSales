! function($) {
    "use strict";

    var prevScrollpos = window.pageYOffset;
    window.onscroll = function() {
        var currentScrollPos = window.pageYOffset;
        if (prevScrollpos > currentScrollPos) {
            if (currentScrollPos == 0) {
                document.getElementById("topnav").style.top = "0";
            } else {
                document.getElementById("topnav").style.top = "-90px";
            }
        } else {
            document.getElementById("topnav").style.top = "-170px";
        }
        prevScrollpos = currentScrollPos;
    }

    function resize() {
        console.log(resized);
        if ($(window).width() < 514) {
            $('.footable.footable-loaded').addClass('phone');
            $('.footable.footable-loaded').addClass('breakpoint');
            $('.footable.footable-loaded').removeClass('tablet');
            $('.footable.footable-loaded').removeClass('default');
        }

        if ($(window).width() > 514 && $(window).width() < 991) {
            $('.footable.footable-loaded').addClass('tablet');
            $('.footable.footable-loaded').addClass('breakpoint');
            $('.footable.footable-loaded').removeClass('phone');
            $('.footable.footable-loaded').removeClass('default');
        }

        if ($(window).width() > 1550) {
            $('.footable.footable-loaded').addClass('default');
            $('.footable.footable-loaded').removeClass('breakpoint');
            $('.footable.footable-loaded').removeClass('phone');
            $('.footable.footable-loaded').removeClass('tablet');
        }
    }

    $(document).ready(function() {
        $(window).resize(resize);
        resize();
    });

    $(window).trigger("resize");

}(window.jQuery),

function($) {
    "use strict";
}(window.jQuery);