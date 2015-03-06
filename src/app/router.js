define(["knockout", "crossroads", "hasher"], function(ko, crossroads, hasher) {

    // This module configures crossroads.js, a routing library. If you prefer, you
    // can use any other routing library (or none at all) as Knockout is designed to
    // compose cleanly with external libraries.
    //
    // You *don't* have to follow the pattern established here (each route entry
    // specifies a 'page', which is a Knockout component) - there's nothing built into
    // Knockout that requires or even knows about this technique. It's just one of
    // many possible ways of setting up client-side routes.

    return new Router({
        routes: [
            { url: '',          params: { page: 'home-page' } },
            { url: 'about',     params: { page: 'about-page' } },
            { url: 'character',     params: { page: 'character-page' } },
            { url: 'character/{id}', params:{page: 'character-details'}},
            { url: 'character/{id}/edit', params:{page: 'character-edit'}},
            { url: 'addcharacter', params:{page: 'character-add'}},
            {url: 'signup', params: { page: 'sign-up-page' } }
        ]
    });

    function Router(config) {
        var currentRoute = this.currentRoute = ko.observable({});
        var currentUser = this.currentUser = ko.observable('userSetup');
        var isLoggedIn = this.isLoggedIn = ko.observable(false);
        var userId = this.userId = ko.observable('');

        ko.utils.arrayForEach(config.routes, function(route) {
            crossroads.addRoute(route.url, function(requestParams) {
                currentRoute(ko.utils.extend(requestParams, route.params));
            });
        });

        activateCrossroads();
    }

    function activateCrossroads() {
        function parseHash(newHash, oldHash) { crossroads.parse(newHash); }
        crossroads.normalizeFn = crossroads.NORM_AS_OBJECT;
        hasher.initialized.add(parseHash);
        hasher.changed.add(parseHash);
        hasher.init();
    }
});
