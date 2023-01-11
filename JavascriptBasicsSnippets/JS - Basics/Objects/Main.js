const name2 = "Pedro";


// *Object "person"
const person = {
    name: "John",
    name2,// passing te value from the const above
    age: 26,
    isMarried: false,
};

// * standart destructur
const name1 = person.name;
const age1 = person.age;
const isMarried1 = person.isMarried;

 // *destructurise in one line

 const {name, age, isMarried} = person;
 console.log(person.name2)
 console.log(name2)


 // SPREAD OPERATOR
 //* same object like person but chaging one property
 const person2 = {...person, name: "Jack"};

