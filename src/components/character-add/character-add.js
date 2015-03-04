define(['knockout', 'text!./character-add.html'], function(ko, templateMarkup) {

  function CharacterAdd(params) {
    this.message = ko.observable('Hello from the character-add component!');
    var self = this;

    self.languageList = ko.observableArray([]);
    self.advantageList = ko.observableArray([]);
    self.disadvantageList = ko.observableArray([]);
    self.skillList = ko.observableArray([]);
    self.name = ko.observable();
    self.ownerId = ko.observable(params.userId);

    self.currentLanguage = ko.observable({name:'',spoken:'',written:''});

    self.currentAdvantage = ko.observable('');
    self.currentDisadvantage = ko.observable('');
    self.currentSkill = ko.observable('');

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

    self.deleteLanguageFromList = function(language){
      var index = self.languageList.indexOf(language);
      self.languageList.splice(index, 1);
    };

    self.addCurrentAdvantageToList = function(){
      if(self.currentAdvantage !== ''){
        self.advantageList.push(self.currentAdvantage());
        self.currentAdvantage('');
      }
      else
      {
          alert('Fill in a name for the advantage.');
      }
    };

    self.deleteAdvantageFromList = function(advantage){
      var index = self.advantageList.indexOf(advantage);
      self.advantageList.splice(index, 1);
    };

    self.addCurrentDisadvantageToList = function(){
      if(self.currentDisadvantage !== ''){
        self.disadvantageList.push(self.currentDisadvantage());
        self.currentDisadvantage('');
      }
      else
      {
          alert('Fill in a name for the disadvantage.');
      }
    };

    self.deleteDisadvantageFromList = function(disadvantage){
      var index = self.disadvantageList.indexOf(disadvantage);
      self.disadvantageList.splice(index, 1);
    };

    self.addCurrentSkillToList = function(){
      if(self.currentSkill !== ''){
        self.skillList.push(self.currentSkill());
        self.currentSkill('');
      }
      else
      {
          alert('Fill in a name for the skill.');
      }
    };

    self.deleteSkillFromList = function(skill){
      var index = self.skillList.indexOf(skill);
      self.skillList.splice(index, 1);
    };
  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  CharacterAdd.prototype.dispose = function() { };

  return { viewModel: CharacterAdd, template: templateMarkup };

});
