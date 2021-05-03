const express=require('express')
const cors=require('cors')
const cookieParser=require('cookie-parser')
const bodyParser=require('body-parser')
const db=require('./app/model/index')
require('dotenv').config()

const app=express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use(cookieParser());

var whitelist=[
    "https://livingdead.herokuapp.com",
    "http://192.168.137.1:3000",
    "http://127.0.0.1:3000"
]
var corsOptions = {
    origin: function (origin, callback) {
        console.log(origin)
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    allowOrigin:["http://127.0.0.1:3000"]
  };

//   app.use(cors(corsOptions));
//   app.use(cors({credentials:true}))
var option={
    origin:"http://127.0.0.1:3000",
    methods:"*",
    credentials:true
}
app.use(cors(option))

  db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(data=>{
      console.log('connected to database')
  })
  .catch(err=>{
      console.log(err)
  })

  require('./app/routes/auth.routes')(app);
  require('./app/routes/plans.routes')(app);
  require('./app/routes/user.routes')(app);

  const PORT=process.env.PORT|| 7070;
  app.listen(PORT,()=>{
      console.log(`server started at port ${PORT}`)
  })


