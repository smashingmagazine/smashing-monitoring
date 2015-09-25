/*global Zepto, document, console, moment */

/*

 document.addEventListener("DOMContentLoaded", function() {
 'use strict';
 var test = document.querySelector('table');
 test.addEventListener("mouseover", function( event ) {
 if(event.target.hasAttribute('data-screenshot')){
 var img = document.querySelector('img').src = event.target.getAttribute('data-screenshot');
 }


 }, false);
 });*/
(function (document, $, moment) {
	'use strict';
	$('ready', function () {
		var $img,
			lastSrc;
		$('.screenshot').append('<img />');
		$img  = $('.screenshot img');
		$img.on('load',function(){

		});
		$('.date').each(function () {
			var $element = $(this);
			$element.text(moment($element.text()).fromNow());
		});

		$('[data-label]').on('mouseover', function () {
			var $element = $(this),
				src = 'screenshots/'+ $element.attr('data-label')+'.jpg';
				if(lastSrc !== src){
					$img.attr('src',src);
					lastSrc = src;
				}
		});

	});


})(document, Zepto, moment);
