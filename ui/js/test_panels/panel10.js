panel10 = new Ext.Panel({
    title: 'Задание 10',
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
                '<p>Работа с табпанелом</p>',
                'Добавить табпанел с 3мя табами, последний панел задизейбленный',
                'При переключении на 2й активировать 3й таб. При переходе на 3й таб, задизейблить 1й таб'
            ].join('<br/>')
        }, {
            xtype: 'panel',
            flex: 1,
            padding: 10,
            items: [
                new Ext.TabPanel({
                    listeners: {
                        afterrender(panel){
                            const tabs = [new Ext.Panel({
                                title: 'Tab 1',
                                html: 'First tab'
                            }), new Ext.Panel({
                                title: 'Tab 2',
                                html: 'Second tab',
                                listeners: {
                                    activate(){
                                        tabs[2].enable();
                                    }
                                }
                            }), new Ext.Panel({
                                title: 'Tab 3',
                                html: 'Third tab',
                                disabled: true,
                                listeners: {
                                    activate(){
                                        tabs[0].disable();
                                    }
                                }
                            })];
                            tabs.forEach(tab => panel.add(tab));
                            panel.doLayout();

                        }
                    }
                })
            ]
        }
    ]
});