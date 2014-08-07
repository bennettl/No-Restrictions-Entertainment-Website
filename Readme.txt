
Name: Bennett Lee
Student ID: 6825311257
Website: No Restrictions Entertainment
Link: http://norestrictionsent.com/

Summary
————————————————————————————————————————————————————————————————————————————
For my CSCI 351 term project, I developed a dynamic website for a small film production company called No Restrictions Entertainment (NRE). Users will be able to browse information associated with each film (synopsis, cast biographies, galleries, trailers, press reviews, and soundtrack). The website will include links to connect with the film via Facebook or purchase the film through iTunes. The website includes information regarding the company, artists, a contact form, and email subscription form.Outline————————————————————————————————————————————————————————————————————————————NRE contain four main pages: home, about, artists, and contact.HomeThe home page provides information regarding the films produced by the company. There is a JavaScript animation where users can hover over particular film poster and click on it. Once the poster is click, the right column will be populated with a sidebar while the left column will display the contents of the sidebar.The sidebar will include the following links:- The Film: Information regarding film including synopsis and director's statement- Cast Bios: Pictures and biography of actors and actress- Gallery: Behind the scene images taken during film production - Trailers: Any trailers and clips that are associated with the film- Press: Reviews given about the film will be placed here- Soundtrack: Music associated with the film will be placed hereAboutThe about page displays a video description of the company and biographies of the company's founders.ArtistThe artist page displays pictures and biographies of actors and actresses on the film. ContactTwo forms exist in this page:  “Contact Us” and “Email Subscription.” - Contact Us will include the following fields: name, email, and message. - Email subscription form requires the first name, last name, and email address of the user.Both forms will have JavaScript validation.Notes- The following languages will be used: HTML, CSS, JavaScript, JQuery, SQL, and PHP.- I am the only developer.
Forms
——————————————————————————————————————
Forms are located in “Contact” page. Each field is validated with regular expression to ensure user input is safe. For example, the following is the regex for email:

Regex for email: /^([A-Za-z0-9_\-\.]){3,}\@([A-Za-z0-9_\-\.]){3,}\.([A-Za-z]{2,4})$/;

Javascript validation code can be found in js/contact.js.

The email subscription code is also validated through php to ensure no duplicate emails exist in the database. The php file is called ajax.contact.php.


Interacting with Database Requirement
——————————————————————————————————————
This can be found in the “Contact” page, specifically the the “Receive Email Updates” form. By entering a valid first name, last name, and email address, the information will be stored in a table called “email”. 

To view this table, go to http://norestrictionsent.com/emailList.php . You can add users and see the table update upon refresh.


Setting Up In Local Host
——————————————————————————————————————
Testing the site at http://norestrictionsent.com/ should suffice, but if you need to test it in your own computer, please perform the following steps.

1. Modify the constants DB_HOST, DB_USER, DB_PASS, DB_NAME in file common/connect.php accordingly. These constants are necessary to connect to database.
2. Create a table name email with the following columns [email_id(int), first_name(varchar), last_name(varchar), email(varchar)]


Additional Notes
——————————————————————————————————————
On the right sidebar the “Monster Killer” Film, the icons under the title “Coming Soon” is suppose to redirect user to the home page. The icons need to be present to show the users that purchases in DVDs, iTunes, etc. are coming soon. 
