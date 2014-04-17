var QUERY = 'gum';

var definitionGenerator = {

  searchInDictionary_: 'http://www.dictionaryapi.com/api/v1/references/thesaurus/xml/' +
                        encodeURIComponent(QUERY) + '?key=2d8fe204-c216-41b7-8c18-e16b699c0641',


  // requestDefinition: function() {$.get(this.searchInDictionary_, function(resp) {
  //   console.log(resp);
  //   });
  // }

  requestDefinition: function() {
    var req = new XMLHttpRequest();
    req.open("GET", this.searchInDictionary_, true);
    req.onload = this.logConsole_;
    req.send(null);
  },

  logConsole_: function(e) {
    var resp = e.target.response;
    xmlDef = $.parseXML( resp ),
    $xml = $( xmlDef ),
    $def = $xml.find( "entry sens mc" );
    // console.log($def[0].innerHTML);
    var def = document.createElement('p');
    def.innerHTML = $def[0].innerHTML;
    document.body.appendChild(def)
  }

};



// Run our kitten generation script as soon as the document's DOM is ready.
document.addEventListener('DOMContentLoaded', function () {
  definitionGenerator.requestDefinition();
});
