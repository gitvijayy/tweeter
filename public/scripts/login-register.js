
$(document).ready(function () {
  $(document).on(`click`, `.logout`, function (event) {
    event.preventDefault();
    document.cookie = "email= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
    console.log("ab")
    location.reload();
  })
  $(document).on(`click`, `.login-register a`, function (event) {
    event.preventDefault();
    let type = $(this).siblings(".login-register-button").val();
    let email = $(this).siblings(".email").val()
    let password = $(this).siblings(".password").val()
    console.log(email, password)
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
  let email = $(this).siblings(".email").val()
  let password = $(this).siblings(".password").val()
  if (type === "Register") {
    $.ajax({
      type: `POST`,
      url: `/tweets/register`,
      data: { email: email, password: password },
      success: () => {
        $(".login-status").text(`Logged in as ${email}`)
        $(".login-status").attr("data-id", email);
        //$(".login-status").addClass(`Logged In`);
        document.cookie = `email=${email}`;
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
      data: { email: email, password: password },
      success: (result) => {
        $(".login-status").text(`Logged in as ${email}`)
        $(".login-status").attr("data-id", email);
        //$(".login-status").addClass(`Logged In`);
        document.cookie = `email=${email}`;
        location.reload();
      },
      error: () => {
        $(`.registration-error`).text(`404: Not Found`);
        $(`.registration-error`).slideDown();
      }
    });
  }
})
