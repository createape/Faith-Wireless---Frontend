$(function () {
  $(".toggle-main-nav").on("click", function (e) {
    e.preventDefault();
    $(".main-nav").toggleClass("collasep");
    $(this).toggleClass("show");
  });
  $(window).resize(function () {
    if (window.matchMedia("(max-width: 1100px)").matches) {
      $(".main-nav").addClass("collasep");
    }
  }).trigger("resize");
});