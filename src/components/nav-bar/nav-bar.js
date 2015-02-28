define(['knockout', 'text!./nav-bar.html', 'jquery'], function(ko, template, jquery) {

  function NavBarViewModel(params) {

    // This viewmodel doesn't do anything except pass through the 'route' parameter to the view.
    // You could remove this viewmodel entirely, and define 'nav-bar' as a template-only component.
    // But in most apps, you'll want some viewmodel logic to determine what navigation options appear.

    var self = this;

    self.username = ko.observable('stefankrueger@devsyn.de');
    self.password = ko.observable('123456');

    self.currentUser = ko.observable(
        {
          name:'default'
        }
      );

    self.isLoggedIn = ko.observable(false);

    this.logout = function(){
      self.isLoggedIn(false);
      self.currentUser(
        {
          name:'default'
        });
        $.removeCookie('token');
    };

    this.route = params.route;

    this.login = function(){
      $.post('http://fathomless-ocean-5983.herokuapp.com/auth/local', {
        email: self.username(),
        password: self.password()
        },
        function(returnedData)
          {
           console.log(returnedData);
           $.cookie('token', returnedData.token);

           $.ajax({
              url: "http://fathomless-ocean-5983.herokuapp.com/api/users/me",
              headers: {"Authorization": "Bearer " + $.cookie('token')}
          })
          .done(function (data) {
            console.log(data);
            alert('hooray');
            self.currentUser(data);
            self.isLoggedIn(true);
            console.log(self.currentUser().name);
          })
          .fail(function (jqXHR, textStatus) {
            alert("error: " + textStatus);
          });
          }
      );
     };
  }

  return { viewModel: NavBarViewModel, template: template };
});
