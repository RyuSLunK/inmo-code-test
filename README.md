# inmo-code-test
Code test for InMotion Software
## How to run the application
1. Clone the repo
2. Open your command prompt
3. navigate inside the project `cd directory/inmo-code-test`
4. Install the dependencies for a simple dev server `npm install`
5. Start your dev server `node server.js`
6. Open Google Chrome
7. Navigate to `localhost:5000`

## Info about file structure
All of the code is inside the `inmo-code-test/public/` directory.
### CSS
I only had one css file, and I also used bootstrap.css. I wanted to keep it simple.

### Javascript
Since I used angular.js, I broke up my js folders into the directories I've become most accustomed to using. 
1. The `libs` folder has all of my javascript libraries. For this app I used angular.js angular-ui-bootstrap, and lodash.js
2. I was able to contain most of my programming in the movie directive. I probably could have done this application with a controller instead of a directive, but I always like to have the flexibility of being able to use directive magic later on in development if I decide to.
3. Modules is just where I declare the app, and if I need to have any services or app wide constants I usually put them here.
4. require.js is actually a file that I use in combination with webpack (a node module) in order to generate scripts.min.js.
5. scripts.min.js is the file that I call on the html page, it contains all the app javascript dependencies. Usually you minify them but I left it uglified for development purposes. 

### HTML
The root of the application is index.html. All of the other templates are either bundled into the ui-bootstrap.js file, or can be found in the templates folder. 
