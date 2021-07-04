const yargs = require('yargs');
const run = require('./run');

module.exports = () => {
  const argv = yargs
    .config('config')
    .usage('$0 [options] <source>')
    .options({
      port: {
        alias: 'p',
        description: 'Set port',
        default: 3000,
      },
    })
    .require(1, 'Missing <source> argument').argv;

  run(argv);
};
