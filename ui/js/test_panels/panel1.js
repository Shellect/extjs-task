panel1 = new Ext.Panel({
    title: 'Задание 1',
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
                '<p>Динамическое создание кнопок.</p>',
                'Добавить кнопку, при нажатии на которую, внизу будет появлятся такая же кнопка.',
                'При этом нажатая кнопка деактивируется через 3 секунды после нажатия'
            ].join('<br/>')
        },
        {
            xtype: 'panel',
            flex: 1,
            padding: 10,
            items: [{
                xtype: 'button',
                text: "Нажми меня",
            }],
            listeners: {
                afterrender: function (panel) {
                    panel.getEl().on('click', function (e, target) {
                        if (target.tagName === 'BUTTON') {
                            const btn = new Ext.Button({xtype: 'button', text: "Нажми меня"});
                            setTimeout(() => panel.remove(btn), 1000);
                            panel.add(btn);
                            panel.doLayout();
                        }
                    });
                }
            }
        }
    ]
});