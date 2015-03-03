define(['knockout', 'text!./character-item.html', 'jquery', 'crossroads'], function(ko, templateMarkup, jquery, crossroads) {

  function CharacterItem(params) {
    this.message = ko.observable('Hello from the character-item component!');

    // crossroads.addRoute('character/{id}', function(id){
    //     console.log(id);
    // });

      var self = this;
      self.character = ko.observable();

      self.characterDetailUrl = ko.observable();
      self.characterEditUrl = ko.observable();

      self.routeToDetails = function(){
        window.location.href = window.location.href +'/'+self.character._id;
      };

    self.character = params.character;
    self.characterDetailUrl = '#character?id='+self.character._id;

    console.log('charactername: '+self.character.name+ ' has ID :'+ self.character._id);
  }


  //
  // self.selectedByClick = function(item){
  //   console.log(item.name);
  // };




  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  CharacterItem.prototype.dispose = function() { };

  return { viewModel: CharacterItem, template: templateMarkup };

});
