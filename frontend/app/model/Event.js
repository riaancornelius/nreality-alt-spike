Ext.define('MyApp.model.Event', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            {
                name: 'name'
            },
            {
                name: 'description'
            },
            {
                name: 'longitude',
                type: 'float'
            },
            {
                name: 'latitude',
                type: 'float'
            },
            {
                name: 'coords'
            },
            {
                name: 'date',
                type: 'date'
            },
            {
                name: '_id'
            }
        ]
    }
});