define(['knockout', 'text!./sign-up-page.html'], function(ko, templateMarkup) {

  function SignUpPage(params) {
    this.message = ko.observable('Hello from the sign-up-page component!');
  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  SignUpPage.prototype.dispose = function() { };
  
  return { viewModel: SignUpPage, template: templateMarkup };

});
