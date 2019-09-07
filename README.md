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
$ npm install -g mongodb-utils
$ mongodb-utils COMMAND
running command...
$ mongodb-utils (-v|--version|version)
mongodb-utils/0.0.0 darwin-x64 node-v10.16.1
$ mongodb-utils --help [COMMAND]
USAGE
  $ mongodb-utils COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`mongodb-utils mongodb-utils archive --host 127.0.0.1 --port 27017 --db local --collection startup_log --query '{"boss": {"$eq": true}}'`](#mongodb-utils-mongodb-utils-archive---host-127001---port-27017---db-local---collection-startup_log---query-boss-eq-true)
* [`mongodb-utils hello`](#mongodb-utils-hello)
* [`mongodb-utils help [COMMAND]`](#mongodb-utils-help-command)
* [`mongodb-utils restore`](#mongodb-utils-restore)
* [`mongodb-utils sendToS3`](#mongodb-utils-sendtos3)
* [`mongodb-utils sex`](#mongodb-utils-sex)

## `mongodb-utils mongodb-utils archive --host 127.0.0.1 --port 27017 --db local --collection startup_log --query '{"boss": {"$eq": true}}'`

Dumps the specified MongoDB collection

```
USAGE
  $ mongodb-utils mongodb-utils archive --host 127.0.0.1 --port 27017 --db local --collection startup_log --query 
  '{"boss": {"$eq": true}}'

OPTIONS
  --authenticationDatabase=authenticationDatabase  Authentication database where the specified username exists
  --collection=collection                          (required) Mongo collection name
  --db=db                                          (required) Mongo database name
  --dumpOutputDir=dumpOutputDir                    Directory where to store the dump
  --host=host                                      (required) Mongo host
  --password=password                              Mongo user password
  --port=port                                      (required) Mongo port
  --query=query                                    Mongo query to filter what data to be dumped
  --ssl                                            Use SSL for Mongo connection
  --username=username                              Mongo user
```

_See code: [src/commands/archive.js](https://github.com/nzpopa/mongodb-utils/blob/v0.0.0/src/commands/archive.js)_

## `mongodb-utils hello`

Describe the command here

```
USAGE
  $ mongodb-utils hello

OPTIONS
  -n, --name=name  name to print

DESCRIPTION
  ...
  Extra documentation goes here
```

_See code: [src/commands/hello.js](https://github.com/nzpopa/mongodb-utils/blob/v0.0.0/src/commands/hello.js)_

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

## `mongodb-utils restore`

Restores the specified MongoDB archive

```
USAGE
  $ mongodb-utils restore

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

_See code: [src/commands/restore.js](https://github.com/nzpopa/mongodb-utils/blob/v0.0.0/src/commands/restore.js)_

## `mongodb-utils sendToS3`

Describe the command here

```
USAGE
  $ mongodb-utils sendToS3

OPTIONS
  -n, --name=name  name to print

DESCRIPTION
  ...
  Extra documentation goes here
```

_See code: [src/commands/sendToS3.js](https://github.com/nzpopa/mongodb-utils/blob/v0.0.0/src/commands/sendToS3.js)_

## `mongodb-utils sex`

Describe the command here

```
USAGE
  $ mongodb-utils sex

OPTIONS
  -n, --name=name  name to print

DESCRIPTION
  ...
  Extra documentation goes here
```

_See code: [src/commands/sex.js](https://github.com/nzpopa/mongodb-utils/blob/v0.0.0/src/commands/sex.js)_
<!-- commandsstop -->
