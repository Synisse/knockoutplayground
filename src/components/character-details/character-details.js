define(['knockout', 'text!./character-details.html'], function(ko, templateMarkup) {

  function CharacterDetails(params) {
    this.message = ko.observable('Hello from the character-details component!');
    var self = this;

    self.characterId = ko.observable(params.route.id);

    self.character = ko.observable('');

    //Get character item from backend
    $.ajax({
       url: 'http://fathomless-ocean-5983.herokuapp.com/api/characters/'+params.route.id
    })
    .done(function (data) {
       self.character(data);
       console.log(self.character());
    })
    .fail(function (jqXHR, textStatus) {
      alert("error: " + textStatus);
    });


    // console.log(params.route.id);
  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  CharacterDetails.prototype.dispose = function() { };

  return { viewModel: CharacterDetails, template: templateMarkup };

});
