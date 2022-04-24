var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/symbols', function(req, res, next) {
  sample_name = req.query.sample_name;
  step_index = req.query.step_index;
  file_path = './public/samples/' + sample_name + '/step' + step_index + '/symbols.simudata';
  const fs =require('fs');
  fs.readFile(file_path, (err, data) => {
    if (err) throw err;
    res.end(data.toString());
  });
});

module.exports = router;
