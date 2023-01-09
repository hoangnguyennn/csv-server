import yargs from 'yargs'
import run from './run'

export default () => {
  const argv = yargs
    .config('config')
    .usage('$0 [options] <source>')
    .options({
      port: {
        alias: 'p',
        description: 'Set server port',
        default: 3000
      }
    })
    .require(1, 'Missing <source> argument').argv

  run(argv)
}
