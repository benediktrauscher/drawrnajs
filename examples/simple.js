// if you don't specify a html file, the sniper will generate a div
var rna = require("rnavis");
var app = rna.vis;

//var instance = new app({el: yourDiv, text: 'biojs'});


//initalize input boxes with example structure
document.getElementById('SEQ_BOX').value = "CGCUUCAUAUAAUCCUAAUGAUAUGGUUUGGGAGUUUCUACCAAGAGCCUUAAACUCUUGAUUAUGAAGUG";
document.getElementById('DOTBR_BOX').value = "(((((((((...((((((.........))))))........((((((.......))))))..)))))))))";
//init colors
$("#acolor").spectrum({ color: "#64F73F" });
$("#ccolor").spectrum({ color: "#FFB340" });
$("#gcolor").spectrum({ color: "#EB413C" });
$("#ucolor").spectrum({ color: "#3C88EE" });

var input = rna.io.getInputSequences();
var struct = rna.t.transformDotBracket(input[0], input[1]);

var cy = document.getElementById('cy');
cy.style.width = "60%";

app({graph: struct, el: cy});

var runButton = document.getElementById('PERFORM_VIS');
runButton.addEventListener('click', function(){ 
	var input = getInputSequences();
	if(input[0].length === input[1].length && input[0].length > 0 && input[1].length > 0){
		var struct = rna.t.transformDotBracket(input[0], input[1]);
		app(struct);
	}
}, false);