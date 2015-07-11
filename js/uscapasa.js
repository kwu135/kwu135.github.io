$(document).ready(function () {
    $(".blackOverlay").show();
    if ($("#main_navbar").offset().top > 50) {
        $("#main_navbar").addClass("top-nav-collapse");
        $("#main_navbar").addClass("nav_shadow");
        $("#brandWhite").hide();
        $("#brandColor").show();
    } else if ($("#main_navbar").offset().top <= 50) {
        $("#main_navbar").removeClass("top-nav-collapse");
        $("#main_navbar").removeClass("nav_shadow");
        $("#brandWhite").show();
        $("#brandColor").hide();
    } else {
        $("#brandWhite").hide();
    }
    checkSize();

    $(window).resize(checkSize);
});

// jQuery to collapse the navbar on scroll
$(window).scroll(function() {
    if ($("#main_navbar").offset().top > 50) {
        $("#main_navbar").addClass("top-nav-collapse");
        $("#main_navbar").addClass("nav_shadow");
        $("#brandWhite").hide();
        $("#brandColor").show();
    } else {
        $("#main_navbar").removeClass("top-nav-collapse");
        $("#main_navbar").removeClass("nav_shadow");
        $("#brandWhite").show();
        $("#brandColor").hide();
    }
});

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});

function checkSize() {
    if ($("#dummyDiv").css("float") == "none") {
        $("#navlr").removeClass("navbar-right");
        $("#navlr").addClass("navbar-left");
        $("#navlr").addClass("pull-right");
    } else {
        $("#navlr").removeClass("navbar-left");
        $("#navlr").addClass("navbar-right");
        $("#navlr").removeClass("pull-right");
    }
}