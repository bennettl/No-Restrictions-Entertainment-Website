<style type="text/css">@import url(/css/main.css);</style>
<style type="text/css">@import url(/css/contact.css);</style>
<div id="contact">
	<div id="leftContainer">
        <div class="largeTitle">Contact Us</div>
        <div class="desc">Contact us anytime with any questions, concerns, or suggestions.</div>
        <form id="contactForm" action="<?php echo $_SERVER['PHP_SELF']; ?>" method="post">
        <div id="contactTable">
            <div class="errorMsg noti"></div>
            <input type="text" class="inputText inactive" name="name" autocomplete="off" value="Name" /> 	
            <input type="text" class="inputText inactive" name="email" value="Email" autocomplete="off" />	
            <textarea name="message" class="inputText inactive descriptionText" value="Message">Message</textarea>
            <input type="submit" class="inputSubmit" name="send" value="Send" />
        </div>
        </form>		
    </div>
    <div id="rightContainer">
        <div class="largeTitle">Recieve email updates</div>
      	<div class="desc">Sign up to our newsletter for future updates.</div>
        <form id="signUpForm" action="<?php echo $_SERVER['PHP_SELF']; ?>" method="post">
            <div class="errorMsg noti"></div>
            <input class="inputText inactive" type="text" name="first name" autocomplete="off" value="First name"/>
            <input class="inputText inactive" type="text" name="last name" autocomplete="off" value="Last name"/>
            <input class="inputText inactive" type="text" name="email " autocomplete="off" value="Email "/>
            <input id="signUpBtn" class="inputSubmit" type="submit" name="signUp" value="Sign Up" />
        </form>
    </div>
</div>
<!-- 	
    <div id="mc_embed_signup">
<form action="http://norestrictionsent.us2.list-manage.com/subscribe/post?u=f7297fea47212572ef1817295&amp;id=a0b9331593" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank">
		<input type="email" value="" name="EMAIL" class="email float_left inputText inactive" id="mce-EMAIL" placeholder="email address" required>
		<div class="float_left clear">
            <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button">
        </div>
	</form> 
	</div>  -->
