## Learnings

### Setting Object keys conditionally

```js
const { featured } = req.query;
// setting object keys conditionally
const queryObject = {
  ...(featured === 'true' && {
    featured: featured === 'true' ? true : false,
  }),
};
```

### Query Params

- Query params start with '?' (question mark) at the end of the url and values are separated by '&' symbol
- Example URL with query: "/products?featured=true&page=12&company=ikea"
- In express controller we get access to query params using 'req.query'
- req.query gives an object containing query param keys and values,
- Example req.query object for above URL - { featured: 'true', page: '12', company: 'ikea' }

### Querying with Mongoose v5 vs Mongoose v6

- In v5 -> Model.find() return empty object if we pass any parameter which is not present in the model schema
- In v6 -> Model.find() will ignore the invalid parameters and returns the result considering only valid ones

### Sorting MongoDB collection

```js
const getAllStaticProducts = async (req, res) => {
  // passing space separated sorting values
  // negative(-) for descending order
  const products = await Product.find({}).sort('name -price');
  res.status(200).json({ products, nbHits: products.length });
};
```
