module.exports = {
  name: 'push-based',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/push-based',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
