import express from 'express';
import cors from 'cors';
import itemRoute from './src/routes/itemRoute.js';
import cartRoute from './src/routes/cartRoute.js';
import orderRoute from './src/routes/orderRoute.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend is running ');
});

//item_routes
app.use('/api', itemRoute);
app.use('/api', cartRoute);
app.use('/api', orderRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
