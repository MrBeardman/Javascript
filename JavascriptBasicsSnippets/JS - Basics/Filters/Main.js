let names = ["Peter", "John", "Carol"];

// *.map()
const namePlusOne = names.map( (name) =>{
    console.log(name);
    return name + "1";
})
console.log(namePlusOne) // ['Peter1', 'John1', 'Carol1']

// *.filter
const namesNotPeter = names.filter((name)=>{
return name !== "Peter";
})
console.log(namesNotPeter) // ['John', 'Carol']
