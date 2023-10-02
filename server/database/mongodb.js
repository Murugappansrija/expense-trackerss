import mongoose from "mongoose";
// async  function database(){ await mongoose.connect( process.env.DB_URL );
  
//}
const database =()=>{
  mongoose.connect(process.env.db_url,{
      useNewUrlParser:true,
      useUnifiedTopology:true
  }).then(()=>{
    console.log('connected db')
  }).catch((err)=>{
    console.error(err)
  })
}
  export default database