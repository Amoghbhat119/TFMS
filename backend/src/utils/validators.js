exports.validateEmail = (email) => {

  const regex = /\S+@\S+\.\S+/;

  return regex.test(email);

};


exports.validateRequired = (fields) => {

  for (let key in fields) {

    if (!fields[key]) {
      return `${key} is required`;
    }

  }

  return null;

};