$(document).ready(function(){

$('#carousel').elastislide({ 
	// Onclick function
	onClick : function( $item ) { 
		var name = $item.attr('class');
		var img = $item.find('img');
		var profile = $("#" + name).contents().clone();

		// Remove current class from image
		$(".elastislide-carousel ul li a img.current").removeClass('current');
		// Add current class to image
		img.addClass('current');

		$(".profileDesc").hide().html(profile).fadeIn(500);
	},	
	onReady : function() { 
		$("#carousel li")[0].click();
		return false;
	}
});
	
});
