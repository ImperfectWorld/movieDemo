$.get("../tpl/comment.txt").done(function(data){
    window.commentTpl = data;
});

$(function() {
    $("button[type='submit']").click(function(ev) {
        var content = $("textarea").val();
        var movie_id = $("#movie-id").val();
        var user_id = $("#movie-from").val();
        var user_discuss_id = $("#discuss_user").val()
        ev.preventDefault();
        if(!content) {
            alert("评论不能为空!");
        }else{
            $.post("./comment",{
                content : content,
                movie_id : movie_id,
                user_id : user_id,
                to_id : user_discuss_id
            }).done(function(res) {
                var res;
                try{
                    res = JSON.parse(res)
                }catch(e){
                    res = e;
                };
                if(res.status === "done"){
                  reloadComments();
                };
            });
        };
    });
    function reloadComments() {
        var movie_id = $("#movie-id").val();
        $.post("/movie/getcomments",{
            movie_id : movie_id
        }).done(function(res){
            var replys = JSON.parse( res ).replys;
            var compile = _.template( commentTpl );
            $("#panel-comments").html( compile({data:replys}) );
        });
    };
    reloadComments();

    $("body").on("click",".discuss",function(ev) {
        $("#discuss_user").val( $(this).attr("data-discuss") );
        $("textarea").focus();
        ev.stopPropagation();
    });
    $("body").click(function() {
        $("#discuss_user").val( "" );
    });
});
