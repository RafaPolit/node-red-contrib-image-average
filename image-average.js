const Jimp = require('jimp');

const input = (node, msg, config) => {
  const URL = config.URL || msg.payload;

  let t = process.hrtime();

  Jimp.read(URL)
  .then(function (img) {
    let values = [0, 0, 0];
    img.scan(0, 0, img.bitmap.width, img.bitmap.height, function (x, y, idx) {
      values = [
        values[0] + this.bitmap.data[ idx + 0 ],
        values[1] + this.bitmap.data[ idx + 1 ],
        values[2] + this.bitmap.data[ idx + 2 ]
      ];
    });

    msg.payload = values.map(v => v / values.length);

    t = process.hrtime(t);

    msg.stats = { pixels: values.length, time: t[0] + t[1] / 1000000000 }

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