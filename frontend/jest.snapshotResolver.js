module.exports = {
  testPathForConsistencyCheck: 'some/__tests__/example.test.js',
  resolveSnapshotPath: (testPath, snapshotExtension) =>
    testPath
      .replace('frontend/src/', 'frontend/__snapshots__/') + snapshotExtension,
  resolveTestPath: (snapshotFilePath, snapshotExtension) =>
    snapshotFilePath
      .replace('__snapshots__/', 'src/')
      .slice(0, -snapshotExtension.length),
}