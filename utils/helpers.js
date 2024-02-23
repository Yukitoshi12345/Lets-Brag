// Export an object containing utility functions
module.exports = {
  // Function to format a date object into a time string
  format_time: (date) => {
    // Use the `toLocaleTimeString` method to format the date as a time string
    // based on the system's locale
    return date.toLocaleTimeString();
  },
};