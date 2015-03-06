define(['jquery', 'knockout', './router', 'bootstrap', 'knockout-projections'], function($, ko, router) {

  // Components can be packaged as AMD modules, such as the following:
  ko.components.register('nav-bar', { require: 'components/nav-bar/nav-bar' });
  ko.components.register('home-page', { require: 'components/home-page/home' });

  // ... or for template-only components, you can just point to a .html file directly:
  ko.components.register('about-page', {
    template: { require: 'text!components/about-page/about.html' }
  });

  ko.components.register('character-page', { require: 'components/character-page/character-page' });

  ko.components.register('character-item', { require: 'components/character-item/character-item' });

  ko.components.register('character-details', { require: 'components/character-details/character-details' });

  ko.components.register('character-edit', { require: 'components/character-edit/character-edit' });

  ko.components.register('character-add', { require: 'components/character-add/character-add' });

  ko.components.register('sign-up-page', { require: 'components/sign-up-page/sign-up-page' });

  // [Scaffolded component registrations will be inserted here. To retain this feature, don't remove this comment.]

  // Start the application
  ko.applyBindings({ route: router.currentRoute, isLoggedIn: router.isLoggedIn, userId: router.userId });
});
