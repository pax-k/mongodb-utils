const {Command, flags} = require('@oclif/command')
const uploadToS3 = require('../shared/uploadToS3');
class SendToS3Command extends Command {
  async run() {
    let res;
    try {
      const {flags} = this.parse(SendToS3Command);
      res = await uploadToS3(flags);
      this.log(res);
    } catch (e) {
      this.error(e);
    }
  }
}

SendToS3Command.description = 'Uploads the specified file to S3'
SendToS3Command.usage = 'sendToS3 [OPTIONS]'
SendToS3Command.examples = ['mongodb-utils sendToS3 --bucket test-bukket-ro --credentials aws.json  --file backups/backmeup.json --destDir backups'];

SendToS3Command.flags = {
  credentials: flags.string({
    description: 'Path to AWS Credentials in JSON form',
    required: true,
  }),
  bucket: flags.string({
    description: 'AWS S3 Bucket',
    required: true,
  }),
  destDir: flags.string({
    description: 'Destination dir in S3 Bucket',
    required: false,
    default: '/'
  }),
  file: flags.string({
    description: 'File to upload in S3 Bucket',
    required: true,
  }),
}

module.exports = SendToS3Command
