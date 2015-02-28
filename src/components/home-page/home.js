define(["knockout", "text!./home.html", "jquery", "jquerycookie"], function(ko, homeTemplate, jquery, jquerycookie) {

  function HomeViewModel(route) {
    this.message = ko.observable('Welcome to gcsc!');
  }

  HomeViewModel.prototype.doSomething = function() {
    this.message('You invoked doSomething() on the viewmodel.');
  };

  // function make_base_auth(user, password) {
  //     var tok = user + ':' + password;
  //     var hash = btoa(tok);
  //     return 'Basic ' + hash;
  // }

  this.username = 'no one';

  this.login = function(){
    $.post('http://fathomless-ocean-5983.herokuapp.com/auth/local', {
      email: 'stefankrueger@devsyn.de',
      password: '123456'
      },
      function(returnedData)
        {
         console.log(returnedData);
         $.cookie('token', '%22'+returnedData.token);
        }
    );
   };

   this.logout = function(){
     $.removeCookie('token');
   };

   this.isLoggedIn = function(){
     $.get('http://fathomless-ocean-5983.herokuapp.com/api/users/me',
       function(returnedData)
         {
          console.log(returnedData);
        }
     );
    };

  return { viewModel: HomeViewModel, template: homeTemplate };

});
