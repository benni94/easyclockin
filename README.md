## Download 

<a href="https://minhaskamal.github.io/DownGit/#/home?url=https:%2F%2Fgithub.com%2Fbenni94%2Feasyclockin%2Ftree%2Fmaster%2FeasyClockIn" download>Click to here to download</a>

## Add the chrome extension `easy clock in` to chrome

<img style="display: block;-webkit-user-select: none;margin: auto;cursor: zoom-in;background-color: hsl(0, 0%, 90%);" src="https://bashvlas.com/blog/install-chrome-extension-in-developer-mode/example.gif" width="737" height="414">

https://bashvlas.com/blog/install-chrome-extension-in-developer-mode/

## Build the script

first change the "build" in package.json to 

=> "build": "INLINE_RUNTIME_CHUNK=false react-scripts build",

=> yarn build script

=> npm run build

go to chrome extensions, manage extension and load unpacked to test it

after that, you can build and click in the management extensions `update`

pack it and make it usable in the app store:
https://github.com/lxieyang/chrome-extension-boilerplate-react

## Change the expiration 
the renderFinder function in the folder `functions` defines the expiration of the application.