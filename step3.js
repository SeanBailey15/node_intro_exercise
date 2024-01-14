const fs = require("fs");
const axios = require("axios");

function handleOutput(text, out) {
  if (out) {
    fs.writeFile(out, text, "utf8", (err) => {
      if (err) {
        console.log(`ERROR WRITING ${out}:\n`, err);
        process.exit(1);
      }
    });
  } else {
    console.log(text);
  }
}

function cat(path, out) {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      console.log(`ERROR READING ${path}:\n`, err);
      process.exit(1);
    }
    handleOutput(data, out);
  });
}

async function webCat(path, out) {
  try {
    const res = await axios.get(path);
    handleOutput(res.data, out);
  } catch (err) {
    console.log(`ERROR FETCHING ${path}:\n`, err);
    process.exit(1);
  }
}

let path;
let out;

if (process.argv[2] === "--out") {
  out = process.argv[3];
  path = process.argv[4];
} else {
  path = process.argv[2];
}

if (path.slice(0, 4) === "http") {
  webCat(path, out);
} else {
  cat(path, out);
}

// IN TERMINAL, COMMANDS TO CALL THIS FUNCTION

// ...$ node step2.js one.txt

// ...$ node step2.js http://google.com
