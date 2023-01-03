const express = require('express');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// 1 MIDDLEWARE
// create Middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log('Hello from middleware...');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 2 ROUTE HANDLERS
// read API

// app.get('/api/v1/tours', getAllTours);

// get URL Params
// app.get('/api/v1/tours/:id', getTour);

// create API
// app.post('/api/v1/tours', createTour);

// Update
// app.patch('/api/v1/tours/:id', updateTour);

// delete
// app.delete('/api/v1/tours/:id', deleteTour);

//3 ROUTES

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// 4 START SERVER
module.exports = app;
