#!/bin/bash
rm notebook-*.js
curl https://api.observablehq.com/d/a9f353b5513cc8d3.js > notebook.js
python3 version_notebook.py
