const {Command, flags} = require('@oclif/command');
const spawn = require('child_process').spawn;
class RestoreCommand extends Command {
  async restoreCollection() {
    const {flags} = this.parse(RestoreCommand);
    const mongoOptions = [
      '--host', flags.host,
      '--port', flags.port,
      '--db', flags.db,
      '--collection', flags.collection,
      '--file', flags.archive,
      '--jsonArray', '--jsonArray',
    ];
    if (flags.username) {
      mongoOptions.push(
        '--username', flags.username,
        '--password', flags.password,
        '--authenticationDatabase', flags.authenticationDatabase
      );
    }
    if (flags.ssl) {
      mongoOptions.push('--ssl', flags.ssl)
    }
    this.log('Starting mongorestore of ' + flags.archive + ' in ' + flags.db + '.' + flags.collection);
    const mongorestore = spawn('mongoimport', mongoOptions);

    return new Promise((resolve, reject) => {
      let stoutContent = '', stdoutChunks = [];
      let stderrContent = '', stderrChunks = [];
      mongorestore.stdout.on('data', (data) => {
        stdoutChunks = stdoutChunks.concat(data);
      });
      mongorestore.stdout.on('end', () => {
        stoutContent = Buffer.concat(stdoutChunks).toString();
      });
      mongorestore.stderr.on('data', (data) => {
        stderrChunks = stderrChunks.concat(data);
      });
      mongorestore.stderr.on('end', () => {
        stderrContent = Buffer.concat(stderrChunks).toString();
      });
      mongorestore.on('exit', (code) => {
        if (code === 0) {
          resolve(stoutContent);
        } else {
          reject(stderrContent);
        }
      });
    });
  }

  async run() {
    let res;
    try {
      res = await this.restoreCollection();
      this.log(res);
    } catch (e) {
      this.error(e);
    }
  }
}

RestoreCommand.description = 'Restores the specified MongoDB archive'
RestoreCommand.usage = `restore --host localhost --port 27017 --db local --collection employees --archive backups/archive.json`;

RestoreCommand.flags = {
  host: flags.string({
    description: 'Mongo host',
    required: true,
  }),
  port: flags.string({
    description: 'Mongo port',
    required: true,
  }),
  db: flags.string({
    description: 'Mongo database name',
    required: true,
  }),
  collection: flags.string({
    description: 'Mongo collection name',
    required: true,
  }),
  username: flags.string({
    description: 'Mongo user',
    required: false,
    dependsOn: ['password', 'authenticationDatabase'],
  }),
  password: flags.string({
    description: 'Mongo user password',
    required: false,
    dependsOn: ['username', 'authenticationDatabase'],
  }),
  ssl: flags.boolean({
    description: 'Use SSL for Mongo connection',
    required: false,
    default: false,
  }),
  authenticationDatabase: flags.string({
    description: 'Authentication database where the specified username exists',
    required: false,
    dependsOn: ['username', 'password'],
  }),
  archive: flags.string({
    description: 'Archive file to restore',
    required: false,
  })
}

module.exports = RestoreCommand
