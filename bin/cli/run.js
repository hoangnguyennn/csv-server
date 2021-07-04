const fs = require('fs');

const getFilesFromDir = require('../utils/getFilesFromDir');
const readCsvFiles = require('../utils/readCsvFiles');
const server = require('../server');
const MyDB = require('../db');
const home = require('../template/home');

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

  const { port } = argv;

  const start = async () => {
    const { filesPath, models } = getFilesFromDir(source);
    const data = await readCsvFiles(filesPath, models);
    const db = new MyDB(data, source);

    const app = server.create();

    app.get('/', (req, res) => res.send(home(models, port)));

    Object.keys(data).forEach((model) => {
      app.use(`/${model}`, server.route(db, model));
    });

    app.listen(port, () => {
      console.log(
        `started server on 0.0.0.0:${port}, url: http://localhost:${port}`,
      );
    });
  };

  start();
};
