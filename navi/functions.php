<?php

    add_action( 'wp_enqueue_scripts', 'theme_enqueue_styles' );
    function theme_enqueue_styles() {
        wp_enqueue_style( 'parent-style', get_template_directory_uri() . '/style.css' );
        wp_enqueue_script('navi_js', get_stylesheet_directory_uri() . '/js/navi.js', array('lightning-js'));
    }

    add_action( 'wp_footer', 'add_ajax_url', 1 );
    function add_ajax_url() {
        echo '
            <script>
                var ajaxurl = "'.admin_url('admin-ajax.php').'";
            </script>
        ';
    }

/*
 * Ajax処理 設定
 **/

/*
 * Ajaxで投稿やり取り
 **/
    add_action( 'wp_ajax_event', 'load_per_post_types' );
    add_action( 'wp_ajax_nopriv_event', 'load_per_post_types' );
    function load_per_post_types() {
        global $post;
        $post_type = $_POST['post_type']; // 投稿タイプ取得
        $returnObj = array();

        // get_posts オプション
        $args = array(
            'post_type' => $post_type,
            'posts_per_page' => '-1'
        );
        $posts = get_posts( $args );

        // 投稿ループ
        foreach( $posts as $key => $post ) {
            $returnObj[$key] = array(
                'post_title' => get_the_title(),        // title
                'post_date'  => get_the_time('Y-m-d'),  // 投稿日
            );
        }

        // json形式に出力
        if ( $returnObj ) : // 投稿があれば
            echo json_encode( $returnObj );
        else : // 投稿がなければ
            echo json_encode( false );
        endif ;

        die();
    }

/*
 * 個人向け支援のカテゴリーを取得
 **/
    add_action( 'wp_ajax_get_category',         'get_cagegory_list' );
    add_action( 'wp_ajax_nopriv_get_category',  'get_cagegory_list' );
    function get_cagegory_list() {
        $target_type =  $_POST['target_type'];  // 支援の対象取得
        $returnObj = array();

            // array_push($returnObj, array(
            //     'support_category_item' => $target_type,     // 投稿分類名称
            // ));

        $terms = get_terms( $target_type );
        foreach ( $terms as $term ) {
            array_push($returnObj, array(
                'support_category_item' => $term->name,     // 投稿分類名称
            ));
        }

        // json形式に出力
        if ( $returnObj ) : // データがあればそれを返す
            echo json_encode( $returnObj );
        else : // データがなければfalseを返す
            echo json_encode( false );
        endif ;

        die();
    }?>

