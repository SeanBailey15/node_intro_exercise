const fs = require("fs");
const axios = require("axios");

function cat(path) {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      console.log(`ERROR READING ${path}:\n`, err);
      process.exit(1);
    }
    console.log(data);
  });
}

async function webCat(path) {
  try {
    const res = await axios.get(path);
    console.log(res.data);
  } catch (err) {
    console.log(`ERROR FETCHING ${path}:\n`, err);
    process.exit(1);
  }
}

let path = process.argv[2];

if (path.slice(0, 4) === "http") {
  webCat(path);
} else {
  cat(path);
}

// IN TERMINAL, COMMANDS TO CALL THIS FUNCTION

// ...$ node step2.js one.txt

// ...$ node step2.js http://google.com
