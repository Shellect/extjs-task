panel15 = new Ext.Panel({
    title: 'Задание 15',
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
                'Сделать табпанел, в одном из них сделать отображение счетчика https://prnt.sc/s6z6ll',
                'при открытии любого таба счетчик должен увеличиватся'
            ].join('<br/>')
        }, {
            xtype: 'panel',
            flex: 1,
            padding: 10,
            items: [
                new Ext.TabPanel({
                    counter: 0,
                    tabRenderer(index, text){
                        this.counter+= 1;
                        const style = `display: inline-block;
  width: .8em;
  height: .8em;
  border-radius: 50%;
  color: #FD0;
  font-size: .8em;
  line-height: .8em;
  text-align: center;
  background: #000;
  padding: .2em`;
                        const tab = this.getItem(index);
                        tab.setTitle(`<span style="${style}">${this.counter}</span> ` + text
                        );
                    },
                    items: [
                        {
                            title: 'Tab 1',
                            html: "First Tab",
                            listeners: {
                                activate(tab) {
                                    this.ownerCt.tabRenderer(1, 'Tab 2');
                                }
                            }
                        },
                        {
                            title: 'Tab 2',
                            html: 'Second Tab',
                            listeners: {
                                activate(tab) {
                                    this.ownerCt.tabRenderer(1, 'Tab 2');
                                }
                            }
                        },
                        {
                            title: 'Tab 3',
                            html: 'Third tab',
                            listeners: {
                                activate(tab) {
                                    this.ownerCt.tabRenderer(1, 'Tab 2');
                                }
                            }
                        }
                    ],
                    listeners: {
                        afterrender(panel) {
                            panel.tabRenderer(1, 'Tab 2');
                        }
                    }
                })
            ]
        }
    ]
});