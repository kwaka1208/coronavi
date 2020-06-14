function test_alert() {
    alert("これはテストです");
}

jQuery(function($){
    var post_type = '';
        postArea = $('#postsArea');
        noticeMsg = '<p class="noItem">記事がありません。</p>';
        $('#support_list').parent().hide();
        $('#item_list').parent().hide();

    /*
        投稿リスト取得
    */
    $('.loadPosts').click(function(){
        post_type = $(this).data('post'); // 投稿タイプ取得

        postArea.addClass('loading'); // loading開始
        postArea.children().remove(); // 一旦投稿全削除

        $.ajax({
            type: 'POST',
            url: ajaxurl,
            data: {
                'post_type' : post_type, // 投稿タイプ送信
                'action' : 'event', // functionsで追加したイベント名
            },
            success: function( response ){
                // jsonData受け取る
                if ( response == 'false' ) { // 投稿がなかったら
                    postArea.prepend(noticeMsg);
                } else {
                    jsonData = JSON.parse( response );
                    $.each( jsonData, function( i, val ) {
                        // valが配列 = $returnObj
                        var post_title = val['post_title'],
                            post_date = val['post_date'],
                            // term_name = val['term_name'],
                            postItem = '';

                        postItem += '\
                            <article class="postItem">'
                                +post_title
                                +post_date
                                // +term_name
                            +'</article>\
                        ';

                        postArea.prepend(postItem); // 投稿表示
                    });
                }

                postArea.removeClass('loading'); // loading終了
            }
        });
        return false;
    });

    /*
        個人向け選択肢（カテゴリーリスト）
    */
    var target_type = '';
        supportListArea = $('#support_list');
        msgNoCategory = '<li>支援するカテゴリーがありません</li>';

    $('.for_personal').click(function(){
        $('#support_list').parent().hide();
        target_type = "personal";      // 投稿タイプ取得

        supportListArea.children().remove(); // 一旦投稿全削除
        get_category_list(target_type);
    });
    /*
        事業者向け選択肢（カテゴリーリスト）
    */
    $('.for_business').click(function(){
        $('#support_list').parent().hide();
        target_type = "business";      // 投稿タイプ取得

        supportListArea.children().remove(); // 一旦投稿全削除
        get_category_list(target_type);
    });
    function get_category_list(target_type) {
            $.ajax({
            type: 'POST',
            url: ajaxurl,
            data: {
                'target_type' : target_type, // 対象投稿タイプ送信
                'action' : 'get_category',
            },
            success: function( response ){
                // jsonData受け取る
                if ( response == 'false' ) { // 投稿がなかったら
                    supportListArea.prepend(msgNoCategory);
                } else {
                    jsonData = JSON.parse( response );
                    $.each( jsonData, function( i, val ) {
                        // valが配列 = $returnObj
                        var support_category_item = val['support_category_item'],
                            post_date = val['post_date'],
                            // term_name = val['term_name'],
                            postItem = '';

                        postItem += '\
                            <li>'
                                +support_category_item
                            +'</li>\
                        ';

                        supportListArea.prepend(postItem); // 投稿表示
                        $('#support_list').parent().show();
                    });
                }

                postArea.removeClass('loading'); // loading終了
            }
        });
        return false;
    }
});
