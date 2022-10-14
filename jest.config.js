const { createConfig } = require('@edx/frontend-build');

module.exports = createConfig('jest', {
  modulePaths: ['src'],
  setupFiles: [
    '<rootDir>/src/setupTest.js',
  ],
  coveragePathIgnorePatterns: [
    'src/setupTest.js',
    'src/i18n',
  ],
});
