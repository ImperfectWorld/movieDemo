$(function() {
    $("#del").click(function() {
        var $this = $(this);
        var movie_id = $this.attr("data-movie");
        $.post("../admin/removemovie", {
            movie_id : movie_id
        }).done(function(res) {
            if(JSON.parse(res).status === "ok") {
                $this.closest("tr").remove();
            }else{
                alert("删除电影失败")
            };
        });
    });
});