$(document).ready(function() {
    var articles = $.map($('[id]'), function(el) {
        return {
            top: $(el).offset().top,
            height: $(el).height(),
            id: el.id
        };
    });

    $('nav > ul > li > ul').each(function() {
        $(this).hide();
    });

    var initSelection = setTimeout(function() {
        highlightSection(true);
    }, 10);

    $(document).scroll(function() {
        clearTimeout(initSelection);
        highlightSection(false);
    });

    function highlightSection(instant) {
        var offset = $(window).scrollTop() + 200;
        var activeElements = [];
        for(var i = 0, l = articles.length; i < l; i++) {
            var a = articles[i];
            if (offset > a.top && offset <= a.top + a.height + 30) {
                activeElements.push(a.id);
            }
        }

        for(var i = 0, l = articles.length; i < l; i++) {
            var a = articles[i];
            var active = $.inArray(a.id, activeElements) !== -1;
            var el;
            if (a.id.indexOf('.') !== -1) {
                el = $('nav a[href="#' + a.id + '"]');

            } else {
                var li = $('nav a[href="#' + a.id + '"]').parent();
                var ul = li.next('ul');
                el = li.parent();

                if (active) {
                    if (!el.hasClass('active')) {
                        ul.slideDown(instant ? 0 : 500);
                    }
                    ul.addClass('active');

                } else {
                    if (el.hasClass('active')) {
                        ul.slideUp(instant ? 0 : 500);
                    }
                    ul.removeClass('active');
                }
            }
            highlightLink(el, active);
        }
    }

    function highlightLink(el, mode) {
        if (mode) {
            if (!el.hasClass('active')) {
                el.addClass('active');
            }

        } else {
            if (el.hasClass('active')) {
                el.removeClass('active');
            }
        }
    }

    /*
    $('nav > ul > li').each(function(i) {
        var ul = $(this).find('ul');
        var timer = null;
        $(this).hover(function() {
            timer = setTimeout(function() {
                if (!ul.hasClass('active')) {
                    ul.slideDown(500);
                }
            }, 350);

        }, function() {
            clearTimeout(timer);
            if (!ul.hasClass('active')) {
                ul.slideUp(500);
            }
        });
    });
    */
    if ($.mobile) {
        $('body').addClass('mobile');
    }
    prettyPrint();
});

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-20768522-1']);
_gaq.push(['_trackPageview']);
(function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

