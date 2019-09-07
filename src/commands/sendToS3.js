const {Command, flags} = require('@oclif/command')
const path = require("path");

class SendToS3Command extends Command {

  async sendToS3(flags) {
    const knox = require('knox');
    const sourceFile = path.resolve(flags.file);
    const s3client = knox.createClient({
      key: flags.key,
      secret: flags.secret,
      bucket: flags.bucket
    });
  
    this.log('Attemping to upload ' + flags.file + ' to the ' + flags.bucket + ' s3 bucket');
    return new Promise((resolve, reject) =>  {
      s3client.putFile(sourceFile, path.join(flags.destDir, flags.destFileName), (err, res) => {
        if (err) {
          reject(err);
        }
    
        res.setEncoding('utf8');
    
        res.on('data', function (chunk) {
          if (res.statusCode !== 200) {
            this.log(chunk, 'error');
          } else {
            this.log(chunk);
          }
        });
    
        res.on('end', function (chunk) {
          if (res.statusCode !== 200) {
            reject(new Error('Expected a 200 response from S3, got ' + res.statusCode));
          }
          resolve('Successfully uploaded to s3')
        });
      });
    });
  }

  async run() {
    let res;
    try {
      const {flags} = this.parse(SendToS3Command);
      res = await this.sendToS3(flags);
      this.log(res);
    } catch (e) {
      this.error(e);
    }
  }
}

SendToS3Command.description = 'Uploads the specified file to S3'

SendToS3Command.flags = {
  key: flags.string({
    description: 'AWS Key',
    required: true,
  }),
  secret: flags.string({
    description: 'AWS Secret',
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
  destFileName: flags.string({
    description: 'Destination filename in S3 Bucket',
    required: true,
  }),
  file: flags.string({
    description: 'File to upload in S3 Bucket',
    required: true,
  }),
}

module.exports = SendToS3Command
