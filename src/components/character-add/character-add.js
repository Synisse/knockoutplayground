define(['knockout', 'text!./character-add.html'], function(ko, templateMarkup) {

  function CharacterAdd(params) {
    this.message = ko.observable('Hello from the character-add component!');
    var self = this;

    self.languageList = ko.observableArray([]);
    self.advantageList = ko.observableArray([]);
    self.disadvantageList = ko.observableArray([]);
    self.name = ko.observable();
    self.ownerId = ko.observable(params.userId);
    // self.test = ko.observable($root.userId);

    self.currentLanguage = ko.observable({name:'',spoken:'',written:''});

    self.testclick = function(){
      console.log(self.currentLanguage());
    };

    self.addCurrentLanguageToList = function(){
      if(self.currentLanguage().name !== '')
      {
        self.languageList.push(self.currentLanguage());
        self.currentLanguage({name:'',spoken:'',written:''});
      }
      else
      {
        alert('Fill in all the required fields!');
      }
    };
  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  CharacterAdd.prototype.dispose = function() { };

  return { viewModel: CharacterAdd, template: templateMarkup };

});
