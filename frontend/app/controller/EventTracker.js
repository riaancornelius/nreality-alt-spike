Ext.define('MyApp.controller.EventTracker', {
    extend: 'Ext.app.Controller',
    markers: [],
    directionsDisplay: null,
    directionsService: null,
    config: {
        stores: ['EventTracker'],
        refs: {
            eventListPanel: 'eventListPanel',
            eventList: '#EventList',
            eventMap: 'eventMap'
        },
        control: {
            eventListPanel: {
                eventSelectCommand: "onEventSelected"
            },
            eventMap: {
                backButton: "onBackButton",
                mapRender: "onMapRender"
            }
        }
    },
    launch: function() {
        // Initialize Google Map Services
        this.directionsDisplay = new google.maps.DirectionsRenderer();
        this.directionsService = new google.maps.DirectionsService();

        var mapRendererOptions = {
            //draggable: true,  //Allows to drag route
            //hideRouteList: true,
            suppressMarkers: true
        };

        this.directionsDisplay.setOptions(mapRendererOptions);
    },

    // Transitions
    slideLeftTransition: { type: 'slide', direction: 'left' },
    slideRightTransition: { type: 'slide', direction: 'right' },

    onEventSelected: function (list, record) {
        var mapView = this.getEventMap();
        mapView.setRecord(record);
        Ext.Viewport.animateActiveItem(mapView, this.slideLeftTransition);

        this.renderMap(mapView, mapView.down("#eventMap").getMap(), record.data);
    },

    onBackButton: function () {
        console.log("Back to home");
        var store = Ext.getStore('EventTracker');
        store.getProxy().setUrl('http://localhost:3000/event/');
        store.load();
        Ext.Viewport.animateActiveItem(this.getEventListPanel(), this.slideRightTransition);
    },

    renderMap: function (extmap, map, record) {
        // erase old markers
        if (this.markers.length > 0) {
            Ext.each(this.markers, function (marker) {
                marker.setMap(null);
            });
        }

        var position = new google.maps.LatLng(record.latitude, record.longitude);

        var dynaMarker = new google.maps.Marker({
            position: position,
            title: record.name + "'s Location",
            map: map,
            icon: 'resources/img/yellow_MarkerB.png'
        });

        this.markers.push(dynaMarker);

        var infowindow = new google.maps.InfoWindow({
            content: "We've found your event!"
        });

        google.maps.event.addListener(dynaMarker, 'click', function () {
            infowindow.open(map, dynaMarker);
        });

        setTimeout(function () {
            map.panTo(position);
        }, 1000);

        var geo = extmap.down("#eventMap").getGeo();
        var currentPosition = new google.maps.LatLng(geo.getLatitude(), geo.getLongitude());
        this.plotRoute(map, currentPosition, position);

        // stop updates to center
        geo.suspendUpdates();
    },

    plotRoute: function (map, orig, dest) {
        this.directionsDisplay.setMap(map);

        var dd = this.directionsDisplay;

        var selectedMode = "WALKING"; // DRIVING, WALKING, BICYCLING
        var request = {
            origin: orig,
            destination: dest,
            travelMode: google.maps.TravelMode[selectedMode]
        };
        this.directionsService.route(request, function (response, status) {
            if (status === google.maps.DirectionsStatus.OK) {
                dd.setDirections(response);
            }
        });

    }
});