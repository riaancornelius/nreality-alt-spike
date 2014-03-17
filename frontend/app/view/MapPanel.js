Ext.define('MyApp.view.MapPanel', {
    extend: 'Ext.Panel',
    requires: 'Ext.Map',
    alias: 'widget.eventMap',
    id: 'myMapPanel',
    config: {
        layout: 'fit',
//        scrollable: 'vertical',
//        styleHtmlContent: true,
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                itemId: 'mapToolbar',
                title: 'Event',
                items: [
                    {
                        xtype: 'button',
                        ui: 'back',
                        itemId: 'backButton',
                        text: 'Back'
                    }
                ]
            }
        ],
        listeners: [
            {
                delegate: "#backButton",
                event: "tap",
                fn: "onBackButtonTap"
            }
        ]
    },
    initialize: function() {
        this.callParent();

        var map = {
            xtype: 'map',
            id: 'eventMap',
            itemId: 'eventMap',
            styleHtmlContent: true,
            mapOptions: {
                zoom: 11,
                zoomControl: true
//                    center: new google.maps.LatLng(33.143, -117.221)
            },
            plugins: [
                new Ext.plugin.google.Tracker({
                    trackSuspended: false,
                    allowHighAccuracy: true,
                    marker: new google.maps.Marker({
                        title: 'My Current Location',
                        icon: 'resources/img/blue_MarkerA.png'
                    })
                })
               // ,new Ext.plugin.google.Traffic()  //Adds traffic
            ],
            listeners: [
                {
                    scope: this,
                    maprender: this.onMapRender
                }
            ]
        };
        this.add([map]);
    },
    onBackButtonTap: function () {
        this.fireEvent("backButton", this);
    },
    onMapRender: function (map, gmap, eOpts) {
        this.fireEvent("mapRender", map, gmap, eOpts);
    }

});