//declared like this, so they can also be available inside the  module
const getName = (name) => name;
const getSurname = (surname) =>  surname;
module.exports.getName = getName;
module.exports.getSurname = getSurname;
module.exports.getFullName = (name, surname) => `${name} ${surname}`;