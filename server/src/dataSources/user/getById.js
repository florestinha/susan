export default ({ db, tableName }) => async ({
  id,
}) => db
  .first()
  .table(tableName)
  .where('id', id);

