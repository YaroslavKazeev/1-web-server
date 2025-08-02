/**
 * Exercise 3: Create an HTTP web server
 */

import { createServer } from "http";
import { readFile } from "fs/promises";

//create a server
let server = createServer(async function (req, res) {
  try {
    const html = await readFile("index.html");
    res.statusCode = 200;
    res.setHeader("Content-type", "text/html");
    res.write(html); // Sends a response back to the client
    res.end(); // Ends the response
  } catch (err) {
    console.log("File reading error ", err.message);
    res.statusCode = 500;
    res.setHeader("Content-type", "text/plain");
    res.write("Internal Server Error");
    res.end();
  }
});

server.listen(3000); // The server starts to listen on port 3000
console.log("Server running at http://localhost:3000/");
