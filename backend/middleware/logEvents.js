//now we want to transform this into a module that we will import into a new index.js file!
//these are all commonsJS libraries so we don't need NPM to install
const fs = require('fs')
const fsPromises = require('fs').promises
const path = require('path')

//these are npm imports
const { format } = require('date-fns');
//allows us to assign user's ids
const { v4: uuid} = require('uuid');

//Question: when are async functions used?
//defining a log events function that we define that we can export
const logEvents = async (message, logName) => {
  const dateTime = `${format(new Date(), 'yyyyMMdd')}\t`
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`
  //await part of async->await
  //This will try to add {logItem} to a file called eventLog.txt in the folder logs
  try{
    //fs append only creates a new file if file DNE, so we need to use a conditional statement to check
    //if this logs directory exists or not
    //Conditional Logic:
      //if logs directory does not exist, then make the directory logs
    if(!fs.existsSync(path.join(__dirname, '..', 'logs'))){
      await fsPromises.mkdir(path.join(__dirname, '..','logs'))
    }
    await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logName), logItem)
  }
  catch (err){
    console.log(err)
  }
} 

const logger = (req, res, next) => {
  logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt')
  console.log(`${req.method} ${req.path}`)
  next()
}

module.exports = {logger, logEvents}
//generates new ID

