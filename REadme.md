### What we will build
we will build a React site with React Router that implements authentication/authorization with sessions/cookies
users will be able to click on Register page, fill in information, receive email with confirmation link, click on it, and be a full member
the name of this site is "Language Tandem Group" just to give it a sense of a real community site which would require a registration process
### How it will work
users can belong to the following accessGroups
loggedOutUsers
loggedInUsers
unconfirmedMembers
members
initially there will only be one user
anonymousUser
belongs to group: loggedOutUsers
the site will have the following pages which allow members in these accessGroups
Welcome
loggedOutUsers, loggedInUsers
Member Info
members
Register
loggedOutUsers
Login
loggedOutUsers
Logout
loggedInUsers
Confirm Link (hidden in navigation, accessed by link from confirmation email)
loggedOutUsers
register process
on Register page, user types in
first name
last name
email
user object is added to database with
access groups "loggedInUsers" and "unconfirmedMembers"
confirmationLinkCode = random number, e.g. 28374298347384
email is sent to email address provided by user
user is transfered to Login page
user logs in and is transferred to Welcome Page
on Welcome page, there is conditional rendering: if "unconfirmedMembers" then "check your email for confirmation message"
user clicks link in email e.g. https://sitename.netlify.app/confirmLink/28374298347384
random number in link is matched to confirmationLinkCode in the user object
user object in database is changed
accessGroups = loggedInUsers, members
user is transferred to Members page
### What we will use
React
Vite
TypeScript
sessions/cookies
React Router
nodemailer
