const Jimp = require('jimp');

const input = (node, msg, config) => {
  node.warn('Config:' + JSON.stringify(config, null, ' '));
  node.warn('msg:' + JSON.stringify(msg, null, ' '));
  node.warn('jimp?:' + Jimp);

  const URL = config.URL || msg.payload;
  const values = [];

  node.warn('URL:' + URL);
  Jimp.read(URL)
  .then(function (img) {
    node.warn('Acquired image');
    img.scan(0, 0, img.bitmap.width, img.bitmap.height, function (x, y, idx) {
      values.push([ this.bitmap.data[ idx + 0 ], this.bitmap.data[ idx + 1 ], this.bitmap.data[ idx + 2 ] ]);
    });

    msg.payload = { values };

    node.send(msg);
  }).catch(function (err) {
    node.warn(err);
  });

}

module.exports = function(RED) {
  function ImageAverageNode(config) {
    RED.nodes.createNode(this, config);
    let node = this;
    node.on('input', (msg) => { input(node, msg, config); });
  }

  RED.nodes.registerType('image-average', ImageAverageNode);
}