const validate = (params, schema) => {
  return new Promise(async (resolve, reject) => {
    try {
      const value = await schema.validateAsync(params);
      return resolve(value);
    } catch (err) {
      return reject(err);
    }
  });
};

module.exports = {
  validate
};
