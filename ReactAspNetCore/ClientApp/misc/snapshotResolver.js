const path = require('path');

let rootPath = path.join(__dirname, '..');
let snapshotPath = path.join(rootPath, '__snapshots__');

module.exports = {
    resolveSnapshotPath: (testPath, snapshotExtension) =>
        testPath.replace(rootPath, snapshotPath) + snapshotExtension,

    resolveTestPath: (snapshotFilePath, snapshotExtension) =>
        snapshotFilePath.replace(snapshotPath, rootPath).slice(0, -snapshotExtension.length),

    testPathForConsistencyCheck: '/projects/ReactAspNetCore/components/layout/Layout.test.tsx'
};