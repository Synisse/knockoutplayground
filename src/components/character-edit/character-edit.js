define(['knockout', 'text!./character-edit.html'], function(ko, templateMarkup) {

  function CharacterEdit(params) {
    this.message = ko.observable('Hello from the character-edit component!');
  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  CharacterEdit.prototype.dispose = function() { };

  return { viewModel: CharacterEdit, template: templateMarkup };

});
