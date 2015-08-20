var $ = jQuery = require("jquery");

var Style = module.exports = function(theme){
    this.theme = theme;
}

Style.prototype.getColor = function(element){
    //Get color for a certain nucleotide as specified by the color
	//picker in the options column of the page.
	var col = "black";
	if($("#acolor").length > 0){
		if (element === "A"){
			col = $("#acolor").spectrum('get').toHexString();
		}
		else if (element === "C"){
			col = $("#ccolor").spectrum('get').toHexString();
		}
		else if (element === "U"){
			col = $("#ucolor").spectrum('get').toHexString();
		}
		else if (element === "G"){
			col = $("#gcolor").spectrum('get').toHexString();
		}
		else if (element === "hbond"){
			col = "#3A9AD9";
		}
		else if(element === "violation") {
			col = "red";
		}
	} else {
		if (element === "A"){
			col = "#64F73F";
		}
		else if (element === "C"){
			col = "#FFB340";
		}
		else if (element === "U"){
			col = "#3C88EE";
		}
		else if (element === "G"){
			col = "#EB413C";
		}
		else if (element === "hbond"){
			col = "#3A9AD9";
		}
		else if(element === "violation") {
			col = "red";
		}
	}
	return col;
}

Style.prototype.getWeight = function(type){
    //Get weight for a certain bond type
    var weight;
    if(type=== "hbond" || type === "violation"){
        weight = 4;
    } else {
        weight = 5;
    }
    return weight;
}
