var basetitle = document.getElementsByTagName("title")[0].innerHTML;

setInterval(function(){
    if (parseInt($(".notificationsCount").html()) == 0 || $(".notificationsCount").html() === null) {
      document.title = basetitle;
    } else {
        document.title = "(" + $(".notificationsCount").html() + ") " + basetitle;
    }
},2000);
