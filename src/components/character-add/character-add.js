define(['knockout', 'text!./character-add.html'], function(ko, templateMarkup) {

  function CharacterAdd(params) {
    this.message = ko.observable('Hello from the character-add component!');
    var self = this;

    self.st = ko.observable(0);
    self.dx = ko.observable(0);
    self.iq = ko.observable(0);
    self.ht = ko.observable(0);
    self.hp = ko.observable(0);
    self.will = ko.observable(0);
    self.per = ko.observable(0);
    self.fp = ko.observable(0);

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

    var createCharacter = function(){
      var character = {};
      character.languages = [{}];
      character.advantages = [];
      character.name = self.name();
      character.owner = self.ownerId();
      character.st = self.st();
      character.dx = self.dx();
      character.iq = self.iq();
      character.ht = self.ht();
      character.hp = self.hp();
      character.will = self.will();
      character.per = self.per();
      character.fp = self.fp();
      var language = [];
      character.languages = self.languageList();
      character.advantages = self.advantageList();
      character.disadvantages = self.disadvantageList();
      character.skills = self.skillList();
      return character;
    };

    self.publishCharacter = function(){
      var character = createCharacter();
      var jsonChar = JSON.stringify(character);
      console.log('This is jsonified: '+jsonChar);
      if(character.owner !==''){


        $.ajax({
          type: 'POST',
          url: 'http://fathomless-ocean-5983.herokuapp.com/api/characters',
          data: jsonChar,
          // contentType: 'application/json'
          headers: {"Content-Type": "application/json"}
          // dataType: 'json'
        })
        .done(function (data, textstatus, jqXHR) {
           alert('great success');
           console.log(data);
           console.log(textstatus);
           console.log(jqXHR);
        })
        .fail(function (jqXHR, textStatus) {
          alert("error: " + textStatus);
        });




        // $.post("http://fathomless-ocean-5983.herokuapp.com/api/characters", jsonChar)
        //   .done(function() {
        //     alert('success');
        //     // console.log(character);
        // });

        // var request = new XMLHttpRequest();
        // var params = character;
        // request.open('POST', 'http://fathomless-ocean-5983.herokuapp.com/api/characters', true);
        // request.onreadystatechange = function() {if (request.readyState==4) alert("It worked!");};
        // request.setRequestHeader("Content-type", "application/json");
        // request.send(params);

        // console.log(JSON.stringify(character));
      }
      else
      {
        alert('You have to be logged in.');
      }
    };
  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  CharacterAdd.prototype.dispose = function() { };

  return { viewModel: CharacterAdd, template: templateMarkup };

});
