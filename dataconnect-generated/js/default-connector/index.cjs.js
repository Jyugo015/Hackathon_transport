const { getDataConnect, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'Hackathon_transport',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

