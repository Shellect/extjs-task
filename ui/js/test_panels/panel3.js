const Counter = (function () {
    const store = [];
    const Counter = function () {
    }
    Counter.prototype.add = function (el) {
        store.push(el);
    }
    Counter.prototype.getInfo = function () {

        return store
                .filter(item => item.type === "radio")
                .reduce((carry, item, index) => {
                    return carry + 'Радиокнопка №' + (index + 1) + ' : ' + (item.checked ? "нажата" : "не нажата") + '; '
                }, "")
            + store
                .filter(item => item.type === "checkbox")
                .reduce((carry, item, index) => {
                    return carry + 'Чекбокс №' + (index + 1) + ' : ' + (item.checked ? "нажат" : "не нажат") + '; '
                }, "");
    }

    return Counter;
})()

panel3 = new Ext.Panel({
    title: 'Задание 3',
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
                '<p>Работа с чекбоксами и радиобатонами</p>',
                'Создать 3 радиобатона и 4 чекбокса. Все это как-то обернуть в fieldset. Внизу сделать кнопку',
                'При нажатии на кнопку, снизу от нее отображать текстом какие радио и чекбоксы сейчас нажаты,',
                'а какие не нажаты. Текст должне быть в виде: чекбокс №1 - нажат или чекбокс№2 - не нажат',
                'Придумать красивое решение, чтоб работало на неопределенное кол-во чекбоксов и радиобатонов'
            ].join('<br/>')
        }, {
            xtype: 'panel',
            flex: 1,
            padding: 10,
            items: [
                {
                    xtype: 'fieldset',
                    id: "panel3-fieldset",
                    items: [
                        {
                            xtype: 'radiogroup',
                            columns: 1,
                            items: [
                                {boxLabel: 'Item 1', name: 'test', inputValue: "1"},
                                {boxLabel: 'Item 2', name: 'test', inputValue: "2"},
                                {boxLabel: 'Item 3', name: 'test', inputValue: "3"}
                            ]
                        },
                        {
                            xtype: 'checkboxgroup',
                            columns: 1,
                            items: [
                                {boxLabel: 'Item 1', name: 'test2', inputValue: "0"},
                                {boxLabel: 'Item 2', name: 'test2', inputValue: "1"},
                                {boxLabel: 'Item 3', name: 'test2', inputValue: "2"}
                            ]
                        },
                        {
                            xtype: 'button',
                            text: "Check"
                        }
                    ],
                    listeners: {
                        afterrender: function (fieldset) {
                            const counter = new Counter();
                            const textLabel = new Ext.form.Label({
                                text: "Radio: 0, Checkbox: 0"
                            });
                            fieldset.add(textLabel);
                            fieldset.doLayout();

                            [].forEach.call(document.querySelectorAll("#panel3-fieldset input"), el => counter.add(el));
                            fieldset.getEl().on('click', function (e, target) {
                                if (target.tagName === 'BUTTON') {
                                    textLabel.setText(counter.getInfo());
                                }
                            });
                        }
                    }
                }
            ]
        }
    ]
});