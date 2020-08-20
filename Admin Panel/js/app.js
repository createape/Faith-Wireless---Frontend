$(function () {
  $(".toggle-main-nav").on("click", function (e) {
    e.preventDefault();
    $(".main-nav").toggleClass("collasep");
    $(this).toggleClass("show");
  });
});