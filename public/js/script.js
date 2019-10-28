$(document).ready(function() {
  $("#editAuthor").on("show.bs.modal", function(event) {
    var button = $(event.relatedTarget);
    var authid = button.data("authid");
    var authname = button.data("authname");
    var authplace = button.data("authplace");
    var authgenre = button.data("authgenre");
    var authlikes = button.data("authlikes");
    var authbooks = button.data("authbooks");
    $("#auth-id").val(authid);
    $("#auth-genre").val(authgenre);
    $("#auth-place").val(authplace);
    $("#auth-name").val(authname);
    $("#auth-likes").val(authlikes);
    $("#auth-books").val(authbooks);
    console.log("-----authid", authid);
  });

  $("#deleteAuthor").on("show.bs.modal", function(event) {
    var button = $(event.relatedTarget);
    var authid = button.data("authid");
    $("#del-auth-id").val(authid);
  });
});

function changeLikeBtn(butnid) {
  $("#" + butnid).addClass("like-btn-active");
  $("#" + butnid).removeClass("like-btn");
}

function currentUrl() {
  var url = window.location.href;
  var arr = url.split("/");
  var text = "";
  text = arr[4];
  $.ajax({
    url: "/notification",
    type: "GET",
    success: function(data) {
      var errorData = data.error;
      var infoData = data.info;
      var successData = data.success;
      for (i = 0; i < infoData.length; i++) {
        toastr.info(infoData[i]);
      }
      for (i = 0; i < errorData.length; i++) {
        toastr.error(errorData[i]);
      }
      for (i = 0; i < successData.length; i++) {
        toastr.success(successData[i]);
      }
    },
    error: function(jqxhr, status, msg) {
      //error code
    }
  });
}

function editProfile(id) {
  var username = $("#username").val();
  var fullname = $("#fullname").val();
  var email = $("#email").val();

  $.ajax({
    url: "/editProfile",
    type: "POST",
    data: {
      id: id,
      username: username,
      fullname: fullname,
      email: email
    },
    success: function(data) {
      if (data) {
        toastr.success("updated profile!", "SUCCESS");
      }
    }
  });
}

function getApi() {
  $.ajax({
    url: "/getapi",
    type: "get",
    success: function(data) {
      if (data) {
        toastr.success("updated profile!", "SUCCESS");
      }
    }
  });
}
