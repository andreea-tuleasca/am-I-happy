//es6 modules
// import getFullName, {getName, getSurname} from './es6';

// console.log('getFullName', getFullName('John', 'Doe'));
// console.log('getName', getName('John'));
// console.log('getSurname', getSurname('Doe'));

//es5 modules
//const { getFullName, getName, getSurname } = require('./es5');

// Get name from array of objects
const users = [
  { id: 1, name: 'Jack', isActive: true, age: 20 },
  { id: 2, name: 'John', isActive: true, age: 18 },
  { id: 3, name: 'Mike', isActive: true, age: 30 },
];

function getNameArray(userArray) {
  if (!userArray.length) return [];
  if (!userArray[0]?.name) return []; // throw new Error("User array not in the right format")
  return userArray
    .sort((user1, user2) => user2.age - user1.age)
    .filter((user) => user.isActive)
    .map((user) => user.name);
}

console.log(getNameArray(users));

//multiply(a)(b) --> closures

const multiply = (a) => {
  return (b) => a*b; 
}
console.log('multiply', multiply(3)(5));

const counter = () => {
  let currentCount = 0;
  return {
    increment: (numberToAdd = 1) => {
      currentCount += numberToAdd;
    },
    getValue: () => currentCount
  }
}
const getCounter = counter();
getCounter.increment(5);
console.log('counter value', getCounter.getValue());
getCounter.increment(6);
console.log('counter value', getCounter.getValue());


//sum(a, b, c) --> sum(a)(b)(c) -->  currying
const curry = (fn) => {
  const noOfTotalArgs = fn.length;
  const f1 = (...args) => {
    if(args.length >= noOfTotalArgs) {
      console.log('Enough args');
      return fn(...args);
    } else {
      console.log("Need more args");
      return (...newArgs) => {
        const allArgs = args.concat(newArgs);
        return f1(...allArgs);
      }
    }
  };
  return f1;
}

const currySum = curry((a,b,c) => a+b+c);
const currySum1 = currySum(1);
const currySum2 = currySum1(2);
const currySum3 = currySum2(3);
console.log(currySum3);

//array add element --> !!!! do not use push
const addItemToArray = (array, item) => [...array, item];
console.log('add item', addItemToArray([1, 2, 3], 4));

//2 arrays --> spread or use concat for ecmascript5
const concatArr = (arr1, arr2) => [...arr1, ...arr2];
console.log('concat arrays', concatArr([1, 2, 3], [4, 5]));

//find name in array of objects
const usersA = [
  {
    id: 1,
    name: "Jack",
    isActive: true,
  },
  {
    id: 2,
    name: "John",
    isActive: true,
  },
  {
    id: 3,
    name: "Mike",
    isActive: false,
  },
];
const findNameinArr = (arr, name) => !!arr.find(el => el.name === name);
const someNameinArr = (arr, name) => arr.some(el => el.name === name);
const indexNameinArr = (arr, name) => {
  const index = arr.findIndex(el => el.name === name);
  return index >= 0;
}
console.log('Is John in array', findNameinArr(usersA, 'John'));
console.log('Is Jon in array', someNameinArr(usersA, 'Jon'));
console.log('Is Mike in array', indexNameinArr(usersA, 'Mike'));

//remove duplicates in array
const array = [1, 2, 2, 3, 1, 4, 5, 3, 1];

const objectArray = [{id: 1}, {id: 2}, {id: 2}, {id: 1},]; //not working for this

const removeDuplicates = (array) => {
  const newArray = [];
  array.forEach(element => {
    if(!newArray.includes(element)) {
      newArray.push(element);
    }
  });
  return newArray;
}
console.log('remove duplicates junior', removeDuplicates(array));

const removeDuplicatesSet = (array) => [...new Set(array)];

console.log('remove duplicates set', removeDuplicatesSet(array));

const removeDuplicatesReduce = (array) => array.reduce((acc, el) => acc.includes(el) ? acc : [...acc, el], []);

console.log('remove duplicates reduce', removeDuplicatesReduce(array));

//sort array of numbers
const unsortedArray = [1, 2, 3, 4, 5, 3, 2];
const sortArray = (array) => [...array].sort((a, b) => a - b);
console.log('Sorted array', sortArray(unsortedArray));

//sort array of books by author's last name
const books = [{
  name: "Harry Potter", author: 'JK Rowling'
},
{
  name: "Warcross", author: "Marie Lu",
},
{
  name: "The hunber games", author: "Suzanne Collins"
}]

const sortByLastName = (array) => [...array].sort((a, b) => {
  const lastNameA = a?.author?.split(" ");
  const lastNameB = b?.author?.split(" ");
  return lastNameA[1] < lastNameB[1] ? -1 : 1;
});
console.log('Last name sorted', sortByLastName(books), books);

//range function
const range = (start, end) => {
  let arr = [];
  for(i=start;i<end;i++) {
    arr = [...arr, i];
  }
  return arr;
}
console.log('range result', range(1,50));

const rangeKeys = (start, end) => [...Array(end-start).keys()].map(el => el+start);
console.log('range keys result', rangeKeys(1,50));

//implement shuffle
console.log('not shuffled', books);
const shuffle = (array) => array.map(el => ({value: el, sort: Math.random()}))
                                .sort((el1, el2) => el1.sort - el2.sort)
                                .map(a => a.value);
console.log('shuffled', shuffle(books));

//find the number of occurences of minimum value in the list
const minimumNo = (array) => {
  const sortedArray = [...array].sort();
  return sortedArray.reduce((acc, el) => el === sortedArray[0] ? acc+1 : acc, 0);
}

console.log('minimumNo', minimumNo(array), array);

//this

function getItem() {
  console.log('this function', this);
};
getItem();

const item = {
  title: "Ball",
  getItem() {
    console.log('this object', this)
  } 
}

item.getItem();

class Item {
  title = "Ball";
  getItem() {
    console.log('this class', this);
  }
}

const newItem = new Item();
newItem.getItem();

class FunctionItem {
  title = "Ball";
  getItemFunction() {
    function someFn() {
      console.log('this function class', this)
    }
    someFn();
  }
}

const functionItem = new FunctionItem();
functionItem.getItemFunction();

// !!!!!! arrow function gets the context of our parent
// function does not, u get undefined

//create a class for employee which takes id and name in constructor and has a salary property

class Employee {
  constructor(id, name) {
    if(!id || !name) {
      throw new Error('Id and name are required');
    }
    this.id = id;
    this.name = name;
  }
  setSalary(salary) {
    this.salary = salary;
  }
  getSalary() {
    return this.salary;
  }
  getId() {
    return this.id;
  }
  getName() {
    return this.name;
  }
}

const employee = new Employee('1123', 'Thomas');
employee.setSalary('13000');
console.log('employee', employee);

//create class manager that is employee but has department property

class Manager extends Employee {
  getDepartment() {
    return this.department;
  }
  setDepartment(department) {
    this.department = department;
  }
}

const manager =  new Manager('222', 'Tudor');
manager.setDepartment('IT');
console.log('manager', manager);


//make employee a prototype

var EmployeePrototype =  function(id, name) {
  if(!id || !name) {
    throw new Error('Id and name are required');
  }
  this.id = id;
  this.name = name;
}

EmployeePrototype.prototype.getSalary = function() {
  return this.salary;
}

EmployeePrototype.prototype.setSalary = function() {
  this.salary;
}
EmployeePrototype.prototype.getId = function() {
  return this.id;
}
EmployeePrototype.prototype.getName = function() {
  return this.name;
}

const employeePrototype = new EmployeePrototype(1, 'Andreea');
console.log('employeePrototype', employeePrototype);

var ManagerPrototype = function(params) {
  EmployeePrototype.apply(this, arguments);
  this.smth = params.smth;
};

ManagerPrototype.prototype = Object.create(EmployeePrototype.prototype);
ManagerPrototype.prototype.constructor = ManagerPrototype;
ManagerPrototype.prototype.getDepartment = function () {
  return this.department;
}
ManagerPrototype.prototype.setDepartment = function (department) {
  this.department = department;
}

const managerPrototype =  new Manager(2, 'John');
managerPrototype.setDepartment('HR');
console.log('managerPrototype', managerPrototype)

//debounce function
const shouldBeCalledOnce = (args) => {
  console.log('I only show once', args);
}
const debounce = (callback, timeout = 1000) => {
  let timer;
  return (args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {callback.apply(this, [args])}, timeout);
  }
}
const callingFunction = debounce(shouldBeCalledOnce, 1000);
console.log('called function', callingFunction('foo'));
console.log('called function', callingFunction('foo'));
console.log('called function', callingFunction('foo'));
console.log('called function', callingFunction('foo'));
console.log('called function', callingFunction('foo'));

//throttle
const shouldBeCalledOncePerTimeout = (args) => {
  console.log('I only show once throttle', args);
}
const throttle = (callback, timeout= 1000) => {
  let isWaiting = false;
  return (...args) => {
  console.log('is waiting', isWaiting);
    if(!isWaiting){
      callback.apply(this, args);
      isWaiting=true;
      setTimeout(() => {
        isWaiting=false; }, timeout);
    }
  }
}
const callingThrottleFunction = throttle(shouldBeCalledOncePerTimeout, 2000);
console.log('called throttle function', setTimeout(() => {callingThrottleFunction('foo')}, 500));
console.log('called throttle function', setTimeout(() => {callingThrottleFunction('foo')}, 700));
console.log('called throttle function', setTimeout(() => {callingThrottleFunction('foo')}, 1500));
console.log('called throttle function', setTimeout(() => {callingThrottleFunction('foo')}, 3000));

//highlight words with length > 8 chars
const paragraph = document.querySelector("#yellowBackground");
paragraph.innerHTML = paragraph.innerHTML.split(' ')
                                        .map(word => word.length >=8 ? `<span style="background-color: yellow;">${word}</span>` : word)
                                        .join(' ');

//add link
const link = document.createElement("a");
link.href = "https://forcemipsum.com/";
link.innerText= "Text generated by Forcem Ipsum";
document.body.appendChild(link);

//put every sencence on a new line
const sentences = document.querySelector("#breakLines");
sentences.innerHTML = sentences.innerHTML.split(/\.[^.|<]/).map(sentence => `${sentence}.<br/>`).join('');

//add one event listener on parent
const list = document.querySelector('.names');
list.addEventListener('click', (e) => {
  if(e.target && e.target.classList.contains('name')) {
    console.log('I clicked: '+ e.target.innerText);
  }
});

//fetch

const useData = async () => {
  return fetch('https://api.github.com/users/gaearon/repos').then(res => res.json())
  .then(data => data)
  .catch(error => console.log('Error: ', error));
};

const logData = async() => {
 const data = await useData();
 console.log('Server data', data);
}

logData();

//callback
const asyncFunc = (callback) => {
  return setTimeout(() => callback('I am the callback'), 1000);
}

const callback = (result) => {
  console.log(result);
}

asyncFunc(callback);

//parallel callbacks
const asyncFunc1 = (callback) => {
  setTimeout(() => {
    callback(1);
  }, 3000);
}

const asyncFunc2 = (callback) => {
  setTimeout(() => {
    callback(2);
  }, 2000);
}

const asyncFunc3 = (callback) => {
  setTimeout(() => {
    callback(3);
  }, 1000);
}

const asyncParallel = (funcArray, callback) => {
  const funcArrayLength = funcArray.length;
  let executedCount = 0;
  let allResults = new Array(funcArrayLength);
  funcArray.forEach((func, index) => func(result => {
    allResults[index] = result;
    executedCount++;
    if(executedCount === funcArrayLength) {
      callback(allResults);
    }
  }));
}

asyncParallel([asyncFunc1, asyncFunc2, asyncFunc3], (result) => {
  console.log('async parallel', result); //1, 2, 3 (prints the result of every async function call, in order)
})

//use callback with promise
const asyncFunction =  (callback) => {
  setTimeout(() => {
    callback('I am data from async func');
  }, 2000);
};

const promisifyAsyncFunc = () => {
  return new Promise(resolve => {
    asyncFunc(data => resolve(data));
  });
}

promisifyAsyncFunc().then(data => console.log('I get data from promise -->', data));

// You have 2 functions which return promises. Map data from users and userStatuses to get array of users with id, name, isActive

const usersMap = [
  {
    id: 1,
    name: "Jack",
  },
  {
    id: 2,
    name: "John",
  },
  {
    id: 3,
    name: "Mike",
  },
];
const userStatuses = [
  {
    id: 1,
    isActive: true,
  },
  {
    id: 2,
    isActive: true,
  },
  {
    id: 3,
    isActive: false,
  },
];

const getUsers = () => {
  return new Promise((resolve) => {
    resolve(users);
  });
};

const getUserStatuses = () => {
  return new Promise((resolve) => {
    resolve(userStatuses);
  });
};


//solution 1, slow
getUsers().then(users => {
  console.log('users', users);
  return getUserStatuses().then(userStatuses => {
    console.log('userStatuses', userStatuses);
    return users.map(currentUser => {
      const currentUserStatus = userStatuses.find(userStatus => currentUser.id === userStatus.id);
      return {...currentUser, isActive: currentUserStatus.isActive};
    });
  });
}).then(data => console.log('Mapped async data', data));

//solution 2, in parallel
const mapUsers = (users, userStatuses) => {
  return users.map(currentUser => {
    const isActive= userStatuses.find(currentUserStatus => currentUser.id === currentUserStatus.id)?.isActive;
    return {...currentUser, isActive};
  });
}
Promise.all([getUsers(), getUserStatuses()]).then(([users, userStatuses]) => mapUsers(users, userStatuses))
                                            .then(mappedUsers => console.log('Mapped async parallel data', mappedUsers));

//async await
const showMappedUsers = async () => {
  try {
  const usersAsync =  await getUsers();
  const usersStatusAsync = await getUserStatuses();
  const mappedUsers = mapUsers(usersAsync, usersStatusAsync);
  console.log('Mapped async data sequential', mappedUsers);
  } catch(e) {
    console.log("Error: ", e);
  }
};
showMappedUsers();

//multiple fetch attempts
const fetchData = async (url) => new Promise((resolve, reject) => {
  setTimeout(() => {reject('Cannot fetch data')}, 1000);
});
const fetchDataTimes = async (url, times) => {
  let timesFetched = 0;
  const tryDataFetch = async () => {
      timesFetched++;
      try {
        return await fetchData('url');
      } catch(e) {
        console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!');
        if(timesFetched === times) {
          return Promise.reject(e);
        }
        return setTimeout(tryDataFetch, 2000*timesFetched);
      }
    };
  return tryDataFetch();
};

const showData = async () => {
  const data = await fetchDataTimes('testUrl', 3);
  console.log('multiple fetch attempts', data);
};
showData();

//deep comparison function
const compare = (a, b) => {
  if(typeof a !== typeof b) {
    return false;
  }
  if(a == b) {
    return true;
  }
  //for array
  if(Array.isArray(a)) {
    if(a.length !== b.length) {
      return false;
    }
    return a.every((el, index) => compare(el, b[index]));
  }
  if(a instanceof Object && b instanceof Object) {
    if(Object.keys(a).length !== Object.keys(b).length){
      return false;
    }
    return Object.keys(a).every(key => compare(a[key], b[key]));
  }
  return false;
}
console.log('compare 5 and "5" false', compare(5, "5"));
console.log('compare 5 and 5 true', compare(5, 5));
console.log('compare [] and [] true', compare([], []));
console.log('compare [] and [1, 2] false', compare([], [1,2]));
console.log('compare [1, 2] and [1, 2] true', compare([1,2], [1,2]));
console.log('compare [1, 2] and [1, 3] false', compare([1,2], [1,3]));
console.log('compare [{id: 1}] and [{id: 1}] true', compare([{id: 1}], [{id: 1}]));
console.log('compare {} and {} true', compare({}, {}));
console.log('compare {id: 1} and {id: 1} true', compare({id: 1}, {id: 1}));
console.log('compare {id: 1} and {id: 2} false', compare({id: 1}, {id: 2}));
console.log('compare {id: 1} and {id: 1, status: "free"} false', compare({id: 1}, {id: 1, status: "free"}));
console.log('compare {id: 1, status: {value: "test"}} and {id: 1, status: {value: "test"}} true', compare({id: 1, status: {value: "test"}}, {id: 1, status: {value: "test"}}));

//memoization function
const memoizeAddTen = () => {
  let cache = {};
  return (value) => {
    if(cache[value]) {
      console.log('from cache');
      return cache[value];
    }
    cache[value] = value+10;
    return cache[value];
  }
};

const addTen = memoizeAddTen();
console.log('memoizeAddTen', addTen(9));
console.log('memoizeAddTen cache', addTen(5));
console.log('memoizeAddTen cache', addTen(7));
console.log('memoizeAddTen cache', addTen(9));

//fibonacci

const fibonacciGenerator = (index, fibonacciArray = [0, 1], currentIndex = 2) => {
  if(currentIndex === index) return fibonacciArray;
  if(index === 0) return [0];
  if(index === 1) return [0,1];
  const currentFibonacciEl = fibonacciArray[currentIndex-1]+ fibonacciArray[currentIndex-2];
  const newFibonacciArray = [...fibonacciArray, currentFibonacciEl];
  return fibonacciGenerator(index, newFibonacciArray, currentIndex+1);
};
console.log('fibonacciGenerator 3', fibonacciGenerator(3));
console.log('fibonacciGenerator 1000', fibonacciGenerator(1000), fibonacciGenerator(1000).length);

//palindrome string
const checkPalindrome = (palindrome) => {
  return palindrome === palindrome.split('').reverse().join('');
}

console.log('checkPalindrome abcdcba', checkPalindrome('abcdcba'));
console.log('checkPalindrome abcdcbbbc', checkPalindrome('abcdcbbbc'));

//anagram
const checkAnagram = (word1, word2) => {
  if(word1.length !== word2.length) return false;
  let isAnagram = true;
  word1.split('').forEach(letter => {
    if(!word2.includes(letter)) {
      isAnagram = false;
    }
  });
  return isAnagram;
};

console.log('checkAnagram', checkAnagram('listen', 'silent'));
console.log('checkAnagram', checkAnagram('andreea', 'luca'));

//count vowels
const countVowels = (string) => {
  const vowels = ['a', 'e', 'i', 'o', 'u'];
  return string.toLowerCase().split('').reduce((acc, value) => vowels.includes(value) ? ++acc : acc, 0);
}

console.log('count vowels', countVowels('mamam'));
console.log('count vowels', countVowels('supercalifragilisticexpialidocious'));

//string to title case
const convertToTitleCase = string => string.toLowerCase().split(' ').map(word => word.substring(0,1).toUpperCase() + word.substring(1)).join(' ');
console.log('capitalize', convertToTitleCase('Mary had a LITTLE lamb'));


//connvert from 12 to 24 hours
const convertTo24HrsFormat = timeInput => {
  const timeNoMeridian = timeInput.substring(0, timeInput.length-2).toLowerCase();
  const meridian = timeInput.substring(timeInput.length-2).toUpperCase();
  const [hours, mins] = timeNoMeridian.split(':');
  if(hours === '12') {
    if(meridian === 'AM') {
      return '00'+":"+mins;
    }
    return timeNoMeridian;
  }
  if(meridian === 'AM') {
    return timeNoMeridian;
  }
  const hours24 = (Number(hours)+12).toString();
  return hours24 +":"+mins.padStart(2, 0);
};
console.log('00:10', convertTo24HrsFormat("12:10AM"));    // 00:10
console.log('05:00', convertTo24HrsFormat("5:00AM"));     // 05:00
console.log('12:33', convertTo24HrsFormat("12:33PM"));    // 12:33
console.log('13:59', convertTo24HrsFormat("01:59PM"));    // 13:59
console.log('23:08', convertTo24HrsFormat("11:8PM"));     // 23:08
console.log('22:02', convertTo24HrsFormat("10:02PM"));    // 22:02

// Map data to frontend format. The main element is location key and we need to map all data to it. We will have 5 objects at the end.

const loc = [
  {
    location_key: [32, 22, 11],
    autoassign: 1,
  },
  {
    location_key: [41, 42],
    autoassign: 1,
  },
];

const bulkConfig = [
  {
    dataValues: {
      config_key: 100,
    },
  },
  {
    dataValues: {
      config_key: 200,
    },
  },
];

// [{config_key: 100, location_key: 32, autoassign: 1}, {config_key: 100, location_key: 22, autoassign: 1}]

const mergeLocationConfig = (locationArray, bulkConfigArray) => {
  const expandedConfigArray = [];
  locationArray.forEach((location, index) => {
    location.location_key.forEach(key => 
      expandedConfigArray.push({config_key: bulkConfigArray[index]?.dataValues?.config_key, location_key: key, autoassign: location.autoassign}))
  });
  return expandedConfigArray;
};
console.log('[{config_key: 100, location_key: 32, autoassign: 1}, {config_key: 200, location_key: 22, autoassign: 1}]',mergeLocationConfig(loc, bulkConfig));

// Write a function to Replace parameters in url

const initialUrl = "/posts/:postId/comments/:commentId";

const replaceParamsInUrl = (urlTemplate, paramArray) => {
  let paramUrl = urlTemplate;
  paramArray.forEach(param => {
    paramUrl = paramUrl.replace(":" + param.from, param.to);
  });
  return paramUrl;
}
const resultUrl = replaceParamsInUrl(initialUrl, [
  { from: "postId", to: "1" },
  { from: "commentId", to: "3" },
]);
console.log(resultUrl);

// Format backend validation message to frontend format

const backendErrors = {
  email: {
    errors: [
      {
        message: "Can't be blank",
      },
    ],
  },
  password: {
    errors: [
      {
        message: "Must contain symbols in different case",
      },
      {
        message: "Must be at least 8 symbols length",
      },
    ],
  },
  passwordConfirmation: {
    errors: [
      {
        message: "Must match with password",
      },
    ],
  },
};

// ["Email: Can't be blank", "Password: Must contain symbols, Must be at least 8 symbols", "passwordConfirmation: Must match with password"]

const formatErrors = (rawErrorsObject) => Object.entries(rawErrorsObject)
  .map(([field, props]) =>  {
    let errorCount = props?.errors.length;
    return props?.errors.reduce((fieldErrorString, error) =>  {
    errorCount--;
    const formattedErrorString = fieldErrorString.concat(error.message);
    return  errorCount ? formattedErrorString +", " : formattedErrorString;
  }, field.toString()+": ")});

console.log('["Email: Cannot be blank", "Password: Must contain symbols, Must be at least 8 symbols", "passwordConfirmation: Must match with password"]', formatErrors(backendErrors))

// Transform flat list to nested list

const flatList = [
  {
    id: 1,
    name: "lvl 1 item 1",
    parentId: null,
  },
  {
    id: 2,
    name: "lvl 1 item 2",
    parentId: null,
  },
  {
    id: 3,
    name: "lvl 2 item 3",
    parentId: 1,
  },
  {
    id: 4,
    name: "lvl 3 item 4",
    parentId: 3,
  },
  {
    id: 5,
    name: "lvl 2 item 5",
    parentId: 2,
  },
];

const getChildren = node => {
  const children = flatList.filter(child => child.parentId === node.id);
  let nestedChildren = [];

  if(children.length > 0) {
    nestedChildren = children.map(child => getChildren(child));
  }
  return { id: node.id, name: node.name, children: nestedChildren};
}

const createNestedList = () => flatList.filter(item => item.parentId === null).map(getChildren);

console.log('nested list', createNestedList(flatList));

//[
// {
//    id: 1,
//    children: [
//      {
//        id: 3,
//        children: [
//          {
//            id: 4,
//            children: []
//          }
//        ]
//      }
//    ]
// },
// {
//    id: 2,
//    children: [
//      {
//        id: 5,
//        children: []
//      }
//    ]
// }
//]