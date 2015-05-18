var v = {};

var drawEdge = false;
var srcNode = {};
var targetNode = {};

var t = require('./transform.js');
var cytoscape = require('../node_modules/cytoscape/dist/cytoscape');

var visCytoscapeJs;
module.exports = visCytoscapeJs = function(opts) {
	var cyEle = t.toCytoscapeElements(opts.graph);

	var cy = cytoscape({
  		container: opts.el,
  
  		style: cytoscape.stylesheet()
                .selector("node")
                .css({
                    "content": "data(label)",
                    "text-valign": "center",
                    "color": "white",
                    "text-outline-width": 2,
                    "text-outline-color": "#778899"
                })
                .selector(":selected")
                .css({
                    "background-color": "black",
                    "opacity": 0.6
                })
                .selector("edge")
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

            if(document.getElementById("CENTER") !== null){
          		var centerButton = opts.doc.getElementById('CENTER');
      			centerButton.readOnly = true;
      			centerButton.addEventListener('click', function(){ 
      				cy.center();
      				cy.fit();
      			}, false);
            }

            if(document.getElementById("EXPORT") !== null){
      			var exportButton = opts.doc.getElementById('EXPORT');
      			exportButton.readOnly = true;
      			exportButton.addEventListener('click', function(){
        			var png64 = cy.png();
        			var newTab = window.open();
        			newTab.document.write("<img src=" + png64 + " />");
        			newTab.focus();
      			}, false);
            }
      	},

        userPanningEnabled: false
	});
	
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
	});

    //Lasso Functionality
    $.fn.extend({
      lasso: function () {
         this.mousedown(function (e) {
            // left mouse down switches on "capturing mode"
            if (e.which === 1 && !$(this).is(".lassoRunning")) {
              $(this).addClass("lassoRunning");
              $(this).data("lassoPoints", []);
              $(this).trigger("lassoBegin");
              //alert("here");
            }
          });
          this.mouseup(function (e) {
            // left mouse up ends "capturing mode" + triggers "Done" event
            if (e.which === 1 && $(this).is(".lassoRunning")) {
              $(this).removeClass("lassoRunning");
              $(this).trigger("lassoDone", [$(this).data("lassoPoints")]);
            }
          });
          this.mousemove(function (e) {
            // mouse move captures co-ordinates + triggers "Point" event
            if ($(this).is(".lassoRunning")) {
              var px = (e.offsetX || e.clientX - $(e.target).offset().left + window.pageXOffset);
              var py = (e.offsetY || e.clientY - $(e.target).offset().top + window.pageYOffset);
              var point = [px, py];
              $(this).data("lassoPoints").push(point);
              $(this).trigger("lassoPoint", [point]);
            }
          });
          return this;
      }
    });

    var polygon = [];
    $("#cy")
    .lasso()
    .on("lassoBegin", function(e, lassoPoints) {
        polygon = [];
        canvas = $('[data-id="layer1"]')[0];
        c2 = canvas.getContext('2d');
        c2.fillStyle = "rgba(100, 100, 100, 0.02)";
        c2.beginPath();

        c2.moveTo(e.pageX, e.pageY);
    })
    .bind("lassoPoint", function(e, lassoPoint) {
        c2.lineTo(lassoPoint[0], lassoPoint[1] );
        c2.fill();
        polygon.push({x: lassoPoint[0], y: lassoPoint[1]});
    })
    .on("lassoDone", function(e, lassoPoints) {
        // do something with lassoPoints
        c2.closePath();
        c2.clearRect(0,0,canvas.width,canvas.height);
        var graphNodes = cy.nodes();
        for(var i=0; i<graphNodes.length; i++){
            if(isPointInPoly(polygon, cy.$("#" + graphNodes[i].id()).renderedPosition())){
                cy.$("#" + graphNodes[i].id()).select();
            }
        }
    });

    if(document.getElementById("SELCOL") !== null){
        var changeCol = document.getElementById("SELCOL");
        changeCol.readOnly = true;
        changeCol.addEventListener("click", function(){ 
            cy.$(':selected').css("background-color", $("#selcolor").spectrum('get').toHexString());
            cy.$(':selected').unselect();
        }, false);
    }
      
    function isPointInPoly(poly, pt){
        var i, j, c = 0;
        for (i = 0, j = poly.length-1; i < poly.length; j = i++) {
          if ( ((poly[i].y>pt.y) != (poly[j].y>pt.y)) && 
            (pt.x < (poly[j].x-poly[i].x) * (pt.y-poly[i].y) / (poly[j].y-poly[i].y) + poly[i].x) )
            c = !c;
        }
        return c;
    }
}