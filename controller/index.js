const { Client } = require("@elastic/elasticsearch");
const client = new Client({
  node: "http://localhost:9200",
  auth: { username: "elastic", password: "yokvsrWFO8RI7B2GLHah" },
});

export const getList = async (request, response) => {
  let result = await client.search({
    index: "to_do_list",
    size: 100,
  });
  result = result.body["hits"]["hits"];
  let newList = [];
  for (const todo of result) {
    newList.push(todo["_source"]);
  }
  console.log(newList);
  return response.send(newList);
};

export const createList = async (request, response) => {
  const result = await client.create({
    id: Math.random() * 10,
    index: "to_do_list",
    body: request.body,
  });
  return response.send(result);
};

export const deleteList = async (request, response) => {
  const { id } = request.params;

  let finding = await client.search({
    index: "to_do_list",
    body: {
      query: {
        match: {
          id: id,
        },
      },
    },
  });

  let findingId = finding.body["hits"]["hits"][0]._id;

  await client.delete({
    index: "to_do_list",
    id: findingId,
  });

  return response.send("Deleted Successfully");
};
