const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const physicians = require("./data/physicians.json");
const appointments = require("./data/appointments.json");

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API calls
app.get("/api/physicians", (req, res) => {
  res.send({ physicians });
});

app.post("/api/appointments", (req, res) => {
  const physician = req.body.physicianId;
  const currentAppointments = appointments.filter(
    appointment => appointment.doctor !== physician
  );
  res.send({ currentAppointments });
});

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));

  // Handle React routing, return all requests to React app
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
