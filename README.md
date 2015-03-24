[![NPM version](http://img.shields.io/npm/v/drawrnajs.svg)](https://www.npmjs.org/package/drawrnajs) 

> Visualizes RNA secondary structures.

## Documentation
To install the module, use: 'npm install drawrnajs'

To use the module, first include drawrnajs.js in your HTML file.
Now you can use it in your javascript with

```javascript
var drawrnajs = require('drawrnajs');
```

In order to visualize your RNA secondary structure you first have to convert your sequence and corresponding dot-bracket notation to a JSON format which specifies nodes and edges of the structure. 

```javascript
var structure = rna.t.transformDotBracket(yourSequence, yourDotBracket);
```

Drawrnajs uses [cytoscape](http://biojs.io/d/cytoscape) to draw the structure. For that reason you need to add a cytoscape element to the div of your choice in your HTML file.
The cytoscape element should have the following style specifications:

```css
#cy {
    height: 100%;
    width: 100%;
    position: absolute;
}
```
For more details about cytoscape please refer to the cytoscape documentation.

Now you can visualize your RNA secondary structure inside your cytoscape element like this:

```javascript
var cy = document.getElementById('cy');
rna.vis({graph: structure: el: cy});
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
