// @flow
function add(one: any, two: any): number {
  return one + two;
}

add(1, 2);     
add("1", "2"); 
add({}, []); 

// @flow
function getNestedProperty(obj: any) {
  return obj.foo;
}

getNestedProperty({foo: 'some'});

// @flow
function fn(obj: any) {
  let foo: number = obj.foo;
} 

// @flow
function fn(obj: any) /* (:number) */ {
  let foo: number = obj.foo;
  if (foo === undefined) {
    return '';
  }
  let bar /* (:number) */ = foo * 2;
  return bar;
}

let bar /* (:number) */ = fn({ foo: 2 });


// @flow
function acceptsMaybeNumber(value: ?number) {
  if (typeof value === 'number') {
    return value * 2;
  }
}


// @flow
let foo: number = 1;
foo = 2;   // Works!
// $ExpectError
foo = 3; // Error!


//generics
function identity<One, Two, Three>(one: One, two: Two, three: Three) {
  return function(): One {
    return one;
  }
  
}

function identity<T>(value: T): T {
  return value;
}

function identity<T>(value: T): T {
  // $ExpectError
  return value; // Error!
}

// @flow
function identity<T: number>(value: T): T {
  return value;
}

let one: 1 = identity(1);
let two: 2 = identity(2);
// $ExpectError
let three: "three" = identity("three");//error


// @flow
function identity<T: string>(val: T): T {
  let str: string = val; // Works!
  // $ExpectError
  let bar: 'bar'  = val; // Error!
  return val;
}


// Parameterized generics
type Item<T> = {
  prop: T,
}

let item: Item<string> = {
  prop: 'value'
};

// Parameterized generics in class
// @flow
class Item<T> {
  prop: T;
  constructor(param: T) {
    this.prop = param;
  }
}

let item: Item<number> = new Item(42); // Works!
// $ExpectError
let item: Item = new Item(42); // Error!