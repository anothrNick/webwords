
//var stringie = "How the Word Cloud Generator Works The layout algorithm for positioning words without overlap is available on GitHub under an open source license as d3-cloud. Note that this is the only the layout algorithm and any code for converting text into words and rendering the final output requires additional development. As word placement can be quite slow for more than a few hundred words, the layout algorithm can be run asynchronously, with a configurable time step size. This makes it possible to animate words as they are placed without stuttering. It is recommended to always use a time step even without animations as it prevents the browser’s event loop from blocking while placing the words. The layout algorithm itself is incredibly simple. For each word, starting with the most important: Attempt to place the word at some starting point: usually near the middle, or somewhere on a central horizontal line. If the word intersects with any previously placed words, move it one step along an increasing spiral. Repeat until no intersections are found. The hard part is making it perform efficiently! According to Jonathan Feinberg, Wordle uses a combination of hierarchical bounding boxes and quadtrees to achieve reasonable speeds. Glyphs in JavaScript There isn’t a way to retrieve precise glyph shapes via the DOM, except perhaps for SVG fonts. Instead, we draw each word to a hidden canvas element, and retrieve the pixel data.";

chrome.storage.local.get(function(data){
  console.log(data);
  initMap(data.words);
});

function initMap(stringy) {
  var whatever = frequency(stringy);
  var frequency_list = [];

  for(var key in whatever) {
    frequency_list.push({
      text: key,
      size: (4+whatever[key]) + (.1*whatever[key]) * 30
    })
  }

  var fill = d3.scale.category20();

  var layout = d3.layout.cloud()
      .size([400, 200])
      .words(frequency_list)
      .padding(1)
      .font("Impact")
      .fontSize(function(d) { return d.size; })
      .on("end", draw);

  layout.start();

  function draw(words) {
    d3.select("body").append("svg")
        .attr("width", layout.size()[0])
        .attr("height", layout.size()[1])
      .append("g")
        .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
      .selectAll("text")
        .data(words)
      .enter().append("text")
        .style("font-size", function(d) { return d.size + "px"; })
        .style("font-family", "Impact")
        .style("fill", function(d, i) { return fill(i); })
        .attr("text-anchor", "middle")
        .attr("transform", function(d) {
          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function(d) { return d.text; });
  }
}

function frequency(string) {
      /* Below is a regular expression that finds alphanumeric characters
       Next is a string that could easily be replaced with a reference to a form control
       Lastly, we have an array that will hold any words matching our pattern */
    var pattern = /\w+/g,
        matchedWords = string.match( pattern );

    /* The Array.prototype.reduce method assists us in producing a single value from an
       array. In this case, we're going to use it to output an object with results. */
    var counts = matchedWords.reduce(function ( stats, word ) {

        /* `stats` is the object that we'll be building up over time.
           `word` is each individual entry in the `matchedWords` array */
        if ( stats.hasOwnProperty( word ) ) {
            /* `stats` already has an entry for the current `word`.
               As a result, let's increment the count for that `word`. */
            stats[ word ] = stats[ word ] + 1;
        } else {
            /* `stats` does not yet have an entry for the current `word`.
               As a result, let's add a new entry, and set count to 1. */
            stats[ word ] = 1;
        }

        /* Because we are building up `stats` over numerous iterations,
           we need to return it for the next pass to modify it. */
        return stats;

    }, {} );

    /* Now that `counts` has our object, we can log it. */
    return counts;
}