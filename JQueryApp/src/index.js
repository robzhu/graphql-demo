import express from 'express';

const app = express();
app.use(express.static(__dirname + '/public'));
// app.set('json spaces', 2);

app.listen(80, () => {
  console.log('app started on port 80');
});
