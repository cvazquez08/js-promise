const p1 = new Promise((resolve, reject) => {  
  if (true)  
    throw new Error("rejected!"); // promise is already evaluated as true
  else
    resolve(4);
});

p1.then((val) => val + 2)  
 .then((val) => console.log("got", val))
 .catch((err) => console.log("error: ", err.message)); //runs catch since promise passed a rejection
// => error: rejected!


const p2 = new Promise((resolve, reject) => {  
  if (false)  
    throw new Error("rejected!"); 
  else
    resolve(4); // resolves === return 4
});

p2.then((val) => val + 2)  // then waits for p1 to run then does val + 2
 .then((val) => console.log("got", val)) // .then chains the pervious
                                        // can chain .then
                                        // once previous promise runs, console got 6
 .catch((err) => console.log("error: ", err.message));
// => got 6


const p4 = Promise.resolve(3);
const p5 = 1337;
const p6 = new Promise((resolve, reject) => {
  setTimeout(resolve, 3000, 'foo');
}); 

Promise.all([p4, p5, p6]).then(values => { // will fail all if 1 rejects
  console.log(values); 
});
//[3, 1337, "foo"] will return this because p6 has a setTimeout
// all other promises wait till p6 is completed before the return


const p7= Promise.reject(3);
const p8 = 1337;
const p9 = new Promise((resolve, reject) => {
  setTimeout(resolve, 3000, 'foo');
}); 

Promise.all([p7, p8, p9]).then(values => { // will fail all if 1 rejects
  console.log(values);  
});
// uncaught in promise (3)
// p8 & p9 will not execute since p7 rejects 


Promise.all([
  new Promise(resolve => setTimeout(resolve, 1500)),
  new Promise(resolve => setTimeout(resolve, 900)),
  new Promise(resolve => setTimeout(resolve, 2200))
])
.then(results => results.length.b.c)
.then(c => console.info(c))
.catch(err => console.error("this is the error ", err))

// runs the .catch since c is undefined

// **************************************************

Promise.all([
  new Promise(resolve => setTimeout(resolve, 1500)),
  new Promise(resolve => setTimeout(resolve, 900)),
  new Promise(resolve => setTimeout(resolve, 2200))
])
.then(results => results.length.b)  // returns [undefined, undefined, undefined].length.b
.then(c => console.info(c)) // b is undefined and sets it to c and console.log(undefined)
.catch(err => console.error("this is the error ", err))