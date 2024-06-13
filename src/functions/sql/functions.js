/**
 * The following function takes an insert statement queries of an sql file
 * turn it into an array of objects.
 * @param {*} tableName
 * @param {*} filePath
 * @returns
 */
export const __sqlManipulator = async (tableName = null, filePath) => {
  const sqlFileContent = await fs.readFile(filePath, { encoding: "utf8" });
  const objectsContent = (await sqlToObjects(sqlFileContent)).map(
    replaceNullWithEmptyString
  );

  let formattedContent = [];

  if (tableName == "some_table") {
    for (const data of objectsContent) {
      formattedContent.push({
        // Do data manipulation here :)
        // tableName,
        // uniqueKey: data.idCard,
        // guardianId: data?.guardianId,
      });
    }

    formattedContent = formattedContent.filter((d) => d.guardianId);
  } else {
    formattedContent = objectsContent;
  }

  return formattedContent;
};
