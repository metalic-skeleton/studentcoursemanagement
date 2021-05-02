'use strict';

module.exports = {
  health: health
};

function health(req, res) {
  res.json({message :'Application is running...'});
}
