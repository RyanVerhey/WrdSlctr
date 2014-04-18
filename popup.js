
var definitionGenerator = {
  query: '',

  requestDefinition: function() {
    chrome.tabs.executeScript({code: "window.getSelection().toString();"},function(selectedText){
      definitionGenerator.query = selectedText[0];
      var searchInDictionary_ = 'http://www.dictionaryapi.com/api/v1/references/thesaurus/xml/' +
                        encodeURIComponent(this.query) + '?key=2d8fe204-c216-41b7-8c18-e16b699c0641'

      var req = new XMLHttpRequest();
      req.open("GET", searchInDictionary_, true);
      req.onload = this.logConsole_;
      req.send(null);
    }.bind(this));
  },

  logConsole_: function(e) {
    var resp = e.target.response;
    xmlDef = $.parseXML( resp );
    $xml = $( xmlDef ),
    $def = $xml.find( "entry sens mc" );
    $word = $xml.find( "entry hw" )
    // console.log($xml.children("entry_list").length < 1);
    if (resp.indexOf('suggestion') !== -1) {
      console.log("suggestion");
      $sug = $xml.find('suggestion');
      $("body").append('<p>Word not found. Did you mean...</p>');
      $sug.each(function(i, el) {
        $('body').append('<a target="_blank" href="http://www.merriam-webster.com/dictionary/' + el.innerHTML + '">'+el.innerHTML+'</a><br>')
      })
      $("body").append('<a target="_blank" href="http://www.merriam-webster.com/dictionary/' + definitionGenerator.query + '">Search on Merriam-Webster</a>');
    } else if($xml.find("entry").length == 0) {
      console.log("nothing");
      $("body").append('<p>Word not found</p>');
      $("body").append('<a target="_blank" href="http://www.merriam-webster.com/dictionary/' + definitionGenerator.query + '">Search on Merriam-Webster</a>');
    } else if(definitionGenerator.query === '')
      $("body").append('<p style="color:red;">No word selected</p>');
    } else {
      // console.log($word.toString())
      var def = document.createElement('p');
      var wordName = document.createElement('h3');
      def.innerHTML = $def[0].innerHTML;
      wordName.innerHTML = $word[0].innerHTML;
      document.body.appendChild(wordName);
      document.body.appendChild(def);
      $("body").append('<a target="_blank" href="http://www.merriam-webster.com/dictionary/' + $word[0].innerHTML + '">Search on Merriam-Webster</a>')
    };
  }

};

document.addEventListener('DOMContentLoaded', function () {
  definitionGenerator.requestDefinition();
});

// replaceInTags = function() {
//   var tags = ['h1', 'h2', 'h3', 'p', 'a', 'span'];
//   $.each(tags, function(i, tag) {
//     $(tag).each( function(index, Element){
//       $(this).text("");
//     });
//   });
// }
