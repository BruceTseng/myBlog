$(document).ready(function () {
    $('.deletePost').on('click', function (e) {
        e.preventDefault();
        var id = $(this).data('id');
        var title = $(this).data('title');
        console.log(title);
        if (confirm('確認是否刪除' + title)) {
          $.ajax({
            url: '/dashboard/article/delete/' + id,
            method: 'POST'
          }).done(function(response) {
            window.location = '/dashboard/archives';
          });
        }
    });
});