let inputArr = process.argv.slice(2);
let fs = require("fs"); 
let path = require("path");

// till 20 minutes


// taking input in command line 
// node main.js tree "directoryPath"
// node main.js organize "directoryPath"
// node main.js help 

let command = inputArr[0];
 
switch (command) {
    case "tree":
        treeFn(inputArr[1]);
        break; 

    case "organize" : 
    organizeFn(inputArr[1]);
        break;

    case "help" : 
    helpFn();
        break;

    default:
        console.log("Please input right command");
        break;
} 

function treeFn(dirPath){
    console.log("Tree command Implemented for ",dirPath);

} 

//User will Folder Path  
//orgaizeFn will create different directory 
//for different files based on file type
function organizeFn(dirPath){ 

    console.log("Organize command Implemented for ",dirPath);
    
    // input the given directory path 
    //create a directory named organized files
    //check all files type and its category in that directory 
    // copy/cut files to that organized directory 

    if(dirPath == undefined){
        console.log("Kindly enter the Path");
        return;
    } else { 
        //check of the path exist
        let doesExist = fs.existsSync(dirPath);
        if(doesExist){
            //if path exist start organising it

            //creating a folder of Organized Files
            let destPath = path.join(dirPath,"organized_files");
            fs.mkdirSync(destPath);

        }else{
            console.log("Kindly enter the Correct Path");
            return;
        }
    }






}

function helpFn(dirPath){
  console.log(`
        List of all the commands : 
        node main.js tree "directoryPath"
        node main.js organize "directoryPath"
        node main.js help 
  `)
    
}