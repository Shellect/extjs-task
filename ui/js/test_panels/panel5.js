const sm = new Ext.grid.CheckboxSelectionModel();

panel5 = new Ext.Panel({
    title: 'Задание 5',
    listeners: {
        scope: this,
        activate: function (a) {
            console.log('activate');
            a.doLayout();
        }
    },
    layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'panel',
            autoHeight: true,
            padding: 10,
            style: {
                fontWeight: 'bold',
                fontSize: '14px',
                color: 'green'
            },
            html: [
                '<p>Работа с гридом</p>',
                'Сделать грид с 3-мя колонками, который грузит тестовые данные с сервера',
                'В гриде должна быть возможность выбрать много строк, через checkboxselectionmodel'
            ].join('<br/>')
        }, {
            xtype: 'panel',
            flex: 1,
            padding: 10,
           items: [
                new Ext.grid.GridPanel({
                    title: "Task 5",
                    width: 624,
                    height: 380,
                    store: new Ext.data.Store({
                        url: 'http://localhost:3000/products',
                        autoLoad: true,
                        reader: new Ext.data.JsonReader({
                            root: 'rows',
                            idProperty: 'id'
                        }, Ext.data.Record.create([
                            {name: 'person', type: 'string'},
                            {name: 'product', type: 'string'},
                            {name: 'city', type: 'string'},
                            {name: 'value', type: 'float'}
                        ]))
                    }),
                    colModel: new Ext.grid.ColumnModel({
                        defaults: {
                            width: 100,
                            sortable: true
                        },
                        columns: [
                            {header: 'Person', width: 200, sortable: true, dataIndex: 'person'},
                            {header: 'Product', width: 200, sortable: true, dataIndex: 'product'},
                            {header: 'city', width: 200, sortable: true, dataIndex: 'city'},
                            sm
                        ]
                    }),
                    selModel: sm
                })
           ]
        }
    ]
});