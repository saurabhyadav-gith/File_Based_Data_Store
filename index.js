
//acquiring store to store key value pair
//foo.json where all the json data will be stored
//change foo.json to create your own path for saving
const store = require('data-store')({path : process.cwd()+'/foo.json'});

//create function to add key value pair
function create(key,value,timeout = 0){
    if(typeof key != 'string' || key.length > 32){
        console.log("Invalid key type. Please enter a string key"); //error
    }
    else if(store.has(key))
    console.log("The key is already present");

    else{
        var l;
        if(timeout == 0){
            l =[value,timeout];
        }
        else{
            var time = (new Date()).getTime()/1000;
            l = [value,time+timeout];
        }
        if(key.length <= 32){
            store.set(key,l);
        }
}
}

//read function to read a value of an existing key
function read(key){
    if(store.has(key)){
        var b = store.get(key);
        if(b[1]!=0){
            var time = (new Date()).getTime()/1000;
            if(time < b[1]){
                console.log(store.get(key));
            }
            else{
                console.log("Time-To-Live for "+key+" has expired"); //error
            }
        }
        else{
            console.log(store.get(key));
        }
    }
    else{
        console.log("The key does not exist. Please create first.") //error
    }
}

//function to delete an existing key
function deletekey(key){
    if(store.has(key)){
        var b = store.get(key);
        if(b[1]!=0){
            var time = (new Date()).getTime()/1000;
            if(time < b[1]){
                store.del(key);
                console.log("Successfully deleted the key and value");
            }
            else{
                store.del(key);
                console.log("Time-To-Live for "+key+" has expired"); //error
            }
        }
        else{
            store.del(key);
            console.log("Successfully deleted the key and value");
        }
    }
    else{
        console.log("No such key found"); //error
    }
}
//exporting to make the functionality accessible outside the module
module.exports.store = store;
module.exports.create = create;
module.exports.read = read;
module.exports.deletekey = deletekey;
