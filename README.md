# @d2foundry/search

Tools and configs for Foundry's Search

## Goals

1. make it easier to define filter keywords, and also expose it so i can get more people working on it
2. have a neat way to transform/minify the bungie definitions into a space optimized/efficient search db to pipe over to the client
3. have a neat way to map keywords to the search db on the client side. 
   - could pre-process/transform the minimized format into one where all the values resolve to either strings or arrays of strings (a limitation of the current fuzzy search library)