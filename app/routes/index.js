var express = require('express');
var router = express.Router();

router.get('/', function(req,res){
  res.json({message:'Yay! We split out our routes!!! High Five'});
});

module.exports = router;