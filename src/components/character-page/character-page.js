define(['knockout', 'text!./character-page.html'], function(ko, templateMarkup) {

  function CharacterPage(params) {
    getAllCharacters();
  }

  this.getAllCharacters = function(){
    $.ajax({
       url: "http://fathomless-ocean-5983.herokuapp.com/api/characters/"
    })
    .done(function (data) {
       self.characterList(data);
       console.log(self.characterList());
    })
    .fail(function (jqXHR, textStatus) {
      alert("error: " + textStatus);
    });
  };

  var self = this;


  self.characterList = ko.observableArray([]);

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  CharacterPage.prototype.dispose = function() { };

  return { viewModel: CharacterPage, template: templateMarkup };

});
