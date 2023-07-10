panel11 = new Ext.Panel({
    title: 'Задание 11',
    listeners: {
        scope: this,
        activate: function (a) {
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
                '<p>Работа с Xtemplate</p>',
                'Создать шаблон используя Xtemplate в котором какая-то хтмл верстка'
            ].join('<br/>')
        }, {
            xtype: 'panel',
            flex: 1,
            padding: 10,
            listeners: {
                afterrender(panel) {
                    fetch('http://localhost:3000/users').then(response => response.json()).then(data => {
                        tpl.overwrite(panel.getEl(), data);
                    });
                    const tpl = new Ext.XTemplate('<table><thead><tr><th>id</th><th>name</th></tr></thead>',
                        '<tbody><tpl for="."><tr><td>{id}</td><td>{username}</td></tr></tpl></tbody>');
                }
            }
        }
    ]
});