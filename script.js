"use strict";
$(document).ready(function () {
  var inittrue = true;

  $(".navigation_trigger").on("click", function () {
    $(".navigation_side").toggleClass("open");
    //$("header.landing, main, footer").toggleClass("open");
  });

  $(".navigation_top .navigation li").on("click", function (event) {
    $(".navigation_top .navigation li").not(this).removeClass("active");
    $(this).addClass("active");
  });
  $(".navigation_side .navigation li").on("click", function(e){
    setTimeout(function(){
      $(".navigation_side").removeClass("open");
    }, 80)
  })
  $(".corner_button, .corner_exit").on("click", function () {
    if (inittrue) {
      $(".navigation_top, .landing, main, footer").fadeToggle(0);
      $(".corner_codepen").fadeToggle();
      //  $(".blurrer").removeClass("toggleblur");
      inittrue = false;
    } else {
      $(".navigation_top, .landing, main, footer").fadeToggle(0);
      $(".corner_codepen").fadeToggle();
      //  $(".blurrer").addClass("toggleblur");
      inittrue = true;
    };
  });


  $(window).on("scroll", function (event) {
    fader();
  });


  function fader() {
    if (document.body.scrollTop > 1 || document.documentElement.scrollTop > 1) {
      $(".navigation_wrapper").css("height", "60px");
      $(".navigation_trigger").css("top", "0px");
      $(".navigation_top").css("padding-top", "0px");
      $(".main-logo").css({
        "transform": "scale(0.5)",
        "left": "-35px",
        "margin-top": "-30px"
      });
    } else {
      $(".navigation_wrapper").css("height", "100px");
      $(".navigation_trigger").css("top", "20px");
      $(".navigation_top").css("padding-top", "35px");
      $(".main-logo").css({
        "transform": "scale(1)",
        "left": "-15px",
        "margin-top": "-15px"
      });
    };
    if (document.body.scrollTop > 60 || document.documentElement.scrollTop > 60) {
      //document.querySelector(".blurrer").style.position = "absolute";
    } else {
      document.querySelector(".blurrer").style.position = "fixed";
    }
  }



})