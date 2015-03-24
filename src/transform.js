var t = {};
module.exports = t;

t.transformDotBracket = function(seq, dotbr){
	var round = new Array();
	var curly = new Array();
	var square = new Array();
	var pointy = new Array();

	var nodes = new Array();
	var links = new Array();

	var src;
	var type;

	//Indices corresponding to opening brackets are pushed onto a stack
	//and are popped when a closing bracket is read.
	//Links (hbonds, phosphodiester bonds) are created as needed.
	for(var i = 0; i < seq.length; i++){
		nodes.push({name: seq[i].toUpperCase()});
		if(i > 0){
			links.push({source: i-1, target: i, type: "phosphodiester"});
		}
		switch(dotbr[i]){
			case "(":
				round.push(i);
				break;
			case "{":
				curly.push(i);
				break;
			case "[":
				square.push(i);
				break;
			case "<":
				pointy.push(i);
				break;
			case ")":
				src = round.pop();
				type = t.getType(t.isWatsonCrick(seq[src], seq[i]));
				links.push({source: src, target: i, type: type});
				break;
			case "}":
				src = curly.pop();
				type = t.getType(t.isWatsonCrick(seq[src], seq[i]));
				links.push({source: src, target: i, type: type});
				break;
			case "]":
				src = square.pop();
				type = t.getType(t.isWatsonCrick(seq[src], seq[i]));
				links.push({source: src, target: i, type: type});
				break;
			case ">":
				src = pointy.pop();
				type = t.getType(t.isWatsonCrick(seq[src], seq[i]));
				links.push({source: src, target: i, type: type});
				break;
			case ".":
				break;
		}
	}
	//Calculate coordinates for the nucleotides as suggested by RNAviz.
	var coords = t.getCoords(seq, dotbr, links);
	//Return graph in object format
	return {nodes: nodes,
			links: links,
			coords: coords};
}

t.toCytoscapeElements = function(graph){
	//Create a JSON structure from a graph object built by the 
	//transformDotBracket function
	//The JSON structure fits the requirements of CytoscapeJS
	var elements = [];
	var el;

	var nodes = graph.nodes;
	var coords = graph.coords;
	for(var i = 0; i < nodes.length; i++){
		el = {
			group: 'nodes',
			data: {
				id: i.toString(),
				label: nodes[i].name
			},
			position: {
				x: coords[i].x,
				y: coords[i].y
			},
			selected: false,
			selectable: true,
			locked: false,
			grabbable: true,
			css: {
				'background-color': t.getColor(nodes[i].name)
				//'width': 100,
				//'height': 100
			}
		}
		elements.push(el);
	}
	var links = graph.links;
	for(var i = 0; i < links.length; i++){
		el = {
			group: 'edges',
			data: {
				id: links[i].source + "to" + links[i].target,
				source: links[i].source.toString(), 
    			target: links[i].target.toString(),
    			label: links[i].type ,
    			weight: t.getWeight(links[i].type)
			},
			css: {
				'line-color': t.getColor(links[i].type),
				'width': t.getWeight(links[i].type)
			}
		}
		elements.push(el);
	}
	return elements;
}

t.getColor = function(element){
	//Get color for a certain nucleotide as specified by the color
	//picker in the options column of the page.
	var col = "black";
	if($("#acolor").length  > 0){
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
			col = "#EB413C";
		}
		else if (element === "G"){
			col = "#3C88EE";
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

t.getWeight = function(type) {
	//Get weight for a certain bond type
	var weight; 
	if(type=== "hbond" || type === "violation"){
    	weight = 4;
    } else {
    	weight = 5;
    }
    return weight;
}

t.getCoords = function(seq, dotbr, links){
	//This function calculates the coordinates for each nucleotide
	//according to the RNAviz algorithm
	var coords = [];
	var centers = [];
	var angles = [];
	var dirAngle = -1;

	for(var i = 0; i < seq.length; i++){
		coords[i] = {x: 0, y: 0};
		centers[i] = {x: 0, y: 0};
	}

	dirAngle += 1.0 - Math.PI / 2.0;
	var i = 0;
	var x = 0.0;
	var y = 0.0;
	var vx = -Math.sin(dirAngle);
	var vy = Math.cos(dirAngle);

	while(i < seq.length){
		coords[i].x = x;
		coords[i].y = y;
		centers[i].x = x + 65 * vy;
		centers[i].y = y - 65 * vx;
		var j = t.getPartner(i, links);
		
		if(j > i){
			t.drawLoop(i, j, 	x + (65 * vx / 2.0), y
								+ (65 * vy / 2.0), dirAngle,
								coords, centers, angles, seq, links);
			centers[i].x = coords[i].x + 65 * vy;
			centers[i].y = y - 65 * vx;
			i = j;
			x += 65 * vx;
			y += 65 * vy;
			centers[i].x = coords[i].x + 65 * vy;
			centers[i].y = y - 65 * vx;
		}
		x += 35 * vx;
		y += 35 * vy;
		//debug(coords[i].x + " " + coords[i].y);
		i += 1;
	}

	return coords;
}

t.getPartner = function(srcIndex, links){
	//Returns the partner of a nucleotide:
	//-1 means there is no partner
	var partner = -1;
	for(var i = 0; i < links.length; i++){
		if(links[i].type != "phosphodiester"){
			if(links[i].source === srcIndex){
				partner = links[i].target;
				break;
			}
			else if(links[i].target === srcIndex){
				partner = links[i].source;
				break;
			}
			else {
				continue;
			}
		}
	}
	return partner;
}

t.drawLoop = function(i, j, x, y, dirAngle, coords, centers, angles, seq, links){
	//Calculates loop coordinates
	if (i > j) {
		return;
	}

	// BasePaired
	if (t.getPartner(i, links) === j) {
		var normalAngle = Math.PI / 2.0;
		centers[i] = {x: x, y: y};
		centers[j] = {x: x, y: y};
		coords[i].x = (x + 65 * Math.cos(dirAngle - normalAngle) / 2.0);
			coords[i].y = (y + 65 * Math.sin(dirAngle - normalAngle) / 2.0);
			coords[j].x = (x + 65 * Math.cos(dirAngle + normalAngle) / 2.0);
			coords[j].y = (y + 65 * Math.sin(dirAngle + normalAngle) / 2.0);
			t.drawLoop(i + 1, j - 1, x + 40 * Math.cos(dirAngle), y + 40 * Math.sin(dirAngle), dirAngle, coords,
					centers, angles, seq, links);
	} 
	else {
		//multi loop now
		var k = i;
		var basesMultiLoop = [];
		var helices = [];
		var l;
		while (k <= j) {
			l = t.getPartner(k, links);
			if (l > k) {
				basesMultiLoop.push(k);
				basesMultiLoop.push(l);
				helices.push(k);
				k = l + 1;
			}
			else {
				basesMultiLoop.push(k);
				k++;
			}
		}
		var mlSize = basesMultiLoop.length + 2;
		var numHelices = helices.length + 1;
		var totalLength = 35 * (mlSize - numHelices) + 65 * numHelices;
		var multiLoopRadius;
		var angleIncrementML;
		var angleIncrementBP;
		if (mlSize > 3) {
			multiLoopRadius = t.determineRadius(numHelices, mlSize - numHelices, (totalLength) / (2.0 * Math.PI), 65, 35);
			angleIncrementML = -2.0 * Math.asin(35 / (2.0 * multiLoopRadius));
			angleIncrementBP = -2.0 * Math.asin(65 / (2.0 * multiLoopRadius));
		}
		else {
			multiLoopRadius = 35.0;
			angleIncrementBP = -2.0 * Math.asin(65 / (2.0 * multiLoopRadius));
			angleIncrementML = (-2.0 * Math.PI - angleIncrementBP) / 2.0;
		}
		var centerDist = Math.sqrt(Math.max(Math.pow(multiLoopRadius, 2) - Math.pow(65 / 2.0, 2), 0.0)) - 40;
		var mlCenter = {x: x + (centerDist * Math.cos(dirAngle)),
						y: y + (centerDist * Math.sin(dirAngle))}
		// Base directing angle for (multi|hairpin) loop, from the center's
		// perspective
		var baseAngle = dirAngle
				// U-turn
				+ Math.PI
				// Account for already drawn supporting base-pair
				+ 0.5 * angleIncrementBP
				// Base cannot be paired twice, so next base is at
				// "unpaired base distance"
				+ 1.0 * angleIncrementML;
			
		var currUnpaired = [];
		var currInterval = {el1: 0, el2: baseAngle-1.0 * angleIncrementML};
		var intervals = [];
			
		for (k = basesMultiLoop.length - 1; k >= 0; k--) {
			l = basesMultiLoop[k];
			centers[l] = mlCenter;
			var isPaired = (t.getPartner(i, links) != -1);
			var isPaired3 = isPaired && (t.getPartner(i) < l);
			var isPaired5 = isPaired && !isPaired3;
			if (isPaired3) {
				baseAngle = t.correctHysteresis(baseAngle+angleIncrementBP/2.)-angleIncrementBP/2.;
				currInterval.el1 = baseAngle;
				intervals.push({el1: currUnpaired, el2: currInterval });
				currInterval = { el1: -1., el2: -1. };  
				currUnpaired = [];
			}
			else if (isPaired5)
			{
				currInterval.el2 = baseAngle;
			}
			else
			{
				currUnpaired.push(l);
			}
			angles[l] = baseAngle;
			if (isPaired3)
			{ 
				baseAngle += angleIncrementBP;
			}
			else {
				baseAngle += angleIncrementML;
			}
		}
		currInterval.el1 = dirAngle - Math.PI - 0.5 * angleIncrementBP;
		intervals.push( {el1: currUnpaired, el2: currInterval } );

		for(var z = 0; z < intervals.length; z++){
			var mina = intervals[z].el2.el1;
			var maxa = t.normalizeAngle(intervals[z].el2.el2, mina);
			
			for (var n = 0; n < intervals[z].el1.length; n++){
				var ratio = (1. + n)/(1. + intervals[z].el1.length);
				var b = intervals[z].el1[n];
				angles[b] = mina + (1.-ratio)*(maxa-mina);
			}
		}
				
		for (k = basesMultiLoop.length - 1; k >= 0; k--) {
			l = basesMultiLoop[k];
			coords[l].x = mlCenter.x + multiLoopRadius * Math.cos(angles[l]);
			coords[l].y = mlCenter.y + multiLoopRadius * Math.sin(angles[l]);
		}	
			
		var newAngle;
		var m, n;
		for (k = 0; k < helices.length; k++) {
			m = helices[k];
			n = t.getPartner(m, links);
			newAngle = (angles[m] + angles[n]) / 2.0;
			t.drawLoop(m + 1, n - 1, (40 * Math.cos(newAngle)) + (coords[m].x + coords[n].x) / 2.0,
						(40 * Math.sin(newAngle))
								+ (coords[m].y + coords[n].y) / 2.0, newAngle,
						coords, centers, angles, seq, links);
			}
		}
}

t.determineRadius  = function(nbHel, nbUnpaired, startRadius, bpdist, multidist) {
	var xmin = bpdist / 2.0;
	var xmax = 3.0 * multidist + 1;
	var x = (xmin + xmax) / 2.0;
	var y = 10000.0;
	var ymin = -1000.0;
	var ymax = 1000.0;
	var numIt = 0;
	var precision = 0.00001;
	while ((Math.abs(y) > precision) && (numIt < 10000)) {
		x = (xmin + xmax) / 2.0;
		y = t.objFun(nbHel, nbUnpaired, x, bpdist, multidist);
		ymin = t.objFun(nbHel, nbUnpaired, xmax, bpdist, multidist);
		ymax = t.objFun(nbHel, nbUnpaired, xmin, bpdist, multidist);
		if (ymin > 0.0) {
			xmax = xmax + (xmax - xmin);
		} else if ((y <= 0.0) && (ymax > 0.0)) {
			xmax = x;
		} else if ((y >= 0.0) && (ymin < 0.0)) {
			xmin = x;
		} else if (ymax < 0.0) {
			xmin = Math.max(xmin - (x - xmin),
					Math.max(bpdist / 2.0, multidist / 2.0));
			xmax = x;
		}
		numIt++;
	}
	return x;
}

t.objFun  = function(n1, n2, r, bpdist, multidist) {
	return ( n1 * 2.0 * Math.asin(bpdist / (2.0 * r)) + n2 * 2.0
				* Math.asin( multidist / (2.0 * r)) - (2.0 * Math.PI));
}

t.correctHysteresis  = function(angle){
	var hystAttr = [ 0., Math.PI/4., Math.PI/2., 3.*Math.PI/4., Math.PI, 5.*(Math.PI)/4., 3.*(Math.PI)/2, 7.*(Math.PI)/4.];
	var result = t.normalizeAngle(angle);
	for (var i = 0; i < hystAttr.length; i++){
		var att = hystAttr[i];
		if (Math.abs(t.normalizeAngle(att-result,-Math.PI)) < .15){
			result = att;
		}
	}
	return result;
}

t.normalizeAngle  = function(angle){
	return t.normalizeAngle(angle,0.);
}
	
t.normalizeAngle  = function(angle,fromVal) {
	var toVal = fromVal +2.*Math.PI;
	var result = angle;
	while(result<fromVal){
		result += 2.*Math.PI;
	}
	while(result >= toVal)
	{
		result -= 2.*Math.PI;
	}
	return result;		
}

t.graphToStrings  = function(graph){
	//This function is used to update String/Dot-Bracket Notation
	//after a hbond was inserted
	var seq = "";
	var dotbr = [];
	var partner;

	for(var i = 0; i < graph.nodes.length; i++){
		seq += graph.nodes[i].name;
		partner = t.getPartner(i, graph.links);
		if(partner === -1){
			dotbr[i] = ".";
		}
		else if(partner > i){
			dotbr[i] = "(";
			dotbr[partner] = ")";
		} 
		else {
			continue;
		}
	}

	return({seq: seq, dotbr: dotbr.join("")});
}

t.isWatsonCrick = function(nucOne, nucTwo){
	var watsonCrick = false;
	if(nucOne === "G" && nucTwo === "C" ||
		nucOne === "C" && nucTwo === "G" ||
		nucOne === "A" && nucTwo === "U" || 
		nucOne === "U" && nucTwo === "A") {
		watsonCrick = true;
	}
	return watsonCrick;
}

t.getType = function(watsonCrick){
	if(watsonCrick){
		return "hbond";
	} else {
		return "violation";
	}
}
