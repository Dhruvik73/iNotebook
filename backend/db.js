const db=require('mongoose')
 const url='mongodb://localhost:27017/inotebook?readPreference=primary&appname=MongoDB%20Compass&ssl=false';
  function connection(){
      db.connect(url)
      console.log('connection seccessful')
  }

module.exports=connection