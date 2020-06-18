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

    /************************************************************
        個人向け・事業向けそれぞれのカテゴリーリストを取得
    ************************************************************/
	add_action( 'wp_ajax_get_category',         'get_cagegory' );
	add_action( 'wp_ajax_nopriv_get_category',  'get_cagegory' );
	function get_cagegory() {
		$target_type =  $_POST['target_type'];  // 支援の対象取得
		$returnObj = array();

		$terms = get_terms( $target_type );
		foreach ( $terms as $term ) {
			array_push($returnObj, array(
				'category_name' => $term->name,     // 投稿分類名称
				'category_id' => $term->term_id,     // 投稿分類ID
			));
		}

		// json形式に出力
		if ( $returnObj ) : // データがあればそれを返す
			echo json_encode( $returnObj );
		else : // データがなければfalseを返す
			echo json_encode( false );
		endif ;

		die();
	}


    /************************************************************
        サポートの形態の取得
    ************************************************************/
	add_action( 'wp_ajax_get_support_type', 'get_support_type' );
	add_action( 'wp_ajax_nopriv_get_support_type', 'get_support_type' );
	function get_support_type() {
		$target_type = $_POST['target_type'];		// 個人 or 事業者
		$list_category = $_POST['list_category'];	// 選択されたカテゴリーの配列
		$returnObj = array();

		// get_posts オプション
		$terms = array();
		foreach ($list_category as $category) {
			array_push($terms, (int)$category);
		}
		$args = array (
			// 'post_status' => 'publish',
			'post_type' => 'measure',
			'posts_per_page'  => -1,
			'tax_query' => array(
				'relation' => 'OR',
				array(
					'taxonomy' => $target_type,
					'field'    => 'term_id',
					'terms'    => $terms,
				)
			)
		);
		$posts = get_posts( $args );

		// 投稿ループ
		foreach ( $posts as $post ) {
			array_push($returnObj, 
				array(
				'post_title' => $post->the_title(),        // title
				'post_url'  => $post->the_permalink(),  // URL
				'post_date'  => $post->get_the_time('Y-m-d'),  // 投稿日
			));
		}

		// json形式に出力
		if ( $returnObj ) : // 投稿があれば
			echo json_encode( $returnObj );
		else : // 投稿がなければ
			echo json_encode( false );
		endif ;
		die();
	}

    /************************************************************
        支援一覧の取得
    ************************************************************/
	add_action( 'wp_ajax_get_item_list', 'get_item_list' );
	add_action( 'wp_ajax_nopriv_get_item_list', 'get_item_list' );
	function get_item_list() {
		$target_type = $_POST['target_type'];		// 個人 or 事業者
		$list_support = $_POST['list_support'];	// 選択されたカテゴリーの配列
		$list_support = $_POST['list_support'];	// 選択されたカテゴリーの配列
		$returnObj = array();

		// get_posts オプション
		$terms = array();
		foreach ($list_support as $supprt_item) {
			array_push($terms, (int)$supprt_item);
		}
		$args = array (
			// 'post_status' => 'publish',
			'post_type' => 'measure',
			'posts_per_page'  => -1,
			'tax_query' => array(
				'relation' => 'OR',
				array(
					'taxonomy' => $target_type,
					'field'    => 'term_id',
					'terms'    => $terms,
				)
			)
		);
		$posts = get_posts( $args );

		// 投稿ループ
		foreach ( $posts as $post ) {
			array_push($returnObj, 
				array(
				'post_title' => $post->the_title(),        // title
				'post_url'  => $post->the_permalink(),  // URL
				'post_date'  => $post->get_the_time('Y-m-d'),  // 投稿日
			));
		}

		// json形式に出力
		if ( $returnObj ) : // 投稿があれば
			echo json_encode( $returnObj );
		else : // 投稿がなければ
			echo json_encode( false );
		endif ;
		die();
	}
?>


