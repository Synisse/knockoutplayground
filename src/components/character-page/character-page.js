define(['knockout', 'text!./character-page.html'], function(ko, templateMarkup) {

  function CharacterPage(params) {
    this.message = ko.observable('Hello from the character-page component!');
    console.log('characterviewmodel: ');
    console.log(params);
    // console.log(router.currentUser());
    this.message(params.page);
  }


  var self = this;

  self.username = ko.observable();

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  CharacterPage.prototype.dispose = function() { };

  return { viewModel: CharacterPage, template: templateMarkup };

});
