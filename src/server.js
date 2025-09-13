import app from './App.js';

const PORT = process.env.PORT_ENV || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT} `);
});
