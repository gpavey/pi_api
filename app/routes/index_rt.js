
function setup(app){
  app.get('/', getRoot)
}

function getRoot(req,res){
  res.json({message:'Home'});
}

module.exports = setup;