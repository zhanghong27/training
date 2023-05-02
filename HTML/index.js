console.log("hello");

// console.log(document.getElementById("root"));

function foo() {
  console.log(this);
}

foo();

console.log(document.body.children);
console.log(document.body.childNodes);

let root = document.getElementById("root");

root.addEventListener("click", (event) => {
  alert(event.currentTarget); // what has the event listener
  // alert(event.target); // what triggered the event
});
