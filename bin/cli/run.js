const fs = require("fs");
const server = require("../server");
const getFilesFromDir = require("./utils/getFilesFromDir");
const readFiles = require("./utils/readFiles");
const MyDB = require("./utils/myDB");

module.exports = (argv) => {
  const source = argv._[0];

  if (!fs.existsSync(source)) {
    console.log(`Error: ${source} doesn't exists`);
    process.exit(1);
  }

  if (!fs.lstatSync(source).isDirectory()) {
    console.log(`Error: ${source} is not a directory`);
    process.exit(2);
  }

  const start = async () => {
    const { fileList, subjects } = getFilesFromDir(source);
    const data = await readFiles({ fileList, subjects });
    const db = new MyDB(data, source);

    const app = server.create();

    app.get("/", (req, res) => res.send("hello"));

    Object.keys(data).map((key) => {
      app.use(`/${key}`, server.route(key, db));
    });

    app.listen(argv.port, () =>
      console.log(`App running on port ${argv.port}`)
    );
  };

  start();
};
