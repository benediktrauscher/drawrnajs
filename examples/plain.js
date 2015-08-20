var Rna = require("drawrnajs");

var input = [
    "CGCUUCAUAUAAUCCUAAUGAUAUGGUUUGGGAGUUUCUACCAAGAGCCUUAAACUCUUGAUUAUGAAGUG",
    "(((((((((...((((((.........))))))........((((((.......))))))..)))))))))"
];
var app = new Rna({
    el: yourDiv,
    seq: input[0],
    dotbr: input[1],
    layout: "naview",
    seqpanel: false,
    optspanel: false,
    resindex: false
})
app.render();
