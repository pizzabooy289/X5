# X5

# Getting Started

The Link to the GitHub Webpage

If you are going change the Port Number you have to go in to the following file and change the port number.

```
ContentFire-1.0.0\js\environment\setup.js
```

Download the libraries

```
$npm install
```

Start the server
```
$ npm run ContentFire
```

# File to modify 
* ContentFire\models\cf-schema.js    
* ContentFire\public\Custom\js\properties.js   
* ContentFireRepo\public\Custom\js\database.js

# Problems while Developing Project
This are some of the problems I had will build this project.

## Loading Resources

Loading data from file using Ajax call
* [Ajax sourced data - DataTables](https://datatables.net/examples/data_sources/ajax)

Had problems because browser would not load resourses.       
* [Failed to load resource: the server responded with a status of 404 (Not Found) issue in Nodejs app - Stack Overflow](https://stackoverflow.com/questions/58981613/failed-to-load-resource-the-server-responded-with-a-status-of-404-not-found-i)

## Cross Site Scripting (XSS)   
[Cross Site Scripting (XSS - OWASP) ](https://owasp.org/www-community/attacks/xss/)    

You can see the problem while using the DataTable Examples from local directory.      
<img src="https://github.com/johncuseyhub/GettingStarted/blob/main/ProblemsImages/RepositoriesList/CrossSiteScripting.png" alt="John Cusey Sandbox Logo" height="300" width="500">


 I want to read DataTable data from json file. Works when using express for the ADMIN account but not for the USERS account.      
* [Ajax in Jquery does not work from local file  - Stack Overflow](https://stackoverflow.com/questions/17947971/ajax-in-jquery-does-not-work-from-local-file)

## DevTools fail to laod Source Map

<img src="https://github.com/johncuseyhub/GettingStarted/blob/main/ProblemsImages/RepositoriesList/Failed_Load_SourceMap.png" alt="Failed Load Source Map" height="150" width="800">

[Error message "DevTools failed to load SourceMap: Could not load content for chrome-extension://..."](https://stackoverflow.com/questions/61339968/error-message-devtools-failed-to-load-sourcemap-could-not-load-content-for-chr)

## Dialog Missing Close Icon

[jQuery UI Dialog - missing close icon](https://stackoverflow.com/questions/17367736/jquery-ui-dialog-missing-close-icon)

## Post Request with Parameters in Express

[How To Retrieve URL and POST Parameters with Express - DigitalOcean](https://www.digitalocean.com/community/tutorials/use-expressjs-to-get-url-and-post-parameters)  

## Response Object in Express

[How To Use the res Object in Express](https://www.digitalocean.com/community/tutorials/nodejs-res-object-in-expressjs)    


## Mongoose - Set _id    
[How to set _id to db document in Mongoose? - stackoverflow](https://stackoverflow.com/questions/19760829/how-to-set-id-to-db-document-in-mongoose)            

# References  
* [Node winston logging | logging in Node - Youtube - productioncoder](https://www.youtube.com/watch?v=A5YiqaQbsyI)         
* [GitHub - Pull changes from a template repository - stackoverflow](https://stackoverflow.com/questions/56577184/github-pull-changes-from-a-template-repository)       

