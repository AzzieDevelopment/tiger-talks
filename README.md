# ReadMe

* ## Deployed Links
* Backup: https://tigertalks1.azziedevelopment.com/#/home
* Main (if successful): https://tigertalks.azziedevelopment.com/#/home

* ## Prerequisite
    * Grab the most recent copy of global.json from our shared drive, otherwise sign in functionality will not work. 

* ## Assumptions
    * Late(est) version of node/npm installed
    * Late(est) version of Git 
    * Angular is installed globally on your system
        * run:
        ```npm install -g @angular/cli```
		(This will install the Angular CLI globally)
        * verify that Angular is installed using "ng --version"
    
* ## Current Endpoints
    * Frontend
    	* http://localhost:3000/#/ landing page
    	* http://localhost:3000/#/signup signup page
    	* http://localhost:3000/#/signin signin page
    * Backend (list needs updating)
    	* http://localhost:3000/api/loggedIn see if a users session is logged in
    	* http://localhost:3000/api/register Registration Page
    	* http://localhost:3000/api/login Temp Login Page
    	* http://localhost:3000/api/hello simple response string
    	* http://localhost:3000/api/selectExample get all users from DB
    	* http://localhost:3000/api/hosturl return host from env variable
    	* http://localhost:3000/api/getCommentData/:id get id by comment
      * http://localhost:3000/api/getUser/:id get user by id
      * http://localhost:3000/api/gettigerspace/:id get tiger space by id
      * http://localhost:3000/api/getPostData/:id get post by id
      * http://localhost:3000/api/getPostComments/:postid return a posts comments
      * http://localhost:3000/api/createPost post a post to the database
      * http://localhost:3000/api/createComment post a comment to the database and bump the parent post
      * http://localhost:3000/api/getPost/:postid/ get a post's data from the post table (can be joined with other tables if data isn't retrieved separately, currently only retrieves the single table's results)
      * http://localhost:3000/api/getPostComments/:postid/ get all comments for a particular post (can be joined with other tables if data isn't retrieved separately, currently only retrieves the single table's results)
      * http://localhost:3000/api/deletePost deletes all child comments of a post, and then deletes the post
      * http://localhost:3000/api/userDeleteOwnComment allows user to delete a comment created by their user account (can be adjusted to also work by an admin user)
      * http://localhost:3000/api/getRecentPosts/ returns the 10 most recent posts ordered by Bump column
      * http://localhost:3000/api/getFlaggedPosts/ returns all flagged posts
      * http://localhost:3000/api/getFlaggedComments/ returns all flagged comments
      * http://localhost:3000/api/flagPost/ flag a post 
      * http://localhost:3000/api/flagComment/ flag a comment
      * http://localhost:3000/api/unflagPost/ unflag a post 
      * http://localhost:3000/api/unflagComment/ unflag a comment
      * http://localhost:3000/api/updateUser put req to update user info
      * http://localhost:3000/api/updateStudent put req to update student info
      * http://localhost:3000/api/updateFaculty put req to update faculty info
      * /api/registerUser registers user data in user table
      * /api/registerStudent registers student data in student table
      * /api/registerFaculty registers faculty data in faculty table
      * /api/getcomment/:id get id by comment
      * /api/didUserFlagPost/:postid check if logged in user flagged a given post
      * /api/didUserFlagComment/:commentid check if logged in user flagged a given comment
      * /api/editPost put request to edit a given post by id       
      
    * demos that can be removed when implemented in FE
        * http://localhost:3000/api/createPostDemo form to post a Post to database 
        * http://localhost:3000/api/createCommentDemo form to post a comment to the database
        * http://localhost:3000/api/adminDeletePost form for the deletePost endpoint
        * http://localhost:3000/api/userDeleteOwnCommentDemo form for the userDeleteOwnComment endpoint
        * http://localhost:300/api/flagPostDemo form to flag a post
        * http://localhost:300/api/flagCommentDemo form to flag a comment
        * http://localhost:300/api/unflagPostDemo form to unflag a post
        * http://localhost:300/api/unflagCommentDemo form to unflag a comment
        


* ## Getting Started
    * ### Clone Project
        * create a local "projects" directory workspace to work in
        * clone down tiger-talks from the GitHub repository (https://github.com/AzzieDevelopment/tiger-talks)
        * cd into your tiger-talks directory
        * make sure you are on the right branch when changing any code
            * pull changes from remote to ensure your branches are up to date
        * #### Troubleshooting
            * Unable to Commit: you might have to configure your email and name globally on Git on the terminal using ```git config --global user.email "your@email"``` and  ```git config --global user.name "Your Name"```
           
   * ### Commands (when in root directory)
        * To install dependencies, run command: ```npm install``` 
        * To host FE only (port 4200): ``` npm run serve```
        * To build FE: ```npm run build``` 
        * To host BE and FE (port 3000): ```npm run express```
        	* _Assumption_: you already built the FE with the above command 

    * ### Database
        * see sql directory for database scripts
