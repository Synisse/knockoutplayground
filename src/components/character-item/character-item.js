define(['knockout', 'text!./character-item.html'], function(ko, templateMarkup) {

  function CharacterItem(params) {
    this.message = ko.observable('Hello from the character-item component!');
    self.character = params.character;
    console.log(params);
  }

  var self = this;
  self.charactername = ko.observable('test');
  self.character = ko.observable();


  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  CharacterItem.prototype.dispose = function() { };

  return { viewModel: CharacterItem, template: templateMarkup };

});
