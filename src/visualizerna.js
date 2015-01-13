var v = {};

var drawEdge = false;
var srcNode = {};
var targetNode = {};

var t = require('./transform.js');
var cytoscape = require('cytoscape');

var visCytoscapeJs;
module.exports = visCytoscapeJs = function(opts) {
	var cyEle = t.toCytoscapeElements(opts.graph);

	var cy = cytoscape({
  		container: opts.el,
  
  		style: cytoscape.stylesheet()
	    		.selector('node')
	      		.css({
			        'content': 'data(label)',
			        'text-valign': 'center',
			        'color': 'white',
			        'text-outline-width': 2,
			        'text-outline-color': '#778899'
	      		})
	    		.selector(':selected')
	      		.css({
			        'background-color': 'black',
			        'line-color': 'black',
			        'target-arrow-color': 'black',
			        'source-arrow-color': 'black',
			        'text-outline-color': 'black'
	      		})
	      		.selector('edge')
	      		.css({
	      			
	      		}),
  
  		elements: cyEle,
  		
  		layout: {
  			//Use preset layout with precalculated 
  			//nucleotide coordinates
    		name: 'preset',
  		},			
      
      	ready: function(){
			cy.viewport({
  				zoom: 2,
 				pan: { x: 100, y: 100 }
			});
			cy.fit();
			opts.el.childNodes[0].childNodes[4].style.position = "relative";
      		opts.el.childNodes[0].style.position = "relative";
      		opts.el.style.position = "absolute";
      		opts.el.style.height = "700px";

      		var centerButton = opts.doc.getElementById('CENTER');
  			centerButton.readOnly = true;
  			centerButton.addEventListener('click', function(){ 
  				cy.center();
  				cy.fit();
  			}, false);

  			var exportButton = opts.doc.getElementById('EXPORT');
  			exportButton.readOnly = true;
  			exportButton.addEventListener('click', function(){
    			var png64 = cy.png();
    			var newTab = window.open();
    			newTab.document.write('<img src="'+png64+'"/>');
    			newTab.focus();
  			}, false);
      	}
	})
	
	//Display nucleotide index on mouseover
	/*cy.on('mouseover', 'node', function(event){
		var nd = event.cyTarget;
		Tip(parseInt(nd.id(), 10)+1);
	})
	cy.on('mouseout', 'node', function(event){
		var nd = event.cyTarget;
		UnTip();
	})*/

	// Add events for adding hbonds
	$( document ).keydown(function(key) {
		if(key.keyCode === 78){
			console.log("edge drawing enabled");
			drawEdge = true;
		}
	});
	
	cy.on('tap', 'node', function(event){
		if(drawEdge && $.isEmptyObject(srcNode)){
			srcNode = event.cyTarget;
			console.log("new source node specified");
		} 
		else if (drawEdge && !($.isEmptyObject(srcNode))) {
			targetNode = event.cyTarget;
			console.log("new target node specified");
			var inputStr = t.graphToStrings(opts.graph);
			opts.graph.links.push({source: parseInt(srcNode.id(), 10), 
				target: parseInt(targetNode.id(), 10), 
				type: "hbond"});
			drawEdge = false;
			srcNode = {};
			targetNode = {};

			inputStr = t.graphToStrings(opts.graph);
			opts.doc.getElementById('DOTBR_BOX').value = inputStr.dotbr;
			visCytoscapeJs({graph: t.transformDotBracket(inputStr.seq, inputStr.dotbr), el: opts.el, win: opts.win, doc: opts.doc});

		} else {
			console.log("Edge drawing deactivated, press N to activate");
		}
	})
}