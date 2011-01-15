$(document).ready(function() {
    var articles = [];
    $('[id]').each(function() {
        articles.push([$(this).offset().top, this.id]);
    });

    var section = '';
    function selectNavigation(id, instant) {
        if (id === section) {
            return false;
        }
        section = id;
        var current = $('nav ul li a.active');
        current.each(function() {
            $(this).stop().animate({
                'backgroundColor': '#556c81',
                'color': '#ffffff'

            }, 'slow', function() {
                $(this).removeAttr('style');
            });
            $(this).removeClass('active');
        });

        var next = $('nav ul li a[href="#' + id +'"][class!="active"]');
        if (document.location.hash !== '#' + id && !instant) {
            next.css('backgroundColor', '#556c81');
            next.css('color', '#ffffff');
            next.animate({
                'backgroundColor': '#0D2E4C',
                'color': '#FFC76D'

            }, 'slow');

        } else {
            next.css('backgroundColor', '#0D2E4C');
            next.css('color', '#FFC76D');
        }
        next.addClass('active');
    }

    function highlightSection() {
        var offset = $(window).scrollTop();
        var id = articles[0][1];
        for(var i = 0, l = articles.length; i < l; i++) {
            if (articles[i][0] < offset + 10) {
                id = articles[i][1];
            }
        }
        selectNavigation(id, offset === 0);
    }

    var initSelection = setTimeout(highlightSection, 50);
    $(document).scroll(function() {
        clearTimeout(initSelection);
        highlightSection();
    });
    prettyPrint();
});

