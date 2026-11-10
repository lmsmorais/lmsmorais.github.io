(function ($) {
  "use strict";

  function resizeSubpages() {
    var $currentPage = $(".pt-page-current");

    if ($currentPage.length) {
      $(".subpages").height($currentPage.height() + 50);
    }
  }

  function hideMobileMenu() {
    if ($(window).width() < 1024) {
      $("#site_header").addClass("mobile-menu-hide");
    }
  }

  $(function () {
    $(".menu-toggle").on("click", function (event) {
      event.preventDefault();
      var $header = $("#site_header");
      var isExpanded = $header.hasClass("mobile-menu-hide");
      $header.toggleClass("mobile-menu-hide");
      $(this).attr({
        "aria-expanded": isExpanded,
        "aria-label": isExpanded ? "Fechar menu" : "Abrir menu"
      });
    });

    $(".site-main-menu").on("click", "a", function () {
      hideMobileMenu();
      $(".menu-toggle").attr({
        "aria-expanded": "false",
        "aria-label": "Abrir menu"
      });
    });

    $(".text-rotation").owlCarousel({
      loop: true,
      dots: false,
      nav: false,
      margin: 0,
      items: 1,
      autoplay: true,
      autoplayHoverPause: false,
      autoplayTimeout: 3800,
      animateOut: "zoomOut",
      animateIn: "zoomIn"
    });

    $(window)
      .on("load", function () {
        $(".preloader").fadeOut("slow");
        PageTransitions.init({ menu: "ul.site-main-menu" });
        resizeSubpages();
      })
      .on("resize", function () {
        hideMobileMenu();
        resizeSubpages();
      })
      .on("scroll", function () {
        $(".header").toggleClass("sticked", $(window).scrollTop() >= 20);
      });
  });
})(jQuery);
