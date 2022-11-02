## Download 

<a href="https://minhaskamal.github.io/DownGit/#/home?url=https://github.com/benni94/easyclockin/tree/master/build" download>Click to here to download</a>

## Add the chrome extension `easy clock in`

https://developer.chrome.com/docs/extensions/mv2/getstarted/#:~:text=Open%20the%20Extension%20Management%20page%20by%20navigating%20to

## Build the script

first change the "build" in package.json to 

=> "build": "INLINE_RUNTIME_CHUNK=false react-scripts build",

=> yarn build script

=> npm run build

go to chrome extensions, manage extension and load unpacked to test it

after that, you can build and click in the management extensions `update`

pack and make it usable in the app store
https://github.com/lxieyang/chrome-extension-boilerplate-react


TEST: 
const findAndExecuteInDom = (args) => {
    args.forEach(arg => {
        const doc = document.querySelectorAll(arg.htmlElement);
        const matches = Array.prototype.slice.call(doc);
        const filterElements = (element) => {
            return element[arg.textPlacement]?.toString().includes(arg.textContent);
        }
        matches.filter(filterElements)[0].click();
        
    })
}

findAndExecuteInDom([{htmlElement:"a", textPlacement:"textContent", textContent:"categories"}]);