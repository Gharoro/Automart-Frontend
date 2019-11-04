(function ($) {
    'use strict';

    $(document).on('ready', function () {
        // Nice Select
        $('select').niceSelect();
        // -----------------------------
        //  Client Slider
        // -----------------------------
        $('.category-slider').slick({
            slidesToShow: 8,
            infinite: true,
            arrows: false,
            autoplay: false,
            autoplaySpeed: 2000
        });
        // -----------------------------
        //  Select Box
        // -----------------------------
        // $('.select-box').selectbox();
        // -----------------------------
        //  Video Replace
        // -----------------------------
        $('.video-box img').click(function () {
            var video = '<iframe allowfullscreen src="' + $(this).attr('data-video') + '"></iframe>';
            $(this).replaceWith(video);
        });
        // -----------------------------
        //  Coupon type Active switch
        // -----------------------------
        $('.coupon-types li').click(function () {
            $('.coupon-types li').not(this).removeClass('active');
            $(this).addClass('active');
        });
        // -----------------------------
        // Datepicker Init
        // -----------------------------
        $('.input-group.date').datepicker({
            format: 'dd/mm/yy'
        });
        // -----------------------------
        // Datepicker Init
        // -----------------------------
        $('#top').click(function () {
            $('html, body').animate({ scrollTop: 0 }, 'slow');
            return false;
        });
        // -----------------------------
        // Button Active Toggle
        // -----------------------------
        $('.btn-group > .btn').click(function () {
            $(this).find('i').toggleClass('btn-active');
        });
        // -----------------------------
        // Coupon Type Select
        // -----------------------------
        $('#online-code').click(function () {
            $('.code-input').fadeIn(500);
        });
        $('#store-coupon, #online-sale').click(function () {
            $('.code-input').fadeOut(500);
        });
        /***ON-LOAD***/
        jQuery(window).on('load', function () {

        });

    });

})(jQuery);
$(document).ready(function () {
    $('select:not(.ignore)').niceSelect();
});


$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})


