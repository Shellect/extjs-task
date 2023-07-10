const task6Sm = new Ext.grid.CheckboxSelectionModel({
    listeners: {
        selectionchange: (ths) => {
            task6Btn.disabled = !ths.getSelections().length;
        }
    }
});

const task6Btn = new Ext.Button({
    disabled: true,
    text: "Выберите строку",
    handler: (b, e) => {
        task6Lbl.setText("Selected rows: "
        + task6Sm.getSelections().reduce((accum, el) => accum + `${el.data.person} ${el.data.product} ${el.data.city}; `, ''));
    }
})

const task6Lbl = new Ext.form.Label({
    text: ""
})

panel6 = new Ext.Panel({
    title: 'Задание 6',
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
                'Сделать топ тулбар в гриде. В него добавить кнопку (изначально задизейбленная).',
                'При выделении строки в гриде (кнопка активируется)',
                'При нажатии на кнопку под гридом пишется текстом то что выбрано в гриде'
            ].join('<br/>')
        }, {
            xtype: 'panel',
            flex: 1,
            padding: 10,
            items: [
                new Ext.grid.GridPanel({
                    title: "Task 6",
                    width: 630,
                    height: 400,
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
                            {header: 'City', width: 200, sortable: true, dataIndex: 'city'},
                            task6Sm
                        ]
                    }),
                    selModel: task6Sm,
                    tbar: new Ext.Toolbar({
                        items: [
                            task6Btn
                        ]
                    })
                }),
                task6Lbl
            ]
        }
    ]
});