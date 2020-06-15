function test_alert() {
    alert("これはテストです");
}

jQuery(function($){
    var target_type = '',           // 支援対象選択
        support_type = new Array(), // サポートの形

        supportListArea = $('#support_list'),

        /*
            エラーメッセージ
        */
        msgNoCategory = '<li>支援するカテゴリーがありません</li>';
        msgNoSupportType = '<li>支援の形がありません</li>';


    /*
        個人向け選択肢（カテゴリーリスト）
    */

    $('.for_personal').click(function(){
        $('#support_list').parent().hide();
        $('#item_list').parent().hide();
        target_type = "personal";      // 投稿タイプ取得

        supportListArea.children().remove(); // 一旦投稿全削除
        get_category_list(target_type);
    });
    /*
        事業者向け選択肢（カテゴリーリスト）
    */
    $('.for_business').click(function(){
        $('#support_list').parent().hide();
        $('#item_list').parent().hide();
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
                if ( response == 'false' ) { // 選択できるものがなければ
                    supportListArea.prepend(msgNoCategory);
                } else {
                    jsonData = JSON.parse( response );
                    $.each( jsonData, function( i, val ) {
                        // valが配列 = $returnObj
                        var support_category_name = val['support_category_name'],
                            support_category_id = val['support_category_id'],
                            postItem = '';


                        postItem += '\
                                <li>'
                                + '<input type="checkbox" id="'
                                + support_category_id
                                + '" ><label for="'
                                + support_category_id
                                + '" >'
                                + support_category_name
                                + '</label>'
                            +'</a></li>\
                        ';
                        supportListArea.prepend(postItem); // 選択肢追加
                        $('#support_list').parent().show();
                    });
                }

                postArea.removeClass('loading'); // loading終了
            }
        });
        return false;
    }


    $('.category_item').click(function(){
        $('#item_list').parent().hide();

        supportListArea.children().remove(); // 一旦投稿全削除
        get_category_list(target_type);
    });
    function get_item_list(target_type) {
            $.ajax({
            type: 'POST',
            url: ajaxurl,
            data: {
                'target_type' : target_type, // 対象投稿タイプ送信
                'action' : 'get_category',
            },
            success: function( response ){
                // jsonData受け取る
                if ( response == 'false' ) { // 選択できるものがなければ
                    supportListArea.prepend(msgNoSupportType);
                } else {
                    jsonData = JSON.parse( response );
                    $.each( jsonData, function( i, val ) {
                        // valが配列 = $returnObj
                        var support_category_name = val['support_category_name'],
                            support_category_id = val['support_category_id'],
                            postItem = '';

                        postItem += '\
                                <li>'
                                + '<input type="checkbox" id="'
                                + support_category_id
                                + '" ><label for="'
                                + support_category_id
                                + '" >'
                                + support_category_name
                                + '</label>'
                            +'</a></li>\
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

    var post_type = '';
        postArea = $('#postsArea');
        noticeMsg = '<p class="noItem">記事がありません。</p>';
        target_type = '';
        $('#support_list').parent().hide();
        $('#item_list').parent().hide();

    /*
        支援情報リスト取得
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
});
