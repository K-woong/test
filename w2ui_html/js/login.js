



$(function () {
    var pstyle = 'border: 1px solid #dfdfdf; padding: 5px;';
    $('#layout').w2layout({
        name: 'layout',
        panels: [
            { type: 'top',  size: 50, resizable: true, style: pstyle, content: 'top' },
            { type: 'left', size: 200, resizable: true, style: pstyle, content: sidebar },
            { type: 'main', style: pstyle, content: form },
        ]
    });
});


$(function () {
    $('#sidebar').w2sidebar({
        
        name: 'sidebar',
        nodes: [
            { id: 'year-1', text: '2021년', img: 'icon-folder', expanded: true, group: true,
              nodes: [ { id: 'month-1', text: '01월', icon: 'fa fa-home' },
                       { id: 'month-2', text: '02월', icon: 'fa fa-star' },
                       { id: 'month-3', text: '03월', icon: 'fa fa-star-o' },
                       { id: 'month-4', text: '04월', icon: 'fa fa-home' },
                       { id: 'month-5', text: '05월', icon: 'fa fa-star' },
                       { id: 'month-6', text: '06월', icon: 'fa fa-star-o' },
                       { id: 'month-7', text: '07월', icon: 'fa fa-home' },
                       { id: 'month-8', text: '08월', icon: 'fa fa-star' },
                       { id: 'month-9', text: '09월', icon: 'fa fa-star-o' },
                       { id: 'month-10', text: '10월', icon: 'fa fa-home' },
                       { id: 'month-11', text: '11월', icon: 'fa fa-star' },
                       { id: 'month-12', text: '12월', icon: 'fa fa-star-o' }
                     ]
            },
        ]
    });
});

