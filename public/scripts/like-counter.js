$(document).ready(function () {

  $(document).on(`click`, `.like`, function () {

    let _id = $(this).parent().parent().data(`id`)
    let count = Number($(this).siblings(`.like-count`).text())
    
    if (count == 0) {
      count += 1
      $(this).siblings(`.like-count`).text(count)
    } else {
      count -= 1
      $(this).siblings(`.like-count`).text(count)
    }

    $.ajax({
      type: `POST`,
      url: `/tweets/${_id}/${count}`,
    });

  });

});