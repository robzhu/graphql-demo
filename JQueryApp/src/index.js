import express from 'express';

const app = express();
app.use(express.static(__dirname + '/public'));

const port = process.env.NODE_ENV ? 80 : 4000;

app.listen(port, () => {
  console.log(`app started on port ${port}`);
});
