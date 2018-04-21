const Jimp = require('jimp');

const input = (node, msg, config) => {
  node.warn('Config:', config);
  node.warn('msg:', msg);
  node.warn('jimp?:', Jimp);
  node.send(msg);
}

module.exports = function(RED) {
  function ImageAverageNode(config) {
    RED.nodes.createNode(this, config);
    let node = this;
    node.on('input', (msg) => { input(node, msg, config); });
  }

  RED.nodes.registerType('image-average', ImageAverageNode);
}