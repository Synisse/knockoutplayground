define(['knockout', 'text!./character-details.html'], function(ko, templateMarkup) {

  function CharacterDetails(params) {
    this.message = ko.observable('Hello from the character-details component!');
    var self = this;

    self.characterId = ko.observable(params.route.id);

    self.character = ko.observable('');

    //Get character item from backend
    self.getChar = function(){
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

    };
    self.getChar();

    self.lift = ko.computed(function(){
      var strength = parseInt(self.character().st);
      return (strength * strength)/10;
    });

    self.speed = ko.computed(function(){
      var dex = parseInt(self.character().dx);
      var ht = parseInt(self.character().ht);
      return (dex+ht)/4;
    });

    self.move = ko.computed(function(){
      return parseInt(self.speed(),10);
    });

    /////////////////////////
    //Encumberance values
    /////////////////////////
    self.encumberanceNone = ko.computed(function(){
      return self.lift()*1;
    });

    self.encumberanceLight = ko.computed(function(){
      return self.lift()*2;
    });

    self.encumberanceMedium = ko.computed(function(){
      return self.lift()*3;
    });

    self.encumberanceHeavy = ko.computed(function(){
      return self.lift()*6;
    });

    self.encumberanceXheavy = ko.computed(function(){
      return self.lift()*10;
    });

    /////////////////////////
    //Move values
    /////////////////////////
    self.moveOne = ko.computed(function(){
      return (self.move()*1).toFixed(2);
    });

    self.moveTwo = ko.computed(function(){
      return (self.move()*0.8).toFixed(2);
    });

    self.moveThree = ko.computed(function(){
      return (self.move()*0.6).toFixed(2);
    });

    self.moveFour = ko.computed(function(){
      return (self.move()*0.4).toFixed(2);
    });

    self.moveFive = ko.computed(function(){
      return (self.move()*0.2).toFixed(2);
    });

    /////////////////////////
    //Dodge values
    /////////////////////////
    self.dodgeOne = ko.computed(function(){
      return (self.move()+3)-0;
    });

    self.dodgeTwo = ko.computed(function(){
      return (self.move()+3)-1;
    });

    self.dodgeThree = ko.computed(function(){
      return (self.move()+3)-2;
    });

    self.dodgeFour = ko.computed(function(){
      return (self.move()+3)-3;
    });

    self.dodgeFive = ko.computed(function(){
      return (self.move()+3)-4;
    });

  }



  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  CharacterDetails.prototype.dispose = function() { };

  return { viewModel: CharacterDetails, template: templateMarkup };

});
