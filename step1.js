const fs = require("fs");

function cat(path) {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      console.log(`ERROR READING ${path}:\n`, err);
      process.exit(1);
    }
    console.log(data);
  });
}

let path = process.argv[2];

cat(path);

// IN TERMINAL, COMMAND TO CALL THIS FUNCTION

// ...$ node step1.js one.txt
