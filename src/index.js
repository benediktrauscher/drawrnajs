$ = jQuery = require("jquery");
module.exports.vis = require('./visualizerna');
module.exports.t = require('./transform');
module.exports.io = require('./parseinput');
var spectrum = require('./spectrum');
module.exports.spectrum = spectrum;
spectrum($);