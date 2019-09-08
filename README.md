mongodb-utils
=============

Helper functions to dump or restore MongoDB collections

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/mongodb-utils.svg)](https://npmjs.org/package/mongodb-utils)
[![Downloads/week](https://img.shields.io/npm/dw/mongodb-utils.svg)](https://npmjs.org/package/mongodb-utils)
[![License](https://img.shields.io/npm/l/mongodb-utils.svg)](https://github.com/nzpopa/mongodb-utils/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @jsfriends/mongodb-utils
$ mongodb-utils COMMAND
running command...
$ mongodb-utils (-v|--version|version)
@jsfriends/mongodb-utils/0.1.1 darwin-x64 node-v10.16.1
$ mongodb-utils --help [COMMAND]
USAGE
  $ mongodb-utils COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`mongodb-utils archive [OPTIONS]`](#mongodb-utils-archive-options)
* [`mongodb-utils help [COMMAND]`](#mongodb-utils-help-command)
* [`mongodb-utils restore --host localhost --port 27017 --db local --collection employees --archive backups/archive.json`](#mongodb-utils-restore---host-localhost---port-27017---db-local---collection-employees---archive-backupsarchivejson)
* [`mongodb-utils sendToS3 --bucket test-bukket-ro --credentials aws.json  --file backups/backmeup.json --destDir backups`](#mongodb-utils-sendtos3---bucket-test-bukket-ro---credentials-awsjson----file-backupsbackmeupjson---destdir-backups)

## `mongodb-utils archive [OPTIONS]`

Dumps the specified MongoDB collection

```
USAGE
  $ mongodb-utils archive [OPTIONS]

OPTIONS
  --authenticationDatabase=authenticationDatabase  Authentication database where the specified username exists
  --awsCreds=awsCreds                              Path to AWS Credentials in JSON form
  --bucket=bucket                                  AWS S3 Bucket
  --collection=collection                          (required) Mongo collection name
  --db=db                                          (required) Mongo database name
  --dumpOutputDir=dumpOutputDir                    [default: backups/] Directory where to store the dump
  --host=host                                      (required) Mongo host
  --password=password                              Mongo user password
  --port=port                                      (required) Mongo port
  --query=query                                    Mongo query to filter what data to be dumped
  --s3DestDir=s3DestDir                            [default: /] Destination dir in S3 Bucket
  --sendToS3
  --ssl                                            Use SSL for Mongo connection
  --username=username                              Mongo user

EXAMPLES
  archive --host 127.0.0.1 --port 27017 --db local --collection startup_log --query '{"boss": {"$eq": true}}
  archive --host 127.0.0.1 --port 27017 --db local --collection startup_log --query '{"boss": {"$eq": true}}' --sendToS3 
  --awsCreds aws.json --bucket test-bukket-ro --s3DestDir backups
```

_See code: [src/commands/archive.js](https://github.com/nzpopa/mongodb-utils/blob/v0.1.1/src/commands/archive.js)_

## `mongodb-utils help [COMMAND]`

display help for mongodb-utils

```
USAGE
  $ mongodb-utils help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.1/src/commands/help.ts)_

## `mongodb-utils restore --host localhost --port 27017 --db local --collection employees --archive backups/archive.json`

Restores the specified MongoDB archive

```
USAGE
  $ mongodb-utils restore --host localhost --port 27017 --db local --collection employees --archive backups/archive.json

OPTIONS
  --archive=archive                                Archive file to restore
  --authenticationDatabase=authenticationDatabase  Authentication database where the specified username exists
  --collection=collection                          (required) Mongo collection name
  --db=db                                          (required) Mongo database name
  --host=host                                      (required) Mongo host
  --password=password                              Mongo user password
  --port=port                                      (required) Mongo port
  --ssl                                            Use SSL for Mongo connection
  --username=username                              Mongo user
```

_See code: [src/commands/restore.js](https://github.com/nzpopa/mongodb-utils/blob/v0.1.1/src/commands/restore.js)_

## `mongodb-utils sendToS3 --bucket test-bukket-ro --credentials aws.json  --file backups/backmeup.json --destDir backups`

Uploads the specified file to S3

```
USAGE
  $ mongodb-utils sendToS3 --bucket test-bukket-ro --credentials aws.json  --file backups/backmeup.json --destDir 
  backups

OPTIONS
  --bucket=bucket            (required) AWS S3 Bucket
  --credentials=credentials  (required) Path to AWS Credentials in JSON form
  --destDir=destDir          [default: /] Destination dir in S3 Bucket
  --file=file                (required) File to upload in S3 Bucket
```

_See code: [src/commands/sendToS3.js](https://github.com/nzpopa/mongodb-utils/blob/v0.1.1/src/commands/sendToS3.js)_
<!-- commandsstop -->
