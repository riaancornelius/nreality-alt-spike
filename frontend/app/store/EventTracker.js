Ext.define('MyApp.store.EventTracker', {
    extend: 'Ext.data.Store',
    requires: [
        'MyApp.model.Event'
    ],

    config: {
        autoLoad: true,
        model: 'MyApp.model.Event',
        storeId: 'EventTracker',
        proxy: {
            type: 'jsonp',
            url: 'http://localhost:3000/event/',
            reader: {
                type: 'json',
                idProperty: '_id',
                rootProperty: 'records',
                useSimpleAccessors: true
            }
        }
    }
});