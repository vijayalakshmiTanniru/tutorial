const express = require('express');
  const cookieParser = require('cookie-parser');
  const cors = require('cors'); // Install cors

  const app = express();
  const PORT = process.env.PORT || 5000;

  app.use(cors({
      origin: 'http://localhost:3000', // Allow requests from your React app's origin
      credentials: true, // Allow cookies to be sent
  }));
  app.use(express.json());
  app.use(cookieParser());
  app.use('/api', require('./routes/routes'));

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
