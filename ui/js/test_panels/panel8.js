const panel8Form = new Ext.form.FormPanel({
    title: 'Form Layout',
    bodyStyle: 'padding:15px',
    defaultType: 'textfield',
    defaults: {
        width: 400,
        msgTarget: 'side'
    },
    items: [{
        fieldLabel: 'Username',
        name: 'username',
        allowBlank: false,
        required: true,
    }, {
        fieldLabel: 'Password',
        name: 'password',
        inputType: 'password',
        required: true,
    }, {
        fieldLabel: 'Email',
        name: 'email',
        required: true,
        vtype: 'email',
    }, {
        xtype: 'textarea',
        hideLabel: true,
        name: 'desc',
        anchor: '100% -53'
    }],
    buttons: [
        {
            text: 'Save',
            handler(){
                const form = panel8Form.getForm();
                if(form.isValid()){
                    panel8Lbl.setText(form.getValues(true))
                }
            }
        }
    ],
    labelSeparator: ':',
});

const panel8Lbl = new Ext.form.Label();

panel8 = new Ext.Panel({
    title: 'Задание 8',
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
                'Добавить форму, с полями для ввода, фио, пароля, имейла и описания. Все поля обязательны для ввода',
                'Ниже кнопка субмит, при нажатии на нее с формы берутся все данны и отображаются ниже в виде текста'
            ].join('<br/>')
        },
        panel8Form,
        panel8Lbl
    ]
});