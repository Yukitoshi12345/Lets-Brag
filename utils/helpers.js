const dayjs= require('dayjs');

// Export an object containing utility functions
module.exports = {
  // Function to format a date object
  formatDate: date => dayjs(date).format('DD/MM/YYYY hh:mmA'),
  //capitalize the first letter of the given text
  capitalize: word => word.charAt(0).toUpperCase() + word.slice(1),
  //capitalize the first letter of every word of given title
  titleize : title => {
    let words = title.split(' ');
    words = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    return words.join(' ');
  }

};