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
                backgroundColor: '#556c81',
                color: '#fff'
            }, 'slow', function() {
                $(this).removeAttr('style');
            });
            $(this).removeClass('active');
        });

        var next = $('nav ul li a[href="#' + id +'"][class!="active"]');
        if (document.location.hash !== '#' + id && !instant) {
            next.css('backgroundColor', '#556c81');
            next.css('color', '#fff');
            next.animate({
                backgroundColor: '#0D2E4C',
                color: '#FFC76D'
            }, 'slow');

        } else {
            next.css({
                backgroundColor: '#0D2E4C',
                color: '#FFC76D'
            });
        }
        
        next.addClass('active');
    }

    function highlightSection() {
        var offset = $(window).scrollTop();
        var id = articles[0][1];
        for(var i = 0, l = articles.length; i < l; i++) {
            if (articles[i][0] < offset + 200) {
                id = articles[i][1];
            }
        }
        selectNavigation(id, offset === 0);
    }
    var hash = document.location.hash.substr(1);
    if (hash !== '') {
        _gaq.push(['_trackEvent', hash, 'landed']);
    }
    $('nav ul li a').each(function() {
        $(this).bind('click', function() {
            var hash = document.location.hash.substr(1);
            if (hash !== '') {
                _gaq.push(['_trackEvent', hash, 'clicked']);
            }
        });
    });

    var initSelection = setTimeout(highlightSection, 100);
    $(document).scroll(function() {
        clearTimeout(initSelection);
        highlightSection();
    });
    
    /*
      Mobile, and small screen stuff
    */
    
    if($.mobile) {
        $('body').addClass('mobile');
        
        var $w = $(window),
            width = $w.width();
        
        if(width > 1000) {
            $w.scroll(function(){
                
            });
        }
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