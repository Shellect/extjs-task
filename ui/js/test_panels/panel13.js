panel13 = new Ext.Panel({
    title: 'Задание 13',
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
                '<p>Работа с Xtemplate</p>',
                'Сделать Xtemplate с получением сложных данных, примерно data => [articles => [...],likes => [...]]',
                'все это грузится одним сторе. в шаблоне отображаются данные с обоих массивов',
                'также использовать if в шаблон'
            ].join('<br/>')
        }, {
            xtype: 'panel',
            flex: 1,
            padding: 10,
            listeners: {
                afterrender(panel) {
                    fetch('http://localhost:3000/articles').then(response => response.json()).then(data => {
                        tpl.overwrite(panel.getEl(), data);
                    });
                    const tpl = new Ext.XTemplate('<table><thead>',
                        '<tr><th>person</th><th>title</th><th>Content</th></tr></thead>',
                        '<tbody><tpl for="data.articles"><tr>',
                        '<tpl if="parent.data.likes[xindex - 1].vote &gt; 2">',
                        '<td>{[parent.data.likes[xindex - 1].person]}</td>',
                        '</tpl>',
                        '<td>{title}</td>',
                        '<td>{content}</td>',
                        '</tr></tpl></tbody>');
                }
            }
        }
    ]
});