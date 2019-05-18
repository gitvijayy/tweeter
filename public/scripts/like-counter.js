$(document).ready(function () {

  $(document).on("click", ".like", function () {

    let _id = $(this).parent().parent().data("id")
    let count = $(this).siblings(".like-count").text()

    if (count == 0) {
      count++
      $(this).siblings(".like-count").text(count)
    } else {
      count--
      $(this).siblings(".like-count").text(count)
    }

    $.ajax({
      type: 'POST',
      url: `/tweets/${_id}/${count}`,
    });

  });

});