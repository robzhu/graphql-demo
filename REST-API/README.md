# express-starter
Starter kit for building an express/node app using babel for ES6 and await/async support. Uses babel-watch for a save/refresh workflow. 

## Clone and install packages
```
git clone https://github.com/robzhu/express-starter
cd express-starter
npm i
```

## Dev workflow
This project supports a save/refresh workflow via babel-watch. Run the following command to re-transpile whenever a file is changed and re-start the node process:
```
npm run dev
```

Now, edit src/index.js (for example, change the string returned from the default route), save, and refresh your browser to see your chages. 
