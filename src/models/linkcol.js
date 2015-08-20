var Backbone = require("backbone");
var Link = require("./link");
var pdbr = require("../utils/parsedbr");

var LinkCol = Backbone.Collection.extend({
    model: Link,
    initialize: function(model, stl){
        this.style = stl;
    },
    newBond: function(src, target){
        var type = pdbr.getType(pdbr.isWatsonCrick(src.data("label"), target.data("label")));
        var style = this.style;

        this.add(new Link({
            id: src.id() + "to" + target.id(),
            source: src.id(),
            target: target.id(),
            label: type,
            weight: style.getWeight(type),
            color: style.getColor(type)
        }));
    }
});

module.exports = LinkCol;
