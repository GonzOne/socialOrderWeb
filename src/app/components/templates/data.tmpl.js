
(function() {
    'use strict';

    angular
        .module('socialOrderWeb')
        .service('dataTemplates', dataTemplates);

    /** @ngInject */
    function dataTemplates() {

        var waitStaffTmpl = {
            uid: '',
            firstName: '',
            lastName: '',
            email: '',
            profilePicUrl :'',
            venues: '',
            channel_id: '',
            profile_id: ''
        };
        var patronsTmpl = {
            uid: '',
            firstName: '',
            lastName: '',
            email: '',
            dateOfBirth: '',
            sex: '',
            profilePicUrl :'',
            terms: false,
            venues:'',
            favorites:''
        };
        var adminTmpl = {
            uid: '',
            firstName: '',
            lastName: '',
            email: '',
            profilePicUrl :''
        };
        var venueAdminTmpl = {
            uid: '',
            firstName: '',
            lastName: '',
            email: '',
            profilePicUrl :'',
            venue_ids: []
        }
        var profileMetaTmpl = {
            uid: '',
            role: '',
            venue_id:''
        }
        var venueMenuTmpl = {
            venueName: '',
            venue_id: '',
            menu_id: '',
            menu: '',
            lastUpdate: ''
        }
        var menuTmpl = {
            bottleBeer: {
                displayName: 'Bottle Beer',
                itemId: 'bottleBeer',
                items: '',
                menu_id: ''
            },
            canBeer: {
                displayName: 'Bottle Beer',
                itemId: 'bottleBeer',
                items: '',
                menu_id: ''
            },
            draftBeer: {
                displayName: 'Draft Beer',
                itemId: 'draftBeer',
                items: '',
                menu_id: ''
            },
            champagne: {
                displayName: 'Champagne',
                itemId: 'champagne',
                items: '',
                menu_id: ''
            },
            sparklingWine: {
                displayName: 'Sparkling Wine',
                itemId: 'sparklingWine',
                items: '',
                menu_id: ''
            },
            whiteWine: {
                displayName: 'White Wine',
                itemId: 'whiteWine',
                items: '',
                menu_id: ''
            },
            redWine: {
                displayName: 'Red Wine',
                itemId: 'redWine',
                items: '',
                menu_id: ''
            },
            wineOnTap: {
                displayName: 'Wine On Tap',
                itemId: 'wineOnTap',
                items: '',
                menu_id: ''
            },
            cocktails: {
                displayName: 'Cocktails',
                itemId: 'cocktails',
                items: '',
                menu_id: ''
            },
            spirits: {
                displayName: 'Spirits',
                itemId: 'spirits',
                items: '',
                menu_id: ''
            },
            recommended: {
                displayName: 'Recommended',
                itemId: 'recommended',
                items: '',
                menu_id: ''
            }


        }
        var cocktailTmpl = {
            v_id:'',
            name: '',
            desc: '',
            cost: '',
            type:'',
            count: 0,
            display:true

        }
        var wineTmpl = {
            v_id:'',
            name: '',
            desc:'',
            display: true,
            varietal: '',
            region:'',
            country:'',
            year:'',
            glass_cost:'',
            bottle_cost:'',
            count: 0,
            type:''
        }
        var beerTmpl = {
            v_id:'',
            name: '',
            cost:'',
            desc: '',
            type:'',
            count: 0,
            comment:'',
            varietal: '',
            display: true
        }
        var venue_data =  {
            name: '',//venues name eg. Brass Tax
            type: 0,// 0 = bar, 1 = pub, 2 = cafe
            desc: '',//venue desc
            address: '',//venue physical address
            city: '',
            state: '',
            zipcode: '',
            venue_phone: '',
            contact_phone:'',
            contact_email:'',
            photo_url: '',
            lat: '',
            lng: '',
            placeId: '',//google place id
            active: 0,//0 = offline, 1 == online
            staff : [],
            admin: [],
            website_url:'',
            facebook_url: '',
            channel_id: ''
        };
        var venue_hours = {
            mon:'',
            tue: '',
            wed:'',
            thu:'',
            fri:'',
            sat:'',
            sun:'',
            hhr:''

        };
        var beerVarietals = [
            {display: 'American Amber / Red Ale', style: 'American Ale', id: 0},
            {display: 'American Barleywine', style: 'American Ale', id: 1},
            {display: 'American Black Ale', style: 'American Ale', id: 2},
            {display: 'American Blonde Ale', style: 'American Ale', id: 3},
            {display: 'American Brown Ale', style: 'American Ale', id: 4},
            {display: 'American Dark Wheat Ale', style: 'American Ale', id: 5},
            {display: 'American Double / Imperial IPA', style: 'American Ale', id: 6},
            {display: 'American Double / Imperial Stout', style: 'American Ale', id: 7},
            {display: 'American IPA', style: 'American Ale', id: 8},
            {display: 'American Pale Ale (APA)', style: 'American Ale', id: 9},
            {display: 'American Pale Wheat Ale', style: 'American Ale', id: 10},
            {display: 'American Porter', style: 'American Ale', id: 11},
            {display: 'American Stout', style: 'American Ale', id: 12},
            {display: 'American Strong Ale', style: 'American Ale', id: 13},
            {display: 'American Wild Ale', style: 'American Ale', id: 14},
            {display: 'Black & Tan', style: 'American Ale', id: 15},
            {display: 'Chile Beer', style: 'American Ale', id: 16},
            {display: 'Cream Ale', style: 'American Ale', id: 17},
            {display: 'Pumpkin Ale', style: 'American Ale', id: 18},
            {display: 'Rye Beer', style: 'American Ale', id: 19},
            {display: 'Wheatwine', style: 'American Ale', id: 20},
            {display: 'Belgian Dark Ale', style: 'Belgian / French Ales', id: 21},
            {display: 'Belgian IPA', style: 'Belgian / French Ales', id: 22},
            {display: 'Belgian Pale Ale', style: 'Belgian / French Ales', id: 23},
            {display: 'Belgian Strong Dark Ale', style: 'Belgian / French Ales', id: 24},
            {display: 'Belgian Strong Pale Ale', style: 'Belgian / French Ales', id: 25},
            {display: 'Bière de Champagne / Bière Brut', style: 'Belgian / French Ales', id: 26},
            {display: 'Bière de Garde', style: 'Belgian / French Ales', id: 27},
            {display: 'Dubbel', style: 'Belgian / French Ales', id: 28},
            {display: 'Faro', style: 'Belgian / French Ales', id: 29},
            {display: 'Flanders Oud Bruin', style: 'Belgian / French Ales', id: 30},
            {display: 'Flanders Red Ale', style: 'Belgian / French Ales', id: 31},
            {display: 'Gueuze', style: 'Belgian / French Ales', id: 32},
            {display: 'Lambic - Fruit', style: 'Belgian / French Ales', id: 33},
            {display: 'Lambic - Unblended', style: 'Belgian / French Ales', id: 34},
            {display: 'Quadrupel (Quad)', style: 'Belgian / French Ales', id: 35},
            {display: 'Saison / Farmhouse Ale', style: 'Belgian / French Ales', id: 36},
            {display: 'Tripel', style: 'Belgian / French Ales', id: 37},
            {display: 'Witbier', style: 'Belgian / French Ales', id: 38},
            {display: 'Baltic Porter', style: 'English Ales', id: 39},
            {display: 'Braggot', style: 'English Ales', id: 40},
            {display: 'English Barleywine', style: 'English Ales', id: 41},
            {display: 'English Bitter', style: 'English Ales', id: 42},
            {display: 'English Brown Ale', style: 'English Ales', id: 43},
            {display: 'English Dark Mild Ale', style: 'English Ales', id: 44},
            {display: 'English India Pale Ale (IPA)', style: 'English Ales', id: 45},
            {display: 'English Pale Ale', style: 'English Ales', id: 46},
            {display: 'English Pale Mild Ale', style: 'English Ales', id: 47},
            {display: 'English Porter', style: 'English Ales', id: 48},
            {display: 'English Stout', style: 'English Ales', id: 49},
            {display: 'English Strong Ale', style: 'English Ales', id: 50},
            {display: 'Extra Special / Strong Bitter (ESB)', style: 'English Ales', id: 51},
            {display: 'Foreign / Export Stout', style: 'English Ales', id: 52},
            {display: 'Milk / Sweet Stout', style: 'English Ales', id: 53},
            {display: 'Oatmeal Stout', style: 'English Ales', id: 54},
            {display: 'Old Ale', style: 'English Ales', id: 55},
            {display: 'Russian Imperial Stout', style: 'English Ales', id: 56},
            {display: 'Winter Warmer', style: 'English Ales', id: 57},
            {display: 'Sahti', style: 'Finnish Ales', id: 58},
            {display: 'Altbier', style: 'German Ales', id: 59},
            {display: 'Berliner Weissbier', style: 'German Ales', id: 60},
            {display: 'Dunkelweizen', style: 'German Ales', id: 61},
            {display: 'Gose', style: 'German Ales', id: 62},
            {display: 'Hefeweizen', style: 'German Ales', id: 63},
            {display: 'Kölsch', style: 'German Ales', id: 64},
            {display: 'Kristalweizen', style: 'German Ales', id: 65},
            {display: 'Roggenbier', style: 'German Ales', id: 66},
            {display: 'Weizenbock', style: 'German Ales', id: 67},
            {display: 'Irish Dry Stout', style: 'Irish Ales', id: 68},
            {display: 'Irish Red Ale', style: 'Irish Ales', id: 69},
            {display: 'Kvass', style: 'Russian Ales', id: 70},
            {display: 'Scotch Ale / Wee Heavy', style: 'Scottish Ales', id: 71},
            {display: 'Scottish Ale', style: 'Scottish Ales', id: 72},
            {display: 'Scottish Gruit / Ancient Herbed Ale', style: 'Scottish Ales', id: 73},
            {display: 'American Adjunct Lager', style: 'American Lagers', id: 74},
            {display: 'American Amber / Red Lager', style: 'American Lagers', id: 75},
            {display: 'American Double / Imperial Pilsner', style: 'American Lagers', id: 76},
            {display: 'American Malt Liquor', style: 'American Lagers', id: 77},
            {display: 'American Pale Lager', style: 'American Lagers', id: 78},
            {display: 'California Common / Steam Beer', style: 'American Lagers', id: 79},
            {display: 'Light Lager', style: 'American Lagers', id: 80},
            {display: 'Low Alcohol Beer', style: 'American Lagers', id: 81},
            {display: 'Czech Pilsener', style: 'Czech Lagers', id: 82},
            {display: 'Euro Dark Lager', style: 'European Lagers', id: 83},
            {display: 'Euro Pale Lager', style: 'European Lagers', id: 84},
            {display: 'Euro Strong Lager', style: 'European Lagers', id: 85},
            {display: 'Bock ', style: 'German Lagers', id: 86},
            {display: 'Doppelbock', style: 'German Lagers', id: 87},
            {display: 'Dortmunder / Export Lager', style: 'German Lagers', id: 88},
            {display: 'Eisbock', style: 'German Lagers', id: 89},
            {display: 'German Pilsener', style: 'German Lagers', id: 90},
            {display: 'Kellerbier / Zwickelbier', style: 'German Lagers', id: 91},
            {display: 'Maibock / Helles Bock', style: 'German Lagers', id: 92},
            {display: 'Märzen / Oktoberfest', style: 'German Lagers', id: 93},
            {display: 'Munich Dunkel Lager', style: 'German Lagers', id: 94},
            {display: 'Munich Helles Lager', style: 'German Lagers', id: 95},
            {display: 'Rauchbier', style: 'German Lagers', id: 96},
            {display: 'Schwarzbier', style: 'German Lagers', id: 97},
            {display: 'Vienna Lager', style: 'German Lagers', id: 98},
            {display: 'Happoshu', style: 'Japanese Lagers', id: 99},
            {display: 'Japanese Rice Lager', style: 'Japanese Lagers', id: 100}
        ]


        return {
            getMetaTmpl: function () { return profileMetaTmpl; },
            getAdminTmpl: function () { return adminTmpl; },
            getPatronsTmpl: function () { return patronsTmpl; },
            getStaffTmpl: function () { return waitStaffTmpl; },
            getVenueAdminTmpl: function () { return venueAdminTmpl;},
            getVenueMenuTmpl: function () { return venueMenuTmpl;},
            getMenuTmpl: function () {return menuTmpl;},
            getBeerTmpl: function () { return beerTmpl;},
            getWineTmpl: function () { return wineTmpl;},
            getCocktailTmpl: function () { return cocktailTmpl;},
            getVenueTmpl: function () { return venue_data;},
            getVenueHoursTmpl: function () { return venue_hours; },
            getBeerVarietals: function () { return beerVarietals;}
        }
    }

})();