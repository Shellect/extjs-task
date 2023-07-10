panel14 = new Ext.Panel({
    title: 'Задание 14',
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
                '<p>Работа с Window</p>',
                'Создать модальное окно. В котором будет 2 кнопки  (+ и -)',
                'при нажатии на + в окно добавляется рандомный елемент',
                'один из (кнопка, текст филд, комбобокс, чекбос). при нажатии на минус, один из них удаляется с окна',
                'Сделать чтоб при добавлении элементов размер окна изменялся и центровался.',
                'А при удалении элементов размер уменьшался (важно чтоб тень от окна тоже перестраивалась)'
            ].join('<br/>')
        },
        {
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
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    createButton() {
                        return new Ext.Button({
                            text: "Кнопка №" + this.autoIncrement("button")
                        });
                    },
                    createTextField() {
                        return new Ext.form.Field({type: 'text'});
                    },
                    createCombobox() {
                        return new Ext.form.ComboBox({
                            store: [1, 2, 3]
                        })
                    },
                    createCheckbox() {
                        return new Ext.form.Checkbox({
                            boxLabel: "Чекбокс №" + this.autoIncrement("checkbox")
                        });
                    },
                    autoIncrement(type) {
                        return this.storedElements.filter(el => el.getXType() === type).length + 1;
                    },
                    getRandomElement() {
                        const r = Math.floor(Math.random() * this.randomElements.length);
                        return this.randomElements[r];
                    },

                    randomElements: [],
                    storedElements: [],
                    items: [

                        {
                            xtype: 'button',
                            text: '+',
                            handler(btn){
                                const window = btn.ownerCt;
                                const newEl = window.getRandomElement.call(window)();
                                window.add(newEl);
                                window.storedElements.push(newEl);
                                window.doLayout();
                                window.setHeight(window.storedElements.reduce((height, el) => height + el.getHeight(), 150));
                            }
                        },
                        {
                            xtype: 'button',
                            text: '-',
                            handler(btn) {
                                const window = btn.ownerCt;
                                const selectedElIndex = Math.floor(Math.random() * window.randomElements.length);
                                window.remove(window.storedElements[selectedElIndex]);
                                window.storedElements.remove(window.storedElements[selectedElIndex]);
                                window.doLayout();
                                window.setHeight(window.storedElements.reduce((height, el) => height + el.getHeight(), 150));
                            }
                        }

                    ],
                    listeners: {
                        afterrender(window) {
                            window.randomElements = [
                                this.createButton.bind(this),
                                this.createTextField.bind(this),
                                this.createCombobox.bind(this),
                                this.createCheckbox.bind(this)
                            ];
                            window.show();
                        },
                        click(window, event) {

                        }
                    }
                })
            ]
        }
    ]
});