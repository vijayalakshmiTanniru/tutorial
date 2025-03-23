
const mongoose = require('mongoose');
const URI = "YOUR_MONGODB_ATLAS_URI"; // Replace with your URI

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("Could not connect to MongoDB:", err));
