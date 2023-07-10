const result = new Ext.form.Label({
    text: "Дата не выбрана"
})

panel4 = new Ext.Panel({
    title: 'Задание 4',
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
                '<p>Работа с датапикером</p>',
                'Сделать выбор даты. После выбора даты отображать ниже результат',
                'в датапикере отрбражать дату в формате 27.04.2020 а результат',
                'отображать в формате Y-m-d'
            ].join('<br/>')
        }, {
            xtype: 'panel',
            flex: 1,
            padding: 10,
            items: [
                new Ext.form.DateField({
                    editable: false,
                    format: "d.m.Y",
                    listeners: {
                        select: function (self, date){
                            result.setText(date.format('Y-m-d'));
                        }
                    }
                }),
                result

            ]
        }
    ]
});