[![NPM version](http://img.shields.io/npm/v/drawrnajs.svg)](https://www.npmjs.org/package/drawrnajs)

> Visualizes RNA secondary structures.

DrawrnaJS
==========

To install the module, use: 'npm install drawrnajs'

DrawrnaJS visualises RNA secondary structures in [Dot-bracket notation](http://ultrastudio.org/en/Dot-Bracket_Notation). It is heavily based on [cytoscape.js](http://biojs.io/d/cytoscape). The algorithm used for layout determination is deterministic and will therefore always provide the same visualisation for a specific secondary structure.

####  Features
* Deterministic layout
* Residues can be coloured according to type
* Precise selection and colouring via a lasso tool
* Interactive mode for hydrogen bond adding
* Export structure as PNG

## Use DrawrnaJS

[Full screen demo](http://workmen.biojs.net/demo/drawrnajs/simple)

Please refer to the examples, which show several possible ways of how you could embed DrawrnaJS into your page.

#### Initialisation

```javascript
var Rna = require("drawrnajs");

var app = new Rna({
    el: yourDiv,
    seq: "<your RNA sequence>",
    dotbr: "<your secondary structure>",
    /* ... */
})
app.render();

var defaults = {
    layout: "naview", //the only layout that is currently supported
    seqpanel: true, //determines whether there is going to be a sqeuence panel
    optspanel: true, //determines whethere there is going to be an options panel
    resindex: true //determines whether residue indices are shown
}
```
#### Set sequence and structure

```javascript
app.struct.get("seq") //get RNA sequence
app.struct.get("dotbr") //get structure
app.struct.set("seq", "ACGUACGAUCGUA") //set new sequence
```

#### Get the cytoscape element

```javascript
var cy = app.vis.cy //location of the cytoscape element
```

#### Add new bonds

```javascript
app.struct.get("links").newBond(12, 23) //creates a new bond between residues 12 and 23
```

## Contributing

All contributions are welcome.

## Support

If you have any problem or suggestion please open an issue [here](https://github.com/bene200/drawrnajs/issues).

## License

The MIT License

Copyright (c) 2015, bene200

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
