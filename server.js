/**
 * Exercise 3: Create an HTTP web server
 */

import { createServer } from "http";
import { readFile } from "fs/promises";

//create a server
const server = createServer(async function (req, res) {
  let file;
  let contentType;
  // console.log(req.url);
  switch (req.url) {
    case "/":
      file = "index.html";
      contentType = "text/html";
      break;
    case "/index.js":
      file = "index.js";
      contentType = "text/javascript";
      break;
    case "/style.css":
      file = "style.css";
      contentType = "text/css";
      break;
    default:
      res.statusCode = 500;
      res.setHeader("Content-type", "text/plain");
      res.end("File not found on the server");
      return;
  }
  try {
    const fileContent = await readFile(file);
    res.statusCode = 200;
    res.setHeader("Content-type", contentType);
    res.write(fileContent); // Sends a response back to the client
    res.end(); // Ends the response
  } catch (err) {
    console.log("File reading error ", err.message);
    res.statusCode = 500;
    res.setHeader("Content-type", "text/plain");
    res.end(`File reading error on the server, ${err.message}`);
  }
});

server.listen(3000); // The server starts to listen on port 3000
console.log("Server running at http://localhost:3000/");
