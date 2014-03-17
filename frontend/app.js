Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
    models: [
        'Event'
    ],
    stores: [
        'EventTracker'
    ],
    views: [
        'EventPanel',
        'MapPanel'
    ],
    name: 'Alt-Spike',
    controllers: [
        'EventTracker'
    ],
    launch: function() {
        var eventList = {
            xtype: 'eventListPanel'
        };
        var eventMap = {
            xtype: 'eventMap'
        };
        Ext.Viewport.add([eventList, eventMap]);
    }
});