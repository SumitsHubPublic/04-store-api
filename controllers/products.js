const Product = require('../models/product');

const getAllProducts = async (req, res) => {
  console.log(req.query);
  const { featured, company, name, sort, fields, numericFilters } = req.query;
  // setting object keys conditionally
  const queryObject = {
    ...(featured && {
      featured: featured === "true",
    }),
    ...(company && { company }),
    ...(name && { name: { $regex: name, $options: "i" } }), // i for case insensitive
  };
  // console.log(queryObject);

  if (numericFilters) {
    const operatorMap = {
      "<": "$lt",
      ">": "$gt",
      "=": "$eq",
      "<=": "$lte",
      ">=": "$gte",
    };

    // regex to find operators in query parameter
    const regEx = /\b(<|>|=|<=|>=)\b/g;

    // using replace method to replace normal operators with mongoose operators
    let filters = numericFilters.replace(
      regEx,
      match => `-${operatorMap[match]}-`
    );
    // console.log(filters); // price-$gt-90,rating-$gt-4

    // split the string and iterate through the array
    filters = filters.split(",").forEach(item => {
      // get values using array destructuring
      const [field, op, value] = item.split("-");
      // add filter values to the query object
      queryObject[field] = { [op]: Number(value) };
    });
  }
  console.log(queryObject);

  // getting query object returned by find method
  let query = Product.find(queryObject);

  if (sort) {
    let sortList = sort.split(',').join(' ');
    // adding sort to the query
    query.sort(sortList);
  } else {
    query.sort('createdAt');
  }

  // select particular fields
  if (fields) {
    let fieldList = fields.split(',').join(' ');
    query.select(fieldList);
  }

  // Pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.size) || 10;
  const skip = (page - 1) * limit;

  // Query limit: limits the amount of records and skip: skips first specified number of records
  query.limit(limit).skip(skip);

  // awaiting query to execute
  const products = await query;
  res.status(200).json({ products, nbHits: products.length });
};

const getAllStaticProducts = async (req, res) => {
  const products = await Product.find({}).select('name price');
  res.status(200).json({ products, nbHits: products.length });
};

module.exports = { getAllProducts, getAllStaticProducts };
