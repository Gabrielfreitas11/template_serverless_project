const schema = require('../schema/schemaMongo.js');
const { connectToDatabase } = require('../mongoDb.js');

exports.findOneAndUpdate = async ({ ip, cpf, errorExcess }) => {
  await connectToDatabase();

  const options = { upsert: true, new: true, setDefaultsOnInsert: true };

  const data = await schema.findOneAndUpdate({ ip }, {
    ip,
    $addToSet: {
      cpf
    },
    errorExcess
  }, options);

  return data;
};

