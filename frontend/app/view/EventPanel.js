Ext.define('MyApp.view.EventPanel', {
    extend:'Ext.Panel',
    alias: 'widget.eventListPanel',
    config:{
        layout:{
            type:'fit'
        },
        items:[
            {
                xtype:'toolbar',
                docked:'top',
                title:'Event'
            },
            {
                xtype:'list',
                store:'EventTracker',
                id:'EventList',
                itemId:'eventList',
                emptyText: "<div>No Events Found</div>",
//                onItemDisclosure: true,
                loadingText: "Loading Events",
                itemTpl:[
                    '<div>{description} is located at {latitude} (latitude) and {longitude} (longitude)</div>'
                ]
            }
        ],
        listeners:[
            {
                fn:'onEventsListItemTap',
                event:'itemtap',
                delegate:'#EventList'
            }
        ]
    },
    onPetsListItemTap:function (dataview, index, target, record, e, options) {
        this.fireEvent('eventSelectCommand', this, record);
    }
});