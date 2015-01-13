var t = {};

module.exports = t;

t.getInputSequences = function() {
  var seqBox = document.getElementById('SEQ_BOX');
  var dotbrBox = document.getElementById('DOTBR_BOX');
  var sequence = seqBox.value;
  var dotbr = dotbrBox.value;

  return [sequence, dotbr];
}

t.checkConditions = function(sequences){
  var isFine = true;
  if(sequences[0].length === 0 || sequences[1].length === 0){
    isFine = false;
    document.getElementById('ALERT').value = "Please enter a sequence!";
  }
  else if(sequences[0].length != sequences[1].length){
    isFine = false;
    document.getElementById('ALERT').value = "Sequences must have equal length!";
  }
  else if(! sequences[1].match('^[().]+$')){
    isFine = false;
    document.getElementById('ALERT').value = "Dot-bracket sequence may only contain \"(\", \")\", or \".\"!";
  }
  else if(! sequences[0].match('^[ACGUTRYSWKMBDHVN\-]+$')){
    isFine = false;
    document.getElementById('ALERT').value = "Sequence may only contain IUPAC-characters!";
  }
  return isFine;
}