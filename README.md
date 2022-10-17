#Build to download:

https://github.com/benni94/easylogin/tree/master/build


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

page to test : http://testphp.vulnweb.com/login.php

## to build a client secret

=> https://dev.to/bayardlouis470/create-chrome-extension-in-react-3pna

## Build the script

first change the "build" in package.json to 

=> "build": "INLINE_RUNTIME_CHUNK=false react-scripts build",

=> yarn build script

=> npm run build

then go to chrome extensions, manage extension and load unpacked to test it

after that, you can build and click in the management extensions `update`


https://medium.com/litslink/how-to-create-google-chrome-extension-using-react-js-5c9e343323ffs

to pack and make it usable in the app store
https://github.com/lxieyang/chrome-extension-boilerplate-react

=> NODE_ENV=production npm run build
