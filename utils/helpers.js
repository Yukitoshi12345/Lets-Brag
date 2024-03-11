// Import the dayjs library for date manipulation
const dayjs = require('dayjs');

// Export an object containing utility functions
module.exports = {
  // Function to format a date object into "DD/MM/YYYY hh:mmA" format
  formatDate: (date) => dayjs(date).format('DD/MM/YYYY hh:mmA'),
  // Function to capitalise the first letter of the given text
  capitalize: (word) => word.charAt(0).toUpperCase() + word.slice(1),
  // Function to capitalise the first letter of every word in a title
  titleize: (title) => {
    // Split the title into an array of words
    let words = title.split(' ');
    // Capitalise the first letter of each word using map function
    words = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
    // Join the capitalised words back into a string
    return words.join(' ');
  },

  // Function to format a number to have two decimal places
  formatNumber: (num) => parseFloat(num).toFixed(2),
  ifEquals: function (val1, val2, options){
    return(val1 === val2) ? options.fn(this) :  options.inverse(this);
  }
};
