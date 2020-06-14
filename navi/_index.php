<?php get_header(); ?>

<script type="text/javascript">
$( '#submit' ).on( 'click', function(){
    $.ajax({
        type: 'POST',
        url: ajaxurl,
        data: {
            'action' : 'view_sitename',
        },
        success: function( response ){
            alert( response );
        }
    });
    return false;
});

$( '#submit' ).on( 'click', function(){
    var mes = 'Hello World!!';
    $.ajax({
        type: 'POST',
        url: ajaxurl,
        data: {
            'action' : 'view_mes',
            'mes' : mes,
        },
        success: function( response ){
            alert( response );
        }
    });
    return false;
});
(function($){
    $( '#submit' ).on( 'click', function(){
        $.ajax({
            type: 'POST',
            url: ajaxurl,
            data: {
                'action' : 'my_ajax_get_posts',
            },
            success: function( response ){
                jsonData = JSON.parse( response );
                $.each( jsonData, function( i, val ){
                    alert( val['post_title'] );
                    alert( val['permalink'] );
                });
            }
        });
        return false;
    });
})(jQuery)


</script>

<button id="submit">View Sitename</button>

<?php get_footer(); ?>
