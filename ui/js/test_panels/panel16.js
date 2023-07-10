panel16 = new Ext.Panel({
    title: 'Задание 16',
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
                '<p>Работа с Window</p>',
                'Открыть модальное окно, после открытия посылать запрос на сервер для загрузки данных',
                'после отправки показывать лоад маску. На сервере сделать sleep(3) чтоб имитировать долгую загрузку',
                'После того как данные пришли с сервера, прятать лоад маску'
            ].join('<br/>')
        }, {
            xtype: 'panel',
            flex: 1,
            padding: 10,
            layout: {
                type: 'vbox',
                padding: '5',
                align: 'center'
            },
            items: [
                new Ext.Window({
                    title: 'Приложение',
                    width: 500,
                    height: 150,
                    loadMask: true,
                    defaultType: 'label',
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    listeners: {
                        afterrender(window) {
                            const mask = new Ext.LoadMask(window.getEl(), {msg: "Wait, loading..."});
                            mask.show();
                            fetch("http://localhost:3000/long-load").then(() => {
                                mask.hide();
                                window.add({html : "Success loaded"});
                                window.doLayout();
                            })
                            window.show();
                        },
                    }
                })
            ]
        }
    ]
});