// dynamic_query.js
const getDynamicQuery = () => `
  SELECT *
  FROM ${ref('test')}
  LIMIT 1
`;

module.exports = {
  getDynamicQuery
};
