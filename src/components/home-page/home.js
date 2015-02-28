define(["knockout", "text!./home.html", "jquery", "jquerycookie"], function(ko, homeTemplate, jquery, jquerycookie) {

  function HomeViewModel(route) {
    this.message = ko.observable('Welcome to gcsc!');
  }

  HomeViewModel.prototype.doSomething = function() {
    this.message('You invoked doSomething() on the viewmodel.');
  };

  var self = this;
  // function make_base_auth(user, password) {
  //     var tok = user + ':' + password;
  //     var hash = btoa(tok);
  //     return 'Basic ' + hash;
  // }

  self.username = ko.observable("no one");

  this.login = function(){
    $.post('http://fathomless-ocean-5983.herokuapp.com/auth/local', {
      email: 'stefankrueger@devsyn.de',
      password: '123456'
      },
      function(returnedData)
        {
         console.log(returnedData);
         $.cookie('token', returnedData.token);
        }
    );
   };

   this.logout = function(){
     $.removeCookie('token');
   };

   this.isLoggedIn = function(){
     var tokenString = 'Bearer ' + $.cookie('token');

    //  $.get('http://fathomless-ocean-5983.herokuapp.com/api/users/me',
    //    function(returnedData)
    //      {
    //       console.log(returnedData);
    //     }
    //  );

     $.ajax({
        url: "http://fathomless-ocean-5983.herokuapp.com/api/users/me",
        headers: {"Authorization": "Bearer " + $.cookie('token')}
    })
    .done(function (data) {
      console.log(data);
      self.username(data.name);
    })
    .fail(function (jqXHR, textStatus) {
      alert("error: " + textStatus);
    });


    };

  return { viewModel: HomeViewModel, template: homeTemplate };

});
