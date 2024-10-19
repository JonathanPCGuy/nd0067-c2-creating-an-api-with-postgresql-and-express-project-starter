import express from 'express';
import booksRoute from './api/books/bookroute';

const apiRoutes = express.Router();

apiRoutes.use('/api/books', booksRoute);

apiRoutes.get('/', (req, res) => {
  res.send(
    '{"notice":"visit /api/books to interact with the api."}'
  );
});

export default apiRoutes;
