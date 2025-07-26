const s=require('express');
const app = s();
const port = 3000;
const cors = require('cors');
const routes=require('./router/route')
const connect = require('./config/config');

require('dotenv').config();

app.use(cors());
app.use(s.json());
app.use(s.urlencoded({ extended: true }));

app.use('/api',routes)


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  connect().then(() => {
  console.log('Database connected successfully');
}).catch(err => {
  console.error('Database connection failed:', err);
});
});