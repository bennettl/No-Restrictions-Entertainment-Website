$(document).ready(function() {
	poster();
	topNav();
	profile();
});

// Directories
var defaultDirectory = "/";
var filmDirectory = defaultDirectory + 'films/';
var mkDirectory = filmDirectory + "monster-killer/";
var mrdDirectory = filmDirectory + "mothers-red-dress/";
var ohfgDirectory = filmDirectory + "one-hour-fantasy-girl/";

/*** Navigation ***/

// Ajax functionality for top navigation
function topNav(){
	$("#topNav a").live('click', function(e) {
		var fileName = $(this).attr('href').substring(1);
		var info = {"ajax": "true"};
		var path = fileName + '.php';

		defaultTheme(); // Change to default theme
		
		// Toggle current class
		$("#topNav a.current").removeClass('current');
		$(this).addClass('current');

		// Make the ajax call
		$.post(path, info , function(data){
			$("#content").html(data).hide().fadeIn('500');
			// Depending on which sidenav is click, call the following function
			switch(fileName){
				case 'posters':
					poster();
					break;
				case 'about':
					break;
				case 'artists':
					artists();
					break;
				case 'contact':
					contact();
					break;
			}
		}, 'html');
		return false;
	});
}

//Ajax functionality for side navigation
function sideNav(){
	$(".right_nav a").click(function(e){
		// Switch current classes
		$(".right_nav .current").removeClass('current');
		$(this).addClass('current');

		// Folder name is ID of the ul
		var folderName = $(this).parents(".right_nav").attr('id');
		var fileName = $(this).attr('href').substring(1);
	
		var username = $(this).siblings(".inputText").val();
		var info = {"ajax": "true"};
		var path = filmDirectory + folderName + '/' + fileName +  '.php';
		$.post(path, info , function(data){
			$("#leftcol").html(data);
			// Depending on which sidenav is click, call the following function
			switch(fileName){
				case 'the-film':
					break;
				case 'cast-bios':
					$.when(
					    $.getScript( defaultDirectory + "js/Elastislide/js/jquerypp.custom.js" ),
					    $.getScript( defaultDirectory + "js/Elastislide/js/jquery.elastislide.js" ),
					    $.Deferred(function( deferred ){
					        $( deferred.resolve );
					    })
					).done(function(){

					    //place your code here, the scripts are all loaded
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

					// $("#carousel").elastislide();
					break;
				case 'gallery':
					gallery();
					break;
				case 'video':
					break;
				case 'press':
					press($(".mainReviews li").eq(0));
					break;
				case 'soundtrack':
					break;
				case 'thanks':
					break;
			}
		}, 'html');
		return false;
	});
}

/*** Poster ***/

// Animation for poster
function poster(){
	addZIndex(); // set z index for posters 
	
	// Animate margin to zero and fill in the posterInfo
	$("#posters li").mouseover(function() {
		var id = $(this).attr('id');
		var posterInfo = $("#posterInfoHidden ." + id).contents().clone();
		
		$("#posterInfo").html(posterInfo).hide().fadeIn(500);
		$(this).stop().animate({"margin-left": "0"},300, function(){
				// $(this).addClass('current');
		});
	});

	// Animate margin to -240px and fill in the posterInfo with default text. Do NOT animate if it's the first poster.
	$("#posters li").mouseout(function() {
		var id = $(this).attr('id');
		var posterInfo = $("#posterInfoHidden .none").contents().clone();

		$("#posterInfo").html(posterInfo);

		// Don't change margin for first poster
		if (id != "mrd"){
			$(this).stop().animate({"margin-left": "-240px"},300, function() {});
		}

	});

	// Depending on which poster you click, this will reseult in a different theme
	$("#posters li").live('click',function(){
		var id = $(this).attr('id');
		switch(id){
			case 'mk':
				mkTheme();
				break;
			case 'mrd':
				mrdTheme();
				break;
			case 'ohfg':
				ohfgTheme();
				break;
		}
	});
	slideRightPoster($("#posters li").eq(1)); // poster sliding animation
}

// Recursive function to slide posters to the right. $poster = second poster element
function slideRightPoster($poster){
// If element doesn't exist, return
	if (!$poster.length){
		return;
	}
	$poster.animate({"margin-left": "-240px"},400, function(){
	// $list.slideDown(500, function(){
		slideRightPoster($poster.next());
	});
}

// Dynamically sets the z index for posters
function addZIndex(){
	var zindex = 60;

	$("#posters li").each(function(index){

		// If it's the first poster, then margin is zero
		if (zindex == 60){
			$(this).css("margin", '20px 0 0 0');
		}

		$(this).css("z-index", zindex);
		zindex--;
	});
}

/*** Themes ***/

// Changes logo/body background/content background to default
function defaultTheme(){
	$("#header #logo").attr('src', defaultDirectory + 'images/logo.png'); // logo
	$("body").css('background', 'url("'+ defaultDirectory +'images/blue_bg.png") no-repeat fixed center top #010C1B'); // body background
	$("body").css('background-color', '#010C1B');
	$("html").css('background-color', '#010C1B');
	$("#content").css('background', 'none'); // content background
}

// Changes logo/body background/content background for monster killer
function mkTheme(){
	var rightColumnPath = mkDirectory +'rightcol_mk.php';
	var info            = {"ajax": "true"};

	// Insert left and right column
	$.post(rightColumnPath, info , function(data){
		var leftColumn  = '<div id="leftcol" class="float_left"></div>';
		var rightColumn = data;
		$("#content").hide().html(leftColumn).append(rightColumn).fadeIn(500);
		sideNav(); // handles side navigation
		backButton(); // handles clicking the back button
		$(".right_nav a").eq(0).click(); // click first element to populate left column
	}, 'html');

	// Change css
	$("#header #logo").attr('src', mkDirectory + 'images/logo.png'); // logo
	$("body").css('background', 'url("'+ mkDirectory +'images/body_bg.png") no-repeat fixed center top #0c0c0c'); // body background
	$("#content").css('background', 'url("' + mkDirectory + 'images/content_bg.png") no-repeat scroll left center transparent'); // content background
}

// Changes logo/body background/content background for mother's red dress
function mrdTheme(){
	var rightColumnPath = mrdDirectory + 'rightcol_mrd.php';
	var info            = {"ajax": "true"};

	// Insert left and right column
	$.post(rightColumnPath, info , function(data){
		var leftColumn  = '<div id="leftcol" class="float_left"></div>';
		var rightColumn = data;
		$("#content").hide().html(leftColumn).append(rightColumn).fadeIn(500);
		sideNav(); // handles side navigation
		backButton(); // handles clicking the back button
		$(".right_nav a").eq(0).click(); // click first element to populate left column
	}, 'html');

	// Change css
	$("#header #logo").attr('src', mrdDirectory + 'images/logo.png'); // logo
	$("body").css('background', 'url("' + mrdDirectory + 'images/body_bg.png") no-repeat fixed center top #0c0c0c'); // body background
	$("body").css('background-color', '#0c0c0c');
	$("#content").css('background', 'url("' + mrdDirectory + 'images/content_bg.png") no-repeat scroll left center transparent'); // content background
}

// Changes logo/body background/content background for one hour fantasy girl
function ohfgTheme(){
	var rightColumnPath = ohfgDirectory +'rightcol_ohfg.php';
	var info            = {"ajax": "true"};

	// Insert left and right column
	$.post(rightColumnPath, info , function(data){
		var leftColumn  = '<div id="leftcol" class="float_left"></div>';
		var rightColumn = data;
		$("#content").hide().html(leftColumn).append(rightColumn).fadeIn(500);
		sideNav(); // handles side navigation
		backButton(); // handles clicking the back button
		$(".right_nav a").eq(0).click(); // click first element to populate left column
	}, 'html');

	// Change css
	$("#header #logo").attr('src', ohfgDirectory + 'images/logo.png'); // logo
	$("body").css('background', 'url("'+ ohfgDirectory +'images/body_bg.png") no-repeat fixed center top #0c0c0c'); // body background
	$("body").css('background-color', '#0c0c0c');
	$("#content").css('background', 'url("' + ohfgDirectory + 'images/content_bg.png") no-repeat scroll left center transparent'); // content background
}

// When back button is clicked, go back home
function backButton(){
	$("#backButton").live('click', function(){
		$("[href='#posters']").click(); // Click the the home button
	});
}

// Recursive function to slide down reviews, $list = first list element
function press($list){
	// If element doesn't exist, return
	if (!$list.length){
		return;
	}
	// Fade in animation for list
	$list.fadeIn(600, function(){
		press($list.next()); // pass next list element
	});
}

function gallery(){
	// We only want these styles applied when javascript is enabled

	// Initially set opacity on thumbs and add
	// additional styling for hover effect on thumbs
	var onMouseOutOpacity = 0.67;
	$('#thumbs ul.thumbs li, div.navigation a.pageLink').opacityrollover({
		mouseOutOpacity:   onMouseOutOpacity,
		mouseOverOpacity:  1.0,
		fadeSpeed:         'fast',
		exemptionSelector: '.selected'
	});
	
	// Initialize Advanced Galleriffic Gallery
	var gallery = $('#thumbs').galleriffic({
		delay:                     2500,
		numThumbs:                 7,
		preloadAhead:              7,
		enableTopPager:            false,
		enableBottomPager:         false,
		imageContainerSel:         '#slideshow',
		controlsContainerSel:      '#controls',
		captionContainerSel:       '#caption',
		loadingContainerSel:       '#loading',
		renderSSControls:          true,
		renderNavControls:         true,
		playLinkText:              'Play Slideshow',
		pauseLinkText:             'Pause Slideshow',
		prevLinkText:              '&lsaquo; Previous Photo',
		nextLinkText:              'Next Photo &rsaquo;',
		nextPageLinkText:          'Next &rsaquo;',
		prevPageLinkText:          '&lsaquo; Prev',
		enableHistory:             true,
		autoStart:                 false,
		syncTransitions:           true,
		defaultTransitionDuration: 900,
		onSlideChange:             function(prevIndex, nextIndex) {
			// 'this' refers to the gallery, which is an extension of $('#thumbs')
			this.find('ul.thumbs').children()
				.eq(prevIndex).fadeTo('fast', onMouseOutOpacity).end()
				.eq(nextIndex).fadeTo('fast', 1.0);

			// Update the photo index display
			this.$captionContainer.find('div.photo-index')
				.html('Photo '+ (nextIndex+1) +' of '+ this.data.length);
		},
		onPageTransitionOut:       function(callback) {
			this.fadeTo('fast', 0.0, callback);
		},
		onPageTransitionIn:        function() {
			var prevPageLink = this.find('a.prev').css('visibility', 'hidden');
			var nextPageLink = this.find('a.next').css('visibility', 'hidden');
			
			// Show appropriate next / prev page links
			if (this.displayedPage > 0)
				prevPageLink.css('visibility', 'visible');

			var lastPage = this.getNumPages() - 1;
			if (this.displayedPage < lastPage)
				nextPageLink.css('visibility', 'visible');

			this.fadeTo('fast', 1.0);
		}
	});

	/**************** Event handlers for custom next / prev page links **********************/

	gallery.find('a.prev').click(function(e) {
		gallery.previousPage();
		e.preventDefault();
	});

	gallery.find('a.next').click(function(e) {
		gallery.nextPage();
		e.preventDefault();
	});

	/****************************************************************************************/

	/**** Functions to support integration of galleriffic with the jquery.history plugin ****/

	// PageLoad function
	// This function is called when:
	// 1. after calling $.historyInit();
	// 2. after calling $.historyLoad();
	// 3. after pushing "Go Back" button of a browser
	function pageload(hash) {
		// alert("pageload: " + hash);
		// hash doesn't contain the first # character.
		if(hash) {
			$.galleriffic.gotoImage(hash);
		} else {
			gallery.gotoIndex(0);
		}
	}

	// Initialize history plugin.
	// The callback is called at once by present location.hash. 
	$.historyInit(pageload, "advanced.html");

	// set onlick event for buttons using the jQuery 1.3 live method
	$("a[rel='history']").live('click', function(e) {
		if (e.button != 0) return true;

		var hash = this.href;
		hash = hash.replace(/^.*#/, '');

		// moves to a new page. 
		// pageload is called at once. 
		// hash don't contain "#", "?"
		$.historyLoad(hash);

		return false;
	});
}

// Animation for clicking profiles. For both artists.php and cast-bios.php
function profile(){
	$(".profileList li").live('click', (function(){
		// If the title hasn't been selected yet
		if (!$(this).hasClass('current')){
			var artistInitial = $(this).attr('class');
			var contents = $("#" + artistInitial).contents().clone();
			var description = $(this).parents('.profileContainer').find(".profileDesc");

			$(this).parent().find("li.current").removeClass('current');
			$(this).addClass("current");

			description.hide().html(contents).fadeIn(500);
		}
	}));
}


// Animating clicking the titles in artists.php
function artists(){
	$("#artistMovieTitle a").click(function(){
		// If the title hasn't been selected yet
		if (!$(this).hasClass('current')){
			// Toggle current class
			$("#artistMovieTitle .current").removeClass('current');
			$(this).addClass('current');

			var href = $(this).attr('href').substring(1);
			var artistList = $("#artists #imgList #" + href).contents().clone();
			var firstProfileDesc = $("#artists #bioList ." + href  + " > div").eq(0);
			// Replace profile list
			$(".profileContainer").hide();
			$(".profileContainer .profileList").html(artistList);
			$(".profileContainer .profileDesc").html(firstProfileDesc);
			$(".profileContainer").fadeIn(500);
		}
		return false;
	});
	$("#artistMovieTitle a").eq(0).click();
}
