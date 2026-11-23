const test = require("node:test");
const assert = require("node:assert/strict");
const server = require("../src/server");

test("TaskFlow health endpoint works", async () => {
  await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));

  try {
    const address = server.address();
    const response = await fetch(`http://127.0.0.1:${address.port}/health`);
    const data = await response.json();

    assert.equal(response.status, 200);
    assert.equal(data.status, "ok");
    assert.equal(data.service, "TaskFlow");
  } finally {
    await new Promise(resolve => server.close(resolve));
  }
});
