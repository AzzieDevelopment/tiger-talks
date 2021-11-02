# ReadMe


* ## Assumptions
    * Late(est) version of node/npm installed
    * Late(est) version of Git 
    * Angular is installed globally on your system
        * run:
        ```npm install -g @angular/cli```
		(This will install the Angular CLI globally)
        * verify that Angular is installed using "ng --version"
    
* ## Current Endpoints
    * http://localhost:3000/ frontend landing page
    * http://localhost:3000/loggedIn see if a users session is logged in
    * http://localhost:3000/register Registration Page
    * http://localhost:3000/login Login Page
    * http://localhost:3000/hello simple response string
    * http://localhost:3000/selectExample get all users from DB
    * http://localhost:3000/hosturl return host from env variable

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
        * To host frontend with backend (port 3000):
          ```npm run build-all```
           NOTE: only run when the frontend has changed or if you haven’t built the angular project yet; otherwise, proceed with command 4
        * To host frontend only (port 4200):
           ``` npm run serve```
        * To build frontend:
               ```npm run build``` 
        * To host backend (port 3000):
             ```npm run express```


    * ### Express
        * CD into tiger-talks folder (root)
        * To install dependencies, run command: ```npm install``` 
            * (This is necessary because we cant use version control for node  modules)
        * If the frontend has changed, you need to rebuild the files
            * run command: ```npm run build```
        * To start backend, run command: ```npm run express```
        * Go to http://localhost:3000 and test endpoints

    * ### Database
        * see sql directory for database scripts

    * ### Frontend
        * use ```ng serve``` to start the application thru localhost:4200/
            * use "ng serve --open" to automaticlly open it in your default browser on http://localhost:4200/
            * #### Troubleshooting
                * Client not Opening: try running
                 ```npm install @angular-devkit/build-angular```
