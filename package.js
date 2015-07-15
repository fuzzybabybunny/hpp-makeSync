Package.describe({
  name: 'hpp:makesync',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: "Like Meteor's .wrapAsync() but with actual error objects.",
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/fuzzybabybunny/hpp-makeSync',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@1.0');
  api.addFiles('makesync.js', 'server');
  api.export('makeSync', 'server');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('hpp:makesync');
  api.addFiles('makesync-tests.js');
});
