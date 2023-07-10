const comb = new Ext.form.ComboBox({
    store: new Ext.data.ArrayStore({
        fields: ['id', 'displayText'],
        data: [[1, 'item1'], [2, 'item2']],
    }),
    valueField: 'id',
    displayField: 'displayText',
    emptyText: 'Введите новое значение и нажмите кнопку "+"',
    mode: 'local'
});

const comb2 = new Ext.form.ComboBox({
    store: new Ext.data.JsonStore({
        url: 'http://localhost:3000/users',
        fields: ['username', 'id']
    }),
    valueField: 'id',
    displayField: 'username',
    mode: 'remote',
});

panel2 = new Ext.Panel({
    title: 'Задание 2',
    listeners: {
        scope: this,
        activate: a => a.doLayout()
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
                '<p>Работа с комбобоксами</p>',
                'Сделать комбобокс (1) со store type=local,и поместить в нее несколько записей. Справа от комбо сделать кнопку, при ее нажатии в комбо будет добавлятся новая запись',
                'Сделать комбобокс (2) со store type=remote и справа от него кнопка (обновить)',
                'В комбобокс (2) грузятся данные с сервера (любые, тестовые) по нажатию кнопки обновить'
            ].join('<br/>')
        },
        {
            xtype: 'panel',
            flex: 1,
            padding: 10,
            layout: {
                type: 'HBox',
            },
            items: [
                comb,
                {
                    xtype: 'button',
                    text: '+',
                    handler: function () {
                        const store = comb.getStore(),
                            value = comb.getValue();

                        if (typeof value === 'string' && value.trim()) {
                            store.add([new store.recordType({'displayText': value})]);
                        }
                    }
                }
            ]
        },
        {
            xtype: 'panel',
            flex: 1,
            padding: 10,
            layout: {
                type: 'HBox',
            },
            items: [
                comb2,
                {
                    xtype: 'button',
                    text: '↺',
                    handler: function () {
                        comb2.getStore().reload();
                    }
                }
            ]
        }
    ]
});