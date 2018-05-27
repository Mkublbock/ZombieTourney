# Zombie Tourney

## Todo

### Currently online here: 
#### https://zombietourney-1.firebaseapp.com/
#### Will be updated frequently

* General Functionality

	*	Confirm Login/Register with some sort of UI confirmation ✔
	*	Handle errors and display them to the user ✔
	*	Make homepage responsive (countdown)
	*	Display links when clicking on the menu-button (small devices)
	*	Make image-size on smaller devices
	*	Implement some sort of Password Reset ✔
	*	Implement router guards : {
		LoggedIn User: {
			No access to login and register
		}
		LoggedOut User: {
			No access to profile-page
		}
	}

	*	Implement spam protection: {
			Idea: No password reset on unregistered email ✔
				  Limit password reset per user (somehow)
	}

	*	Implement a Login via Username OR email
	*	Backend Protection! (Users can now only read+write their own data) ✔
	
* Design

	* About-Page
		* Just some text on why I made this page, nothing fancy
	* Rules-Page
		* Explain general rules (gums, timers, ...)
		* How to submit games
	* How it Works 
		* How a tournament is run
		* How are the winners evaluated
		* How to submit a games
		* How to win a prize
	* Tourney-Page
		* Leaderboard of top 10-25 Players
		* What you can win (picture)
		* Submit-Game button (register button if not logged in)
		* Reference on "How it Works" and "Rules" 
		* Explain specific rules or anything special 
		* Probably arrange it in tabs 
		  (leaderboard tab, how it works-tab,...) 
		  or
		  Make cards with grid layout (Angular material dashboard dummy)
		