require('custom-env').env('production');
const express = require('express');
const path = require('path');
const app = express();
const SERVER_PORT = process.env.PORT;
const ORIGIN = process.env.REACT_APP_API_URL;
const cors = require('cors');
const corsOptions = {
  origin: ORIGIN,
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));
app.options('*', cors());

/*To load React Page on*/
app.set('port', SERVER_PORT);

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  });
});

app.listen(app.get('port'), function() {
  console.log('Server started on port ' + app.get('port'));
});
