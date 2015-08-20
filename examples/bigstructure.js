var Rna = require("drawrnajs");

var input = [
    "AAGAAGAGGTAGCGAGTGGACGTGACTGCTCTATCCCGGGCAAAAGGGATAGAACCAGAGGTGGGGAGTCTGGGCAGTCGGCGACCCGCGAAGACTTGAGGTGCCGCAGCGGCATCCGGAGTAGCGCCGGGCTCCCTCCGGGGTGCAGCCGCCGTCGGGGGAAGGGCGCCACAGGCCGGGAAGACCTCCTCCCTTTGTGTCCAGTAGTGGGGTCCACCGGAGGGCGGCCCGTGGGCCGGGCCTCACCGCGGCGCTCCGGGACTGTGGGGTCAGGCTGCGTTGGGTGGACGCCCACCTCGCCAACCTTCGGAGGTCCCTGGGGGTCTTCGTGCGCCCCGGGGCTGCAGAGATCCAGGGGAGGCGCCTGTGAGGCCCGGACCTGCCCCGGGGCGAAGGGTATGTGGCGAGACAGAGCCCTGCACCCCTAATTCCCGGTGGAAAACTCCTGTTGCCGTTTCCCTCCACCGGCCTGGAGTCTCCCAGTCTTGTCCCGGCAGTGCCGCCCTCCCCACTAAGACCTAGGCGCAAAGGCTTGGCTCATGGTTGACAGCTCAGAGAGAGAAAGATCTGAGGGAAGATG",
    "......((((..((...((.(((((((((((((((((........)))))))).(((((.........)))))))))))).)).))..))...))))........(((((....(((((.((.(((((....((((((.(.((((....)))).).))))))..))))).)).(((((.((((((((((((((...(((.((.((.(((((((((.((....)).((((....))))))))))))).)))))))...))))....(((((((((.((.((.((((((....)))))).)))).))).....)))))).)))))))))).)).)))))))))))))........((((((((.((((((...(((...((.(((((((...))..))))).)))))...)))).)))))...)))))..(((((..........((..(.(.(..((((.(((..(((((((...((.((...(((((((.....................)).)))))...)).))..))))).)).(((...........)))..))).)))))).).)))))))...."
];
var app = new Rna({
    el: yourDiv,
    seq: input[0],
    dotbr: input[1],
    layout: "naview",
    seqpanel: true,
    optspanel: true,
    resindex: true
})
app.render();
