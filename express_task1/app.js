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

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'Success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

app.post('/api/v1/tours', (req, res) => {
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
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
