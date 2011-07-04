dojoConfig = {
  isDebug: false, // We don't have firebug in node.js
  modulePaths: {'webasap': '../../webasap'}
};

require({
  baseUrl: './',
  // set the paths to our library packages
  packages: [
    {
      name: 'dojo',
      location: 'dojo-release-1.7.0b2-src/dojo',
      main: 'main',
      lib: '.'
    },
    {
      name: 'dijit',
      location: 'dojo-release-1.7.0b2-src/dijit',
      main: 'main',
      lib: '.'
    }
  ],
  // set the path for the require plugins—text, i18n, etc.
  paths: {
    require: 'lib/requirejs/require'
  }
});

// load the app!
require(['app']);
