var rna = require("drawrnajs");
var app = rna.vis;

galaxy.getData(function(data, req){
	var lines = data.split("\n");
	if(lines.length < 3 ){
		el.textContent = "Error: invalid dbn file";
	}
	var struct = rna.t.transformDotBracket(lines[1], lines[2]);
	galaxy.el.className += " cy";
	app({graph: struct, el: galaxy.el});
});
