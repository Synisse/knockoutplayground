define(['knockout', 'text!./nav-bar.html', 'jquery'], function(ko, template, jquery) {

  function NavBarViewModel(params) {

    // This viewmodel doesn't do anything except pass through the 'route' parameter to the view.
    // You could remove this viewmodel entirely, and define 'nav-bar' as a template-only component.
    // But in most apps, you'll want some viewmodel logic to determine what navigation options appear.

    this.route = params.route;

    this.login = function(){
      $.post('http://fathomless-ocean-5983.herokuapp.com/auth/local', {
        email: 'stefankrueger@devsyn.de',
        password: '123456'
        },
        function(returnedData)
          {
           console.log(returnedData);
         }
      );
     };
  }

  return { viewModel: NavBarViewModel, template: template };
});
