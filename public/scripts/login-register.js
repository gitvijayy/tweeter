
// var overlay =  () => {
//   $.LoadingOverlay("show");
//   setTimeout(function () {
//     $.LoadingOverlay("hide");

//   }, 1000);
// }
$(document).ready(function () {

  $(document).on(`click`, `.logout`, function (event) {

    event.preventDefault();

    document.cookie = "username= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"

    location.reload();
  })
  $(document).on(`click`, `.login-register a`, function (event) {
    event.preventDefault();

    let type = $(this).siblings(".login-register-button").val();
    let username = $(this).siblings(".username").val()
    let password = $(this).siblings(".password").val()

    if (type === "Login") {
      $(this).siblings(".login-register-button").val("Register")
      $(this).text("Click here to Login")
    } else {
      $(this).siblings(".login-register-button").val("Login")
      $(this).text("Click here to Register")
    }
  });
})

$(document).on(`click`, `.login-register-button`, function (event) {
  event.preventDefault();

  let type = $(this).val();
  let username = $(this).siblings(".username").val()
  let password = $(this).siblings(".password").val()
  if (type === "Register") {
    $.ajax({
      type: `POST`,
      url: `/tweets/register`,
      data: { username: username, password: password },
      success: () => {
        $(".login-status").text(`Logged in as ${username}`)
        $(".login-status").attr("data-id", username);

        document.cookie = `username=${username}`;
        location.reload();
      },
      error: () => {
        $(`.registration-error`).text(`User exists`);
        $(`.registration-error`).slideDown();
      }
    });
  } else {
    $.ajax({
      type: `POST`,
      url: `/tweets/login`,
      data: { username: username, password: password },
      success: (result) => {
        $(".login-status").text(`Logged in as ${username}`)
        $(".login-status").attr("data-id", username);
        document.cookie = `username=${username}`;
        location.reload();
      },
      error: () => {
        $(`.registration-error`).text(`404: Not Found`);
        $(`.registration-error`).slideDown();
      }
    });
  }



})


