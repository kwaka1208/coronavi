
jQuery(function($){
    var target_type = '',          // 支援対象選択
        support_type = new Array(), // サポートの形
        categoryList = $('#category'),
        supportList = $('#support'),
        resultList = $('#result');

    function clearCategory() {
        categoryList.parent().hide();
        categoryList.children().remove();
    }

    function clearSupport() {
        supportList.parent().hide();
        supportList.children().remove();
    }

    function clearResult() {
        resultList.parent().hide();
        resultList.children().remove();
    }

    // 表示初期化
    clearCategory();
    clearSupport();
    clearResult();

    /************************************************************
        個人向け・事業向けそれぞれのカテゴリーリストを取得
    ************************************************************/

    // 個人向け選択肢（カテゴリーリスト）
    $('.for_personal').click(function(){
        target_type = "personal";      // 投稿タイプ取得
        clearCategory();
        clearSupport();
        clearResult();

        get_category(target_type);
    });

    // 事業者向け選択肢（カテゴリーリスト）
    $('.for_business').click(function(){
        target_type = "business";      // 投稿タイプ取得
        clearCategory();
        clearSupport();
        clearResult();

        get_category(target_type);
    });

    // カテゴリーリスト共通処理
    function get_category(target_type) {
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
                    categoryList.prepend('<li>支援するカテゴリーがありません</li>');
                } else {
                    jsonData = JSON.parse( response );
                    $.each( jsonData, function( i, val ) {
                        // valが配列 = $returnObj
                        var category_name = val['category_name'],
                            category_id = val['category_id'],
                            postItem = '';


                        postItem += '\
                                <li>'
                                + '<input type="checkbox" id="'
                                + category_id
                                + '" value="'
                                + category_id
                                + '" ><label for="'
                                + category_id
                                + '" >'
                                + category_name
                                + '</label>'
                            +'</a></li>\
                        ';
                        categoryList.prepend(postItem); // 選択肢追加
                        categoryList.parent().show();
                    });
                }
            }
        });
        return false;
    }


    /************************************************************
        サポートの形態の取得
    ************************************************************/
    $('#select_category').click(function(){
        clearSupport();
        clearResult();

        /* チェック状態取得 */
        var list_category = $('#category input[type="checkbox"]:checked').map(function() {
            return $(this).val();
        }).get();

        $.ajax({
            type: 'POST',
            url: ajaxurl,
            data: {
                'target_type' : target_type,        // 対象投稿タイプ送信
                'list_category' : list_category,    // 選択したサポートの種類（カテゴリー名）
                'action' : 'get_support_type',      // functionsに登録したAjax処理名
            },
            success: function( response ){
                // jsonData受け取る
                if ( response == 'false' ) { // 選択できるものがなければ
                    supportList.prepend('<li>選択できるものがありません</li>');
                } else {
                    jsonData = JSON.parse( response );
                    $.each( jsonData, function( i, val ) {
                        // valが配列 = $returnObj
                        var support_type_name = val['support_type_name'],
                            support_type_id = val['support_type_id'],
                            postItem = '';
                        postItem += '\
                                <li>'
                                + '<input type="checkbox" id="'
                                + support_type_id
                                + '" value="'
                                + support_type_id
                                + '" ><label for="'
                                + support_type_id
                                + '" >'
                                + support_type_name
                                + '</label>'
                            +'</a></li>\
                        ';
                        supportList.prepend(postItem); // 選択肢追加
                        supportList.parent().show();
                    });
                }
            }
        });
        return false;
    });


    /************************************************************
        支援一覧の取得
    ************************************************************/
    $('#select_support').click(function(){
        clearSupport();
        clearResult();

        /* チェック状態取得 */
        var list_support = $('#support input[type="checkbox"]:checked').map(function() {
            return $(this).val();
        }).get();

        $.ajax({
            type: 'POST',
            url: ajaxurl,
            data: {
                'target_type' : target_type,        // 対象投稿タイプ送信
                'list_category' : list_category,    // 選択したサポートの種類（カテゴリー名）
                'list_support' : list_support,    // 選択したサポートの種類（カテゴリー名）
                'action' : 'get_support_result',      // functionsに登録したAjax処理名
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
                            post_url = val['post_url'],
                            post_date = val['post_date'],
                            // term_name = val['term_name'],
                            postItem = '';

                        postItem += '\
                            <a href="'
                                +post_url
                            + '">'
                            + '<article class="supprtItem date="'
                                +post_date
                            + '">'
                                +post_title
                                // +term_name
                            +'</article></a>\
                        ';
                       itemListArea.prepend(postItem); // 投稿表示
                    });
                }
            }
        });
        return false;
    });
});
