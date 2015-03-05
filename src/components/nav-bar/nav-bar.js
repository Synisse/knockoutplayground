define(['knockout', 'text!./nav-bar.html', 'jquery','jquerycookie','../../app/router'], function(ko, template, jquery, jquerycookie, router) {

  function NavBarViewModel(params) {

    // This viewmodel doesn't do anything except pass through the 'route' parameter to the view.
    // You could remove this viewmodel entirely, and define 'nav-bar' as a template-only component.
    // But in most apps, you'll want some viewmodel logic to determine what navigation options appear.

    var self = this;

    //TODO remove dummy values
    self.username = ko.observable('stefankrueger@devsyn.de');
    self.password = ko.observable('123456');

    self.currentUser = ko.observable(
        {
          name:'default'
        }
      );

    self.isLoggedIn = ko.observable(false);

    //check if user is already logged in
    $.ajax({
       url: "http://fathomless-ocean-5983.herokuapp.com/api/users/me",
       //Set auth header
       headers: {"Authorization": "Bearer " + $.cookie('token')}
    })
    .done(function (data) {
     //On success set logging in to false (finishing loading animation)
     self.isLoggingIn(false);
     //Set logged in to true, to change GUI components etc
     self.isLoggedIn(true);
     //On success safe userdata in view model variable
     self.currentUser(data);
     //Set isLoggedIn in "rootscope" (TODO cleanup this mess)
     router.isLoggedIn(self.isLoggedIn());
     router.userId(self.currentUser()._id);

    })
    .fail(function (jqXHR, textStatus) {
     //Failed to retrieve user information with given token
    //  alert("error: " + textStatus);
      self.isLoggedIn(false);
    });




    self.isLoggingIn = ko.observable(false);

    this.logout = function(){
      self.isLoggedIn(false);
      //Set isLoggedIn in "rootscope" (TODO cleanup this mess)
      router.isLoggedIn(self.isLoggedIn());
      router.userId('');
      self.currentUser(
        {
          name:'default'
        });
        $.removeCookie('token');
    };

    this.route = params.route;

    //Function to login a user with the given credentials of the Login tab of the nav bar
    this.login = function(){

      //Set to true, to start loading spinner
      self.isLoggingIn(true);

      $.post('http://fathomless-ocean-5983.herokuapp.com/auth/local', {
        email: self.username(),
        password: self.password()
        },
        function(returnedData)
          {
            //Set cookie for login token
           $.cookie('token', returnedData.token);
           //Request user from backend
           $.ajax({
              url: "http://fathomless-ocean-5983.herokuapp.com/api/users/me",
              //Set auth header
              headers: {"Authorization": "Bearer " + $.cookie('token')}
          })
          .done(function (data) {
            //On success set logging in to false (finishing loading animation)
            self.isLoggingIn(false);
            //Set logged in to true, to change GUI components etc
            self.isLoggedIn(true);
            //On success safe userdata in view model variable
            self.currentUser(data);
            //Set isLoggedIn in "rootscope" (TODO cleanup this mess)
            router.isLoggedIn(self.isLoggedIn());
            router.userId(self.currentUser()._id);

          })
          .fail(function (jqXHR, textStatus) {
            //Failed to retrieve user information with given token
            alert("error: " + textStatus);
          });
          }
      );
     };
  }

  return { viewModel: NavBarViewModel, template: template };
});
