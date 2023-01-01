const fs = require('fs');
const express = require('express');

const app = express();

// create Middleware
app.use(express.json());

// app.get("/", (req, res) => {
//   res.status(200).json({ message: "Hello from server side!", app: "Torism" });
// });

// app.post("/", (req, res) => {
//   res.send("You can post on this endpoint");
// });
const tours = JSON.parse(fs.readFileSync('./dev-data/data/tours-simple.json'));

// read API
const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'Success',
    results: tours.length,
    data: {
      tours,
    },
  });
};

const getTour = (req, res) => {
  console.log(req.params);

  const id = req.params.id * 1;
  const tour = tours.find((elem) => elem.id === id);

  // soln 1 for invalid ID
  // if (id > tours.length) {

  // soln 2
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid Id',
    });
  }

  res.status(200).json({
    status: 'Success',
    data: {
      tour,
    },
  });
};

const createTour = (req, res) => {
  // console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    './dev-data/data/tours-simple.json',
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'Success',
        data: {
          tours,
        },
      });
    }
  );
  // res.send('Done');
};

const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid Id',
    });
  }
  res.status(200).json({
    status: 'Success',
    results: tours.length,
    data: {
      tours: '<Updated Tour here...>',
    },
  });
};

const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid Id',
    });
  }
  res.status(204).json({
    status: 'Success',
    data: null,
  });
};

// app.get('/api/v1/tours', getAllTours);

// get URL Params
// app.get('/api/v1/tours/:id', getTour);

// create API
// app.post('/api/v1/tours', createTour);

// Update
// app.patch('/api/v1/tours/:id', updateTour);

// delete
// app.delete('/api/v1/tours/:id', deleteTour);

app.route('/api/v1/tours').get(getAllTours).post(createTour);
app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
