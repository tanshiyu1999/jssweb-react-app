const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db.js");

// Middleware
app.use(cors());
app.use(express.json()) // => allows us to access req.body

//ROUTES//

// register and login routes
app.use("/auth", require("./routes/jwtAuth"));

// dashboard route
app.use("/dashboard", require("./routes/dashboard"))

// subclub route
app.use("/subclubs", require("./routes/subclubs"))

// eventUpdate route
app.use("/eventUpdate", require("./routes/eventUpdate"))

// logistic route
app.use("/logistic", require("./routes/logistic"))

// treasure reimbursement
app.use("/reimbursement", require("./routes/reimbursement"))

app.listen(3000, () => {
    console.log("service is listening on port 3000");
})


// // get all events
// app.get("/event", async (req, res) => {
//     try {
//         const allEvents = await pool.query("SELECT * FROM event");
//         res.json(allEvents.rows)
//     } catch (err) {
//         console.error(error.message)
//     }
// })

// get a event
// app.get("/event/:id", async (req, res) => {
//     const { id } = req.params;
//     try {
//         const event = await pool.query("SELECT * FROM event WHERE event_id = $1", [id]);
//         res.json(event.rows[0]);
//     } catch (err) {
//         console.error(err.message);
//     }
// })

// // create a event
// app.post("/event", async (req, res) => {
//     try {
//         const { event_title } = req.body;
//         const newEvent =  await pool.query(
//             `INSERT INTO event(event_title) VALUES ('${event_title}') RETURNING *;`);

            
//         res.json(newEvent.rows[0]);

//     } catch (err) {
//         console.error(err.message);
//     }

// })

// // update a event
// app.put("/event/:id", async (req, res) => {
//     try {
//         const { id } = req.params;
//         const {event_title} = req.body;
//         const updateEvent = await pool.query("UPDATE event SET event_title = $1 WHERE event_id = $2", [event_title, id]);
//         res.json(`Event ${id} was updated.`)
//     } catch (err) {
//         console.error(err.message);
//     }
// })

// // delete a event
// app.delete("/event/:id", async (req, res) => {
//     try {
//         const { id } = req.params;
//         const deleteTodo = await pool.query("DELETE FROM event WHERE event_id = $1", [id]);
//         res.json(`Event ${id} deleted.`)
//     } catch (err) {
//         console.error(err.message);
        
//     }
// })