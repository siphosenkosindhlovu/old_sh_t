"use strict";
$(document).ready(function () {
  var inittrue = true;
  var profile = document.querySelector("#pp").src;
  console.log(profile);
  $(".navigation_trigger").on("click", function () {
    $(".navigation_top").toggleClass("open");
    $(".contact_chip").fadeToggle("fast");
  });

  $(".navigation_top .navigation li").on("click", function (event) {
  //  $(".navigation_top .navigation li").not(this).removeClass("active");
    //$(this).addClass("active");
  });

  $(".navigation_top .navigation li").on("click", function(e){
    setTimeout(function(){
      $(".navigation_top").removeClass("open");

      $(".contact_chip").fadeToggle("fast");
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
   // fader();
  });


  function fader() {
    if (document.body.scrollTop > 1 || document.documentElement.scrollTop > 1) {
      $(".navigation_wrapper").css("height", "60px");
     // $(".navigation_trigger").css("top", "0px");
     // $(".navigation_top").css("padding-top", "0px");
    } else {
     // $(".navigation_wrapper").css("height", "100px");
      //$(".navigation_trigger").css("top", "20px");
      //$(".navigation_top").css("padding-top", "35px");

    };
    if (document.body.scrollTop > 60 || document.documentElement.scrollTop > 60) {
      //document.querySelector(".blurrer").style.position = "absolute";
    } else {
      document.querySelector(".blurrer").style.position = "fixed";
    }
  }



})