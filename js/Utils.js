// let errorHandler = function handleErrors(response) {
//     if (!response.ok) {
//         throw Error(response.statusText);
//     }
//     return response;
// }

// export {errorHandler};

module.exports = {
    handleError: function(response) {
      if (!response.ok) 
        throw new Error(response.statusText);
      return response;
    },
  };