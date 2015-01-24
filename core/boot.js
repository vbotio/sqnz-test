/**
----------------------------------------------------------------------
                          NG CLI BOOT APP
----------------------------------------------------------------------

boot.js file will start your angular app.

What's going on ?

Extends your manual dependencies
Resolve initializers
Bootstrap angular app

*/

"use strict";

var boot, bulk, initAngularApp, initializers;

initAngularApp = function(hash, dependencies) {
  angular.element(document).ready(function() {
    deferredBootstrapper.bootstrap({
      element: document.body,
      module: "angularApp",
      injectorModules: dependencies,
      resolve: hash
    });
    return require("../app/hooks");
  });
};

initializers = "@loadInitializers";

boot = function(dependencies) {
  var app, deps, identifier, injectorDependencies, mapHash, name, objectKeys, resolvesList, x;
  deps = ["ngRoute"];
  if (typeof dependencies === "object") {
    deps = deps.concat(dependencies);
  }
  app = angular.module("angularApp", deps);
  mapHash = {};
  injectorDependencies = ["angularApp"];
  if (Object.keys(initializers).length > 0 && typeof initializers[".."] !== "undefined" && typeof initializers[".."].app !== "undefined") {
    resolvesList = initializers[".."].app.initializers;
    objectKeys = Object.keys(resolvesList);
    x = 0;
    while (x < objectKeys.length) {
      identifier = objectKeys[x];
      name = resolvesList[identifier].provider;
      mapHash[name] = resolvesList[identifier].resolve;
      if (typeof resolvesList[identifier].dependencies !== "undefined") {
        injectorDependencies = injectorDependencies.concat(resolvesList[identifier].dependencies);
      }
      x++;
    }
  }
  initAngularApp(mapHash, injectorDependencies);
};

module.exports = boot;
