
<?php get_header(); ?>
<div class="main_body">
	<h2>個人向け、事業向けどちらの支援をお探しですか？</h2>
	<ul>
		<li><a class="for_personal" href="javascript:void(0);" data-post="measure">個人向け</a></li>
		<li><a class="for_business" href="javascript:void(0);" data-post="measure">事業者向け</a></li>
	</ul>

	<div>
		<h2>以下の中から、該当するものをお選びください</h2>
		<ul id="category"></ul>
		<a href="javascript:void();" class="btn btn-primary" role="button" id="select_category">
			この条件で表示する
		</a>
	</div>
	<div>
		<h2>以下の中から、希望するサポートの種類をお選びください</h2>
		<ul id="support"></ul>
		<a href="javascript:void();" class="btn btn-primary" role="button" id="select_support">
			この条件で表示する
		</a>
	</div>
	<div>
		<h2>以下の中から、該当するものをお選びください</h2>
		<ul id="result_list"></ul>
	</div>
</div>
<?php get_footer(); ?>
