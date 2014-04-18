
var definitionGenerator = {


  requestDefinition: function() {
    chrome.tabs.executeScript({code: "window.getSelection().toString();"},function(selectedText){
      alert(selectedText);
      var query = selectedText[0];
      var searchInDictionary_ = 'http://www.dictionaryapi.com/api/v1/references/thesaurus/xml/' +
                        encodeURIComponent(query) + '?key=2d8fe204-c216-41b7-8c18-e16b699c0641'
      console.log(query)
      var req = new XMLHttpRequest();
      req.open("GET", searchInDictionary_, true);
      req.onload = this.logConsole_;
      req.send(null);
    }.bind(this));
  },

  logConsole_: function(e) {
    var resp = e.target.response;
    xmlDef = $.parseXML( resp ),
    $xml = $( xmlDef ),
    $def = $xml.find( "entry sens mc" );
    $word = $xml.find( "entry hw" )
    var def = document.createElement('p');
    var wordName = document.createElement('h3');
    def.innerHTML = $def[0].innerHTML;
    wordName.innerHTML = $word[0].innerHTML;
    document.body.appendChild(wordName);
    document.body.appendChild(def);
  }

};

document.addEventListener('DOMContentLoaded', function () {
  definitionGenerator.requestDefinition();
});
