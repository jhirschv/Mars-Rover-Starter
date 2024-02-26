const Message = require('./message.js');
const Command = require('./command.js');
const util = require('util');
class Rover {
   constructor(position, mode='NORMAL', generatorWatts=110) {
      this.position = position
      this.mode = mode
      this.generatorWatts = generatorWatts
   }

   receiveMessage(message) {
      
      let returnObject = {
         message: message.name,
         results: []
      }

      for(let i = 0; i < message.commands.length; i++) {
         if(message.commands[i].commandType === 'MODE_CHANGE') {
            this.mode = message.commands[i].value
            returnObject.results.push({completed: true})
         } else if(message.commands[i].commandType === 'MOVE') {
            if(this.mode != 'LOW_POWER') {
            this.position = message.commands[i].value
            returnObject.results.push({completed: true})
            } else {
               returnObject.results.push({completed: false})
            }
         } 
      }
      for(let command of message.commands) {
         if(command.commandType === 'STATUS_CHECK') {
            returnObject.results.push({
               completed: true, 
               roverStatus: { mode: this.mode, generatorWatts: this.generatorWatts, position:this.position}
            })
         }
      } return returnObject
   }
   // Write code here!
}


module.exports = Rover;