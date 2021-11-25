#!/usr/bin/env node

let inputArr = process.argv.slice(2);
let fs = require("fs");
let path = require("path");

// node main.js organize "E:\DEV project\File System Organizer NodeJS\FileSystemOrganizer\src"

// taking input in command line 
// node main.js tree "directoryPath"
// node main.js organize "directoryPath"
// node main.js help 

let command = inputArr[0]; 

let types = {
    media: ["mp4", "mkv" ,"gif","svg","jpg"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"]
}

switch (command) {
    case "tree":
        treeFn(inputArr[1]);
        break;

    case "organize":
        organizeFn(inputArr[1]);
        break;

    case "help":
        helpFn();
        break;

    default:
        console.log("Please input right command");
        break;
}

function treeFn(dirPath) {
    console.log("Tree command Implemented for ", dirPath);
    if (dirPath == undefined) {
        let currDir = process.cwd();
        treeHelper(currDir, "");
        return;
    } else {
        //check of the path exist
        let doesExist = fs.existsSync(dirPath);
        if (doesExist) {
            
            treeHelper(dirPath, "");
         
        } else {
            console.log("Kindly enter the Correct Path");
            return;
        }
    }
} 

function treeHelper(dirPath, indent) {
    //base condition - if no path 
    
    //is file or folder 
    //If its a folder check inside it if its a file print it 
    let isFile = fs.lstatSync(dirPath).isFile();

    if(isFile){
       let fileName =  path.basename(dirPath);
       console.log(indent + "├──" + fileName)
    } else{
        let dirName = path.basename(dirPath)
        console.log(indent + "└──" + dirName);
        let children = fs.readdirSync(dirPath); 
        for(let i=0;i<children.length;i++){
          let childPath =  path.join(dirPath,children[i]);
            treeHelper(childPath);
        }
    }

}

//User will Folder Path  
//orgaizeFn will create different directory 
//for different files based on file type
function organizeFn(dirPath) {

    console.log("Organize command Implemented for ", dirPath);

    // input the given directory path 
    //create a directory named organized files
    //check all files type and its category in that directory 
    // copy/cut files to that organized directory 
    let destPath;
    if (dirPath == undefined) {
        destPath = process.cwd(); 
        return;
    } else {
        //check of the path exist
        let doesExist = fs.existsSync(dirPath);
        if (doesExist) {
            //if path exist start organising it

            //creating a folder of Organized Files
             destPath = path.join(dirPath, "organized_files");
            if (fs.existsSync(destPath) == false) {
                fs.mkdirSync(destPath);
            }

        } else {
            console.log("Kindly enter the Correct Path");
            return;
        }
    }

    organizeHelper(dirPath,destPath);

} 

function organizeHelper(src,dest){
     // Identify categories of all files present in input directory 
    let childNames = fs.readdirSync(src);
    console.log(childNames); 

    for(let i=0; i<childNames.length;i++){
       let childAddress = path.join(src,childNames[i]);
       let isFile = fs.lstatSync(childAddress).isFile(); 

       if(isFile) {
         let category = getCategory(childNames[i]); 
    // copy/cut files to that organized directory 
        console.log(childNames[i],"belongs to this", category);
        sendFiles(childAddress,dest,category);

       }
    }
} 

function sendFiles(srcFilePath,dest,category){

    let categoryPath = path.join(dest,category);

    if(fs.existsSync(categoryPath) == false){
        fs.mkdirSync(categoryPath);
    }  

    let fileName  = path.basename(srcFilePath);
    let destFilePath = path.join(categoryPath,fileName);
    fs.copyFileSync(srcFilePath,destFilePath);
    //after copying removing the original files 
    fs.unlinkSync(srcFilePath);
    console.log(fileName, "copied to" , category);
}

function getCategory(name){
    let extension = path.extname(name); 
    //to remove the dot before extension
    extension = extension.slice(1); 

    for(let type in types){
        let curTypeArr = types[type];
        for(let i=0; i < curTypeArr.length ;i++){
            //check 
            if(extension == curTypeArr[i]){
                return type;
            } 
           
        }
    }  
    return "others";
}

function helpFn(dirPath) { 

    console.log(`
        List of all the commands : 
        node main.js tree "directoryPath"
        node main.js organize "directoryPath"
        node main.js help 
  `)

} 
