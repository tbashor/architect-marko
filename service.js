module.exports = function(options, imports, register) {
  'use strict';
  var log = imports.debug('stonecraft:marko');
  log('start');

  var path = require('path');
  var marko = require('marko');
  var browserRefresh = require('marko/browser-refresh');
  var hotReload = require('marko/hot-reload');

  require('marko/node-require').install();

  function loadTemplates(dirname, templatePaths){
    var templates = {};
    if (Array.isArray(templatePaths)){
      templatePaths.forEach(function addTemplate(component){
        var templateName = Object.keys(component)[0];
        var templatePath = path.join(dirname, component[templateName]);
        templates[templateName] = marko.load(templatePath);
      });
      return templates;
    } else {
      // TODO: emit error to system
      log.error('loadTemplates requires an array of componentPaths');
      console.error('loadTemplates requires an array of componentPaths');
    }
  }

  function loadTemplateSync(dirname, templatePath){
    return marko.load(path.join(dirname, templatePath));
  }

  function loadTemplate(dirname, templatePath, callback){
    callback(marko.load(path.join(dirname, templatePath)));
  }


  var api = {
    marko: {
      load: marko.load,
      createWriter: marko.createWriteStream,
      loadTemplates: loadTemplates,
      loadTemplate: loadTemplate,
      loadTemplateSync: loadTemplateSync,
      install: function(){
        require('marko/node-require').install();
      }
    },
    browserRefresh: browserRefresh,
    hotReload: hotReload
  };

  log('register');
  register(null, api);
};
