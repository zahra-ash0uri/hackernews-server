import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import api from './api';


const app = express();
app.set('view engine', 'pug');
app.use(express.static(__dirname + '/www'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/', (req, res) => {
  res.render('home/index');
});
app.use(cors());
app.use('/api', api);
app.listen(8000);
console.log('App is listening to port 8000');