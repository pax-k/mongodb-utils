const {Command, flags} = require('@oclif/command');
const spawn = require('child_process').spawn;
const uploadToS3 = require('../shared/uploadToS3');

class ArchiveCommand extends Command {
  generateArchiveName(dbName, colName = '_') {
    const date = new Date();
    const datestring = [
      dbName,
      colName,
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate(),
      date.getTime()
    ];
  
    return datestring.join('_');
  }

  async dumpCollection() {
    const {flags} = this.parse(ArchiveCommand);
    const fileName = this.generateArchiveName(flags.db, flags.collection) + '.json';
    const filePath = flags.dumpOutputDir + '/' + fileName
    const mongoOptions = [
      '--host', flags.host,
      '--port', flags.port,
      '--db', flags.db,
      '--collection', flags.collection,
      '--out', filePath,
      '--jsonArray'
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
    if (flags.query) {
      mongoOptions.push('--query', flags.query)
    }
    this.log('Starting mongoexport of ' + flags.db + '.' + flags.collection);
    const mongodump = spawn('mongoexport', mongoOptions);

    return new Promise((resolve, reject) => {
      let stoutContent = '', stdoutChunks = [];
      let stderrContent = '', stderrChunks = [];
      mongodump.stdout.on('data', (data) => {
        stdoutChunks = stdoutChunks.concat(data);
      });
      mongodump.stdout.on('end', () => {
        stoutContent = Buffer.concat(stdoutChunks).toString();
      });
      mongodump.stderr.on('data', (data) => {
        stderrChunks = stderrChunks.concat(data);
      });
      mongodump.stderr.on('end', () => {
        stderrContent = Buffer.concat(stderrChunks).toString();
      });
      mongodump.on('exit', (code) => {
        if (code === 0) {
          resolve(filePath);
        } else {
          reject(stderrContent);
        }
      });
    });
  }

  async run() {
    let res;
    try {
      const {flags} = this.parse(ArchiveCommand);
      const dumpFile = await this.dumpCollection();
      if (flags.sendToS3) {
        flags.file = dumpFile;
        flags.destDir = flags.s3DestDir;
        flags.credentials = flags.awsCreds;
        const s3File = await uploadToS3(flags);
        this.log('S3 file: ', s3File);
      }
      this.log('Backup file: ', dumpFile);
    } catch (e) {
      this.error(e);
    }
  }
}

ArchiveCommand.description = 'Dumps the specified MongoDB collection'
ArchiveCommand.usage = `archive [OPTIONS]`;
ArchiveCommand.examples = [
  `archive --host 127.0.0.1 --port 27017 --db local --collection startup_log --query '{"boss": {"$eq": true}}`,
  `archive --host 127.0.0.1 --port 27017 --db local --collection startup_log --query '{"boss": {"$eq": true}}' --sendToS3 --awsCreds aws.json --bucket test-bukket-ro --s3DestDir backups`
]

ArchiveCommand.flags = {
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
  query: flags.string({
    description: 'Mongo query to filter what data to be dumped',
    required: false,
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
  dumpOutputDir: flags.string({
    description: 'Directory where to store the dump',
    required: false,
    default: 'backups/'
  }),
  sendToS3: flags.boolean({
    description: '',
    required: false,
    dependsOn: ['awsCreds', 'bucket']
  }),
  awsCreds: flags.string({
    description: 'Path to AWS Credentials in JSON form',
    required: false,
  }),
  bucket: flags.string({
    description: 'AWS S3 Bucket',
    required: false,
  }),
  s3DestDir: flags.string({
    description: 'Destination dir in S3 Bucket',
    required: false,
    default: '/'
  }),
}

module.exports = ArchiveCommand
