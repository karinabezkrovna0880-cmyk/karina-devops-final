const http = require("http");

const PORT = process.env.PORT || 3000;
let tasks = [];
let nextId = 1;

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  const send = (status, data) => {
    res.writeHead(status);
    res.end(JSON.stringify(data));
  };

  if (req.url === "/" && req.method === "GET") {
    return send(200, {
      app: "TaskFlow",
      author: "Karina Bezкrovna",
      message: "Task management REST API",
      status: "running"
    });
  }

  if (req.url === "/health" && req.method === "GET") {
    return send(200, { status: "ok", service: "TaskFlow" });
  }

  if (req.url === "/tasks" && req.method === "GET") {
    return send(200, tasks);
  }

  if (req.url === "/tasks" && req.method === "POST") {
    let body = "";

    req.on("data", chunk => {
      body += chunk;
      if (body.length > 10000) req.destroy();
    });

    req.on("end", () => {
      try {
        const data = JSON.parse(body);
        if (typeof data.title !== "string" || !data.title.trim()) {
          return send(400, { error: "Title is required" });
        }

        const task = {
          id: nextId++,
          title: data.title.trim(),
          completed: false
        };

        tasks.push(task);
        send(201, task);
      } catch {
        send(400, { error: "Invalid JSON" });
      }
    });
    return;
  }

  const match = req.url.match(/^\/tasks\/(\d+)$/);

  if (match) {
    const id = Number(match[1]);
    const index = tasks.findIndex(t => t.id === id);

    if (index === -1) {
      return send(404, { error: "Task not found" });
    }

    if (req.method === "PATCH") {
      tasks[index].completed = true;
      return send(200, tasks[index]);
    }

    if (req.method === "DELETE") {
      tasks.splice(index, 1);
      return send(200, { message: "Task deleted" });
    }
  }

  send(404, { error: "Not Found" });
});

if (require.main === module) {
  server.listen(PORT, "0.0.0.0", () => {
    console.log(`TaskFlow running on port ${PORT}`);
  });
}

module.exports = server;
