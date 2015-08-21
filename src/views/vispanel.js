var Backbone = require("backbone");
var cytoscape = require("cytoscape");
var $ = jQuery = require("jquery");
var Link = require("../models/link");
var AnnoView = require("./annoview");
var edgehandles = require("cytoscape-edgehandles")(cytoscape, $);

var Vispanel = Backbone.View.extend({
    initialize: function(opts){
        this.el = opts.el;
        this.struct = opts.struct;
        this.resindex = opts.resindex;
        this.annotate = true;

        //events
        this.listenTo(this.struct, "change:renderSwitch", this.render);
    },
    render: function(){
        var self = this;
        var srcNode = null;
        var targetNode = null;
        self.innerHTML = "";

        this.cy = cytoscape({
      		container: self.el,
      		style: cytoscape.stylesheet()
                    .selector("node")
                    .css({
                        "content": "data(label)",
                        "text-valign": "center",
                        "color": "white",
                        "text-outline-width": 2,
                        "text-outline-color": "#778899"
                    })
                    .selector("edge")
                    .css({
                        "background-color": "white"
                    })
                    .selector(".chosen")
                    .css({
                        "background-color": "black",
                        "opacity": 0.6
                    })
                    .selector(".edgehandles-hover")
                    .css({
                        "background-color": "red"
                    })
                    .selector(".edgehandles-source")
                    .css({
                        "border-width": 2,
                        "border-color": "red"
                    })
                    .selector(".edgehandles-target")
                    .css({
                        "border-width": 2,
                        "border-color": "red"
                    })
                    .selector(".edgehandles-preview, .edgehandles-ghost-edge")
                    .css({
                        "line-color": "red",
                        "target-arrow-color": "red",
                        "target-arrow-color": "red"
                    })
                    .selector(".wcwccis")
                    .css({
                        "mid-target-arrow-shape": "circle",
                        "mid-target-arrow-color": "red"
                    })
                    .selector(".wcsgcis")
                    .css({
                        "source-arrow-shape": "circle",
                        "source-arrow-color": "red",
                        "target-arrow-shape": "triangle",
                        "target-arrow-color": "red"
                    })
                    .selector(".sgwccis")
                    .css({
                        "target-arrow-shape": "circle",
                        "target-arrow-color": "red",
                        "source-arrow-shape": "triangle",
                        "source-arrow-color": "red"
                    })
                    .selector(".hgsgcis")
                    .css({
                        "source-arrow-shape": "square",
                        "source-arrow-color": "red",
                        "target-arrow-shape": "triangle",
                        "target-arrow-color": "red"
                    })
                    .selector(".sghgcis")
                    .css({
                        "target-arrow-shape": "square",
                        "target-arrow-color": "red",
                        "source-arrow-shape": "triangle",
                        "source-arrow-color": "red"
                    })
                    .selector(".wchgcis")
                    .css({
                        "source-arrow-shape": "circle",
                        "source-arrow-color": "red",
                        "target-arrow-shape": "square",
                        "target-arrow-color": "red"
                    })
                    .selector(".hgwccis")
                    .css({
                        "target-arrow-shape": "circle",
                        "target-arrow-color": "red",
                        "source-arrow-shape": "square",
                        "source-arrow-color": "red"
                    })
                    .selector(".sgsgcis")
                    .css({
                        "mid-target-arrow-shape": "triangle",
                        "mid-target-arrow-color": "red"
                    })
                    .selector(".wcwctrans")
                    .css({
                        "mid=target-arrow-shape": "circle",
                        "mid-target-arrow-color": "red",
                        "mid-target-arrow-fill": "hollow"
                    })
                    .selector(".wcsgtrans")
                    .css({
                        "source-arrow-shape": "circle",
                        "source-arrow-color": "red",
                        "target-arrow-shape": "triangle",
                        "target-arrow-color": "red",
                        "target-arrow-fill": "hollow",
                        "source-arrow-fill": "hollow"
                    })
                    .selector(".sgwctrans")
                    .css({
                        "target-arrow-shape": "circle",
                        "target-arrow-color": "red",
                        "source-arrow-shape": "triangle",
                        "source-arrow-color": "red",
                        "source-arrow-fill": "hollow",
                        "target-arrow-fill": "hollow"
                    })
                    .selector(".hgsgtrans")
                    .css({
                        "source-arrow-shape": "square",
                        "source-arrow-color": "red",
                        "target-arrow-shape": "triangle",
                        "target-arrow-color": "red",
                        "target-arrow-fill": "hollow",
                        "source-arrow-fill": "hollow"
                    })
                    .selector(".sghgtrans")
                    .css({
                        "target-arrow-shape": "square",
                        "target-arrow-color": "red",
                        "source-arrow-shape": "triangle",
                        "source-arrow-color": "red",
                        "source-arrow-fill": "hollow",
                        "target-arrow-fill": "hollow"
                    })
                    .selector(".wchgtrans")
                    .css({
                        "source-arrow-shape": "circle",
                        "source-arrow-color": "red",
                        "target-arrow-shape": "square",
                        "target-arrow-color": "red",
                        "target-arrow-fill": "hollow",
                        "source-arrow-fill": "hollow"
                    })
                    .selector(".hgwctrans")
                    .css({
                        "target-arrow-shape": "circle",
                        "target-arrow-color": "red",
                        "source-arrow-shape": "square",
                        "source-arrow-color": "red",
                        "source-arrow-fill": "hollow",
                        "target-arrow-fill": "hollow"
                    })
                    .selector(".sgsgtrans")
                    .css({
                        "mid-target-arrow-shape": "triangle",
                        "mid-target-arrow-color": "red",
                        "mid-target-arrow-fill": "hollow"
                    })
                    .selector(".hghgcis")
                    .css({
                        "mid-target-arrow-shape": "square",
                        "mid-target-arrow-color": "red",
                    })
                    .selector(".hghgtrans")
                    .css({
                        "mid-target-arrow-shape": "square",
                        "mid-target-arrow-color": "red",
                        "mid-target-arrow-fill": "hollow"
                    }),
      		elements: self.struct.toCytoscape(),
      		layout: {
      			//Use preset layout with precalculated
      			//nucleotide coordinates
        		name: 'preset',
      		},
          	ready: function(){
                this.edges("[label='violation']").addClass("wcwccis");
                this.on("tapstart", function(evt){
                    this.$(".chosen").removeClass("chosen");
                });
                this.on("tapdragover", "node", function(evt){
                    var seqbox = document.getElementById("seqbox");
                    if(seqbox && (this.id() < seqbox.value.length)){
                        seqbox.selectionStart = parseInt(this.id());
                        seqbox.selectionEnd = parseInt(this.id())+1;
                    }
                });
                this.on("tapdragout", "node", function(evt){
                    var seqbox = document.getElementById("seqbox");
                    if(seqbox && (this.id() < seqbox.value.length)){
                        seqbox.selectionEnd = -1;
                    }
                });
                this.on("tap", "edge", function(evt){
                    if(self.annotate && this.data("label") === "violation"){
                        var obj = this._private.classes;
                        for(var c in obj) break;
                        new AnnoView(c.substring(0, 2), c.substring(2, 4), c.substring(4, c.length+1), this);
                    }
                });

                if(self.resindex){
                    //index nodes
                    for(var i=1; i<self.struct.get("seq").length/5; i++){
                        pos = self.getPos(self.struct, (i*5)-1);
                        this.add({
                            group: "nodes",
                			data: {
                				id: (self.struct.get("seq").length + i).toString(),
                				label: (i*5) + "",
                                type: "index"
                			},
                			position: {
                				x: pos[0],
                				y: pos[1]
                			},
                			selected: false,
                			selectable: false,
                			locked: false,
                			grabbable: true,
                			css: {
                				"background-color": "#fff"
                			}
                        });
                        this.add({
                            group: "edges",
                			data: {
                				id: "index" + i,
                				source: (i*5) - 1,
                    			target: self.struct.get("seq").length + i,
                    			label: i*5,
                    			weight: 4
                			},
                			css: {
                				'line-color': "black",
                				'width': 4
                			}
                        });
                    }
                }
          	},
            userPanningEnabled: true,
            userZoomingEnabled: true
    	});

        this.cy.edgehandles({
            loopAllowed: function(node){
                // for the specified node, return whether edges from itself to itself are allowed
                return false;
            },
            complete: function(srcNode, targetNode, addedEntities){
                // fired when edgehandles is done and entities are added
                self.struct.get("links").newBond(srcNode[0], targetNode[0]);
            },
            enabled: false,
            preview: false
		});

        this.trigger("rendered");
    },
    getPos: function(struct, target){
        var distance = 50;
        var found = false;
        var originX = struct.get("residues").at(target).get("x");
        var originY = struct.get("residues").at(target).get("y");
        var angleFactor = 0.0;
        var angle, x, y, tx, ty;
        while(!found && angleFactor<1){
            angle = angleFactor*Math.PI*2;
            x = Math.cos(angle)*distance + originX;
            y = Math.sin(angle)*distance + originY;
            for(var i=0; i<struct.get("seq").length+1; i++){
                if(i === struct.get("seq").length){
                    found = true;
                    break;
                }
                tx = struct.get("residues").at(i).get("x");
                ty = struct.get("residues").at(i).get("y");
                if(Math.pow((x - tx), 2) + Math.pow((y - ty), 2) < Math.pow(distance, 2)){
                    break;
                }
            }
            angleFactor += 0.05
        }
        return [x, y];
    }
});

module.exports = Vispanel;
