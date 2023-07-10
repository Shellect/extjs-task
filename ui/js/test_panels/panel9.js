const panel9Form = new Ext.form.FormPanel({
    title: 'Form Layout',
    bodyStyle: 'padding:15px',
    defaultType: 'textfield',
    defaults: {
        width: 400,
        msgTarget: 'side'
    },
    items: [
        {
            xtype: 'fieldset',
            id: "panel3-fieldset",
            items: [
                {
                    xtype: 'radiogroup',
                    id: 'test',
                    columns: 1,
                    items: [
                        {boxLabel: 'Item 1', name: 'test', inputValue: "1"},
                        {boxLabel: 'Item 2', name: 'test', inputValue: "2"},
                    ]
                },
                {
                    xtype: 'checkboxgroup',
                    id: 'test2',
                    columns: 1,
                    items: [
                        {boxLabel: 'Item 1', name: 'test2', inputValue: "0"},
                        {boxLabel: 'Item 2', name: 'test2', inputValue: "1"},
                    ]
                },
                {
                    xtype: 'textfield',
                    id: 'text1',
                    fieldLabel: 'Text 1',
                    name: 'text1',
                },
                {
                    xtype: 'textfield',
                    id: 'text2',
                    fieldLabel: 'Text 2',
                    name: 'text2'
                },
                {
                    xtype: 'combo',
                    id: 'cmb',
                    store: [1, 2, 3],
                    mode: 'local'
                },
                {
                    xtype: 'button',
                    text: "Check",
                    handler(){
                        fetch('http://localhost:3000/task9')
                            .then(response => response.json())
                            .then(data => {
                                const elements = panel9Form.getForm().items;
                                elements.each(el => {
                                    if(data[el.id]){
                                        el.setValue(data[el.id]);
                                    }
                                })
                            })
                    }
                }
            ]
        }
    ]
})

panel9 = new Ext.Panel({
    title: 'Задание 9',
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
                '<p>Работа с формами</p>',
                'Сделать форму с 2 радиобатона, 2 чекбокса, 2 текстовых поля и 1 комбобокс',
                'Ниже кнопка загрузить, при нажатии на нее с сервера грузятся данные и подставляются в форму'
            ].join('<br/>')
        }, {
            xtype: 'panel',
            flex: 1,
            padding: 10,
            items: [
                panel9Form
            ]
        }
    ]
});