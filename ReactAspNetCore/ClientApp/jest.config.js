module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsDom',
    moduleDirectories: ['.', 'node_modules'],
    snapshotResolver: '<rootDir>/misc/snapshotResolver.js',
    globals: {
        'ts-jest': {
            diagnostics: {
                ignoreCodes: [151001]
            }
        }
    }
};