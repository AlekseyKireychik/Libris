$(document).ready(function() {
  $(".contactsLink, .aboutUsLink, .teachersLink").on("click", function(event) {
    event.preventDefault();
    let id = $(this).attr("href"),
      top = $(id).offset().top - 50;
    $("body,html").animate({ scrollTop: top }, 500);
    $(".burger-menu__button").removeClass("is-active");
    $(".burger-menu").removeClass("is-active");
    $(".header__nav").removeClass("is-active");
    $(".header__logo").removeClass("is-active");
    $(".header__logoActive").removeClass("is-active");
    $(".header__top").removeClass("is-active");
    $("body").removeClass("is-active");
    return false;
  });

  $(".burger-menu__button").on("click", function() {
    $(".burger-menu").toggleClass("is-active");
    $(".header__nav").toggleClass("is-active");
    $(".header__logo").toggleClass("is-active");
    $(".header__logoActive").toggleClass("is-active");
    $(".header__top").toggleClass("is-active");
    $("body").toggleClass("is-active");
  });

  if ($(document).scrollTop() > $(".fixed-top").height()) {
    $(".fixed-top").toggleClass("scrolled");
  }

  $(window).on("scroll", function() {
    $(".header__top").toggleClass(
      "scrolled",
      $(this).scrollTop() > $(".header__top").height()
    );
  });

  $(".slider").slick({
    dots: false,
    arrows: false,
    speed: 300,
    slidesToShow: 3,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          dots: true,
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 769,
        settings: {
          dots: true,
          slidesToShow: 1
        }
      }
    ]
  });

  $.extend($.validator.messages, {
    required: "Error"
  });

  $("#form__footer").validate({
    rules: {
      name: {
        required: true
      },
      email: {
        required: true,
        email: true
      },
      text: {
        required: true
      }
    }
  });

  $(".submit").on("click", function() {
    if ($("#form__footer").valid() == true) {
      $("#form__footer").submit(function(e) {
        e.preventDefault();
        var thisForm = $(this);
        var data = new FormData(thisForm[0]);
        $.ajax({
          url: "mail.php",
          data: data,
          processData: false,
          contentType: false,
          cache: false,
          type: "POST",
          success: function() {
            alert("Message sent!");
            $("#form__footer")[0].reset();
          },
          error: function() {
            alert("Message not sent!");
            $("#form__footer")[0].reset();
          }
        });
      });
    }
  });
});
