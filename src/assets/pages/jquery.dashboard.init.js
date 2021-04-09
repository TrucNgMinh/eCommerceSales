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
            document.getElementById("topnav").style.top = "-190px";
        }
        prevScrollpos = currentScrollPos;
    }

}(window.jQuery),

function($) {
    "use strict";
}(window.jQuery);