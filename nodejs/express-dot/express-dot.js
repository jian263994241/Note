//PartialsCache by Ukey 2012/3/28  nodejs v0.10.1
var fs = require('fs');
var path = require('path');
var doT = require('dot');
var async = require('async');
var path = require('path'); 

var _cache = {};
var _partialsCache = {};
var _globals = {
    partialCache:false,
    fileExtension:'dot',
    load : function(file) {
        var template = null;
        // let's try loading content from cache
        if(this.partialCache == true)
            template = _partialsCache[file];
        // no content so let's load from file system
        if(template == null){
//          template = fs.readFileSync(path.join(path.dirname(process.argv[1]), file));
            template = fs.readFileSync(path.join(this.root, file+this.ext));
        }
        // let's cache the partial
        if(this.partialCache == true)
            _partialsCache[file] = template;
        return template;
  	}
};

function _renderFile(filename, options, cb) {
  'use strict';
  cb = (typeof cb === 'function') ? cb : function() {};

  var template = _cache[filename];
  if (template) {
    return cb(null, template.call(_globals, options));
  }

  return fs.readFile(filename, 'utf8', function(err, str) {
    if (err) return cb(err);

    var template = doT.template(str, null, _globals);
    if (options.cache) _cache[filename] = template;
    return cb(null, template.call(_globals, options));
  });
}

function _renderWithLayout(filename, layoutTemplate, options, cb) {
  'use strict';
  cb = (typeof cb === 'function') ? cb : function() {};

  return _renderFile(filename, options, function(err, str) {
    if (err) return cb(err);
    options.body = str;
    return cb(null, layoutTemplate.call(_globals, options));
  });
}

exports.setGlobals = function(globals) {
  'use strict';
  if(globals){
      for(var f in globals){
          _globals[f] = globals[f] ;
      }
  }
  return this;
};

exports.__express = function(filename, options, cb) {
  'use strict';
    _globals.root = this.root;
    _globals.ext = this.ext;
  cb = (typeof cb === 'function') ? cb : function() {};
  var extension = path.extname(filename);

  if (options.layout !== undefined && !options.layout) return _renderFile(filename, options, cb);

  var viewDir = options.settings.views;
  var layoutFileName = path.join(viewDir, options.layout || 'layout' + extension);

  var layoutTemplate = _cache[layoutFileName];
  if (layoutTemplate) return _renderWithLayout(filename, layoutTemplate, options, cb);

  return fs.readFile(layoutFileName, 'utf8', function(err, str) {
    if (err) return cb(err);

    var layoutTemplate = doT.template(str, null, _globals);
    if (options.cache) _cache[layoutFileName] = layoutTemplate;

    return _renderWithLayout(filename, layoutTemplate, options, cb);
  });
};
