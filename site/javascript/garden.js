$(document).ready(function() {
    var instant = true,
        navHeight = $('nav > ul').height();

    function checkSize() {
        var full = $(window).height() >= navHeight;
        $('li > ul').each(function() {
            var ul = $(this);
            if (!ul.hasClass('active')) {
                $(this).toggle(full);
            }
        });
    }
    checkSize();
    $(window).resize(checkSize);

    var articles = $.map($('body [id]'), function(el) {
        return {
            top: $(el).offset().top,
            height: $(el).height(),
            id: el.id
        };
    });

    var initSelection = setTimeout(highlightSection, 50);
    $(document).scroll(function() {
        clearTimeout(initSelection);
        highlightSection();
        instant = false;
    });

    function highlightSection() {
        var offset = $(window).scrollTop() + 50;
        var activeElements = [];
        for(var i = 0, l = articles.length; i < l; i++) {
            var a = articles[i];
            if (offset > a.top && offset <= a.top + a.height + 20) {
                activeElements.push(a.id);
            }
        }

        for(var i = 0, l = articles.length; i < l; i++) {
            var a = articles[i];
            var active = $.inArray(a.id, activeElements) !== -1;
            var el;
            if (a.id.indexOf('.') !== -1) {
                el = $('nav li > a[href="#' + a.id + '"]');

            } else {
                var li = $('nav h1 a[href="#' + a.id + '"]').parent();
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
            if (active && !el.hasClass('active')) {
                el.addClass('active');
            } else if (!active && el.hasClass('active')) {
                el.removeClass('active');
            }
        }
    }

    $('nav > ul > li h1').each(function(i) {
        var ul = $(this).parent().find('ul');
        $(this).click(function() {
            if (!ul.hasClass('active')) {
                $('nav > ul > li > ul').each(function() {
                    if (!$(this).hasClass('active') && this !== ul[0]) {
                        $(this).hide();
                    }
                });
                ul.slideToggle(100);
            }
        });
    });
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

