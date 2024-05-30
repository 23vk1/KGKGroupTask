const libExpress = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const {libUtil} = require('./utils');

require('dotenv').config();
const passport = require('passport');
const sequelize = require('./config/database');


const userRoutes = require('./routes/userRoutes');
const itemRoutes = require('./routes/itemRoutes')
const bidRoutes = require('./routes/bidRoutes');
const notificationRoutes = require('./routes/notificationRoutes');


const app = libExpress();
const server = http.createServer(app)
const io = socketIo(server,{
  cors: {
    origin: '*',
  },
});


app.use(bodyParser.json());
// app.use(cors());
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// passport middelware
app.use(passport.initialize());
require('./config/passport')(passport);


// basic route
app.get('/',(req, res)=>{
    res.send("welcome ");
})

// routes
app.use('/api/user', userRoutes);
app.use('/api/item', itemRoutes);
app.use('/api/bid', bidRoutes);
app.use('/api/notification', notificationRoutes);


// socket connection 
io.on('connection', (socket) => {
    console.log('New client connected');
    libUtil.logger("New client connected",1);
    socket.on('disconnect', () => {
      console.log('Client disconnected');
      libUtil.logger("Client disconnected",1);
    });
  });

app.set('io',io);



// server 
sequelize.sync().then(() => {
  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    libUtil.logger("server started",1);

  });
}).catch(err => {
  console.log('Database connection error:', err)
  libUtil.logger("Database connection error",3);

});






