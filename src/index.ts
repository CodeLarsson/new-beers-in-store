import dotenv from 'dotenv';
dotenv.config();

import { app } from './app/app';

const port = process.env.WEBSITE_PORT || process.env.PORT;
app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${port}`);
});
