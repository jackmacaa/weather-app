import express from 'express';
import { router } from './routes.js';
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', router);
app.listen(3000, () => {
    console.log(`Server http://localhost:3000`);
});
