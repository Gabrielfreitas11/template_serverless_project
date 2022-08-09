const schema = require('../schema/schemaMongo.js');
const { connectToDatabase } = require('../mongoDb.js');

exports.findOne = async ({ ip }) => {
  await connectToDatabase();

  const data = await schema.findOne({ ip }).lean();

  return data;
};
