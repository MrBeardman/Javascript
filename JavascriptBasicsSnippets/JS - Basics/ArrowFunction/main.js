const bestPizza = "peperoni";

// *function declaration
// ! this gets hoisted uptop
function sayHi(firstName) {
  return ` Hi, ${firstName}!`;
}

// *Function Expression
//! this will not get hoisted
const squareMe = function (x) {
  return x * x;
};

//* Normal vs Arrow functions
const sumNumbers = function (x, y = 4) {
  const total = x + y;
  return total;
};
console.log(sumNumbers(1, 0));

//* Arrow function
const sumNumbersArrow = (x, y = 4) => x + y;
console.log(sumNumbersArrow(1, 7));

// * if we have one parameter we dont need paratheses
const sumNumbersOne = (x) => x + x;
console.log(sumNumbersOne(5));

// * student object
const newStudent = function (firstName, lastName, studentAge) {
  const student = {
    name: `${firstName} ${lastName}`,
    age: studentAge,
  };
  return student;
};
console.log(newStudent("john", "matyas", 26));

// *Student Objects with arrow function
//! if we want to return an object within arrow fucntion we have to wrap that object in round brackets, the yellow one
const newStudentArrow = (firstName, lastName, studentAge) => ({
  name: `${firstName} ${lastName}`,
  age: studentAge,
});

//* "this" keyword
const btn = document.querySelector('button').addEventListener('click', inactivate);

const inactivate = function(){
    this.classlist.add('inactive');
}
//* same but with an arrow function
//const inactivate2 = () => this.classlist.add('inactive');
const inactivate2 = () => this.classlist.add('inactive');

const changeButtonText = function(){
    this.style.transfrom =  'scale(2)';
    console.log(`inside ${this}`);
    //! this below doesnt work, because its scoped to the function below and its selecting the whole window, not the button itself
    setTimeout(function(){
        console.log(`outside ${this}`);
        this.style.transfrom =  'scale(1)';
    }, 1000)
}

const changeButtonTextArrow = function(){
    this.style.transfrom =  'scale(2)';
    console.log(`inside ${this}`);
    //* this will work because arrow function scopes to the parent
    setTimeout(() =>{
        console.log(`outside ${this}`);
        this.style.transfrom =  'scale(1)';
    }, 1000)
}

//*Callback functions



