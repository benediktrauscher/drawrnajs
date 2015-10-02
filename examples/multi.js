var Rna = require("drawrnajs");

var el1 = document.getElementById("str1");
var el2 = document.getElementById("str2");
var el3 = document.getElementById("str3");
var el4 = document.getElementById("str4");

var input = [
    "CAGCACGACACUAGCAGUCAGUGUCAGACUGCAIACAGCACGACACUAGCAGUCAGUGUCAGACUGCAIACAGCACGACACUAGCAGUCAGUGUCAGACUGCAIA",
    "..(((((...(((((...(((((...(((((.....)))))...))))).....(((((...(((((.....)))))...))))).....)))))...))))).."
];
var input2 = [
    "CGCUUCAUAUAAUCCUAAUGAUAUGGUUUGGGAGUUUCUACCAAGAGCCUUAAACUCUUGAUUAUGAAGUGGGGGGGGGGGGG",
    "(((((((((...((((((.........))))))........((((((.......))))))..)))))))))............"
]
var input3 = [
    "CGCUUCAUAUAAUCCUAAUGAUAUGGUUUGGGAGUUUCUACCAAGAGCCUUAAACUCUUGAUUAUGAAGUG",
    "(((((((((...((((((.........))))))........((((((.......))))))..)))))))))"
]
var input4 = [
    "AAAAAUUCAGCACGACACUAGCAGUCAGUGUCAGACUGCAIACAGCACGACACUAGCAGUCAGUGUCAGACUGCAIACAGCACGACACUAGCAGUCAGUGUCAGACUGCAIA",
    "((...))..(((((...(((((...(((((...(((((.....)))))...))))).....(((((...(((((.....)))))...))))).....)))))...))))).."
];

var app1 = new Rna({
    el: el1,
    seq: input[0],
    dotbr: input[1],
    layout: "naview",
    seqpanel: false,
    optspanel: false,
    resindex: true
})
app1.render();

var app2 = new Rna({
    el: el2,
    seq: input2[0],
    dotbr: input2[1],
    layout: "naview",
    seqpanel: false,
    optspanel: false,
    resindex: true
})
app2.render();

var app3 = new Rna({
    el: el3,
    seq: input3[0],
    dotbr: input3[1],
    layout: "naview",
    seqpanel: false,
    optspanel: false,
    resindex: true
})
app3.render();

var app4 = new Rna({
    el: el4,
    seq: input4[0],
    dotbr: input4[1],
    layout: "naview",
    seqpanel: false,
    optspanel: false,
    resindex: true
})
app4.render();
