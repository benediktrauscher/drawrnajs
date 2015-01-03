var t = {};

module.exports = t;

t.getInputSequences = function() {
  var seqBox = document.getElementById('SEQ_BOX');
  var dotbrBox = document.getElementById('DOTBR_BOX');
  var sequence = seqBox.value;
  var dotbr = dotbrBox.value;

  return [sequence, dotbr];
}
/*
t.main = function() {
 
}
$( document ).ready(main);
$( document ).ready(main);

*/