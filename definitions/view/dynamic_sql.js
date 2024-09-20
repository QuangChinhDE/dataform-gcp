// dynamic_sql.js

async function generateDynamicSQL(bigquery) {
  const tableNamesQuery = `SELECT feature_id AS table_name FROM \`base-data-analyst.dm_product_led.feature\``;

  // Fetch table names from BigQuery
  const [tableNames] = await bigquery.query(tableNamesQuery);

  let sqlParts = [];

  for (const row of tableNames) {
    const tableName = row.table_name;
    const sqlPart = `
      SELECT
        COALESCE(id, NULL) AS id,
        COALESCE(feature_id, NULL) AS feature_id,
        COALESCE(product_id, NULL) AS product_id,
        COALESCE(timestamp, NULL) AS timestamp,
        '${tableName}' AS source_table
      FROM \`base-data-analyst.dm_product_led.${tableName}\`
    `;
    sqlParts.push(sqlPart);
  }

  const finalQuery = sqlParts.join('\nUNION ALL\n');
  return finalQuery;
}

module.exports = generateDynamicSQL;
