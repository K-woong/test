
var docV = document.documentElement;
// 전체화면 설정
function openFullScreenMode() {
    if (docV.requestFullscreen)
        docV.requestFullscreen();
    else if (docV.webkitRequestFullscreen) // Chrome, Safari (webkit)
        docV.webkitRequestFullscreen();
    else if (docV.mozRequestFullScreen) // Firefox
        docV.mozRequestFullScreen();
    else if (docV.msRequestFullscreen) // IE or Edge
        docV.msRequestFullscreen();
}

// 전체화면 해제
function closeFullScreenMode() {
    if (document.exitFullscreen)
        document.exitFullscreen();
    else if (document.webkitExitFullscreen) // Chrome, Safari (webkit)
        document.webkitExitFullscreen();
    else if (document.mozCancelFullScreen) // Firefox
        document.mozCancelFullScreen();
    else if (document.msExitFullscreen) // IE or Edge
        document.msExitFullscreen();
}

const URL = "http://www.hyperlogic.co.kr:8080/tree.json"
var treejson;

$.ajaxSetup({ async: false });
$.getJSON(URL,function(data){treejson = eval(data);});
$.ajaxSetup({ async: true });

$(document).ready(function () {
    // init layout
    
    window.parent = '200514';
    window.data_index = '3';

    let top_html = "<html> \
                    <head> \
                    </head> \
                    <body sytle=\"padding: 0px 0px 0px 0px\"> \
                        <div style=\"display: inline; font-size: 20px; vertical-align: middle;\">\
                            Hyundai Motors Big Data Analytics Platform \
                        </div> \
                        <div style=\"display: inline; float: right; vertical-align: middle;\"> \
                            <button class=\"w2ui-btn\" onclick=\"window.openFullScreenMode();window.closeFullScreenMode();\">전체화면</button> \
                            <button class=\"w2ui-btn\" onclick=\"w2ui[\'main_layout\'].toggle(\'left\', false)\">Menu</button> \
                            <button class=\"w2ui-btn\" onclick=\"w2ui[\'main_layout\'].toggle(\'preview\', false); preview_load();\">Variables</button> \
                        </div> \
                    </body> \
                    </html>" 
    
    let loader =    "<html> \
                    <head> \
                    <script type=\"text/javascript\" src=\"jquery/jquery-3.5.1.min.js\"></script> \
                    <script type=\"text/javascript\" src=\"jqwidgets/jqxcore.js\"></script> \
                    <script type=\"text/javascript\" src=\"jqwidgets/jqxloader.js\"></script>\
                    <script type=\"text/javascript\">$(\"#jqxLoader\").jqxLoader({ width: 300, height: 200, autoOpen: true});</script> \
                    </head> \
                    <body><div id=\"jqxLoader\"></div></body> \
                    </html>" 

    let left =  {
            name: 'sidebar',
            img: null,
            nodes: [],
                            
            onClick: function (event) {
                                
                window.cmd = event.target;
                console.log(window.cmd);
                window.length = cmd.length;
                window.data = cmd.split("-");

                    
                if (length >9) {
                
                    console.log(data);
                window.parent = window.data[0];
                window.data_index = window.data[1];
                window.type = window.data[2];
                    
                if (type == 'R') {    
                    w2ui['main_layout'].show('preview', true);
                    w2ui['main_layout'].html('main', '<html><head></head><body></body></html>');
                    w2ui['main_layout'].html('preview', '<html><head></head><body></body></html>');
                    w2ui['main_layout'].load('main', 'http://www.hyperlogic.co.kr:8080/' + type + '?' + 'dataset=' + parent + '&' + 'data_index=' + data_index);
                    w2ui['main_layout'].load('preview', 'http://www.hyperlogic.co.kr:8080/' + 'M' + '?' + 'dataset=' + parent + '&' + 'data_index=' + data_index);
                } 
                else if (type == 'D') {    
                    w2ui['main_layout'].show('preview', true);
                    w2ui['main_layout'].html('main', '<html><head></head><body></body></html>');
                    w2ui['main_layout'].html('preview', '<html><head></head><body></body></html>');
                    w2ui['main_layout'].load('main', 'http://www.hyperlogic.co.kr:8080/' + type + '?' + 'dataset=' + parent + '&' + 'data_index=' + data_index);
                    w2ui['main_layout'].load('preview', 'http://www.hyperlogic.co.kr:8080/' + 'M' + '?' + 'dataset=' + parent + '&' + 'data_index=' + data_index);
                } 
                else if (type == 'E') {
                    w2ui['main_layout'].hide('preview', true);
                    w2ui['main_layout'].html('main', '<html><head></head><body></body></html>');
                    w2ui['main_layout'].load('main', 'http://www.hyperlogic.co.kr:8080/' + type + '?' + 'dataset=' + parent + '&' + 'data_index=' + data_index);
                }
                else if (type == 'T') {
                    w2ui['main_layout'].hide('preview', true);
                    w2ui['main_layout'].html('main', '<html><head></head><body></body></html>');
                    w2ui['main_layout'].load('main', 'http://www.hyperlogic.co.kr:8080/' + type + '?' + 'dataset=' + parent + '&' + 'data_index=' + data_index);
                }
                else if (type == 'S') {
                    w2ui['main_layout'].hide('preview', true);
                    w2ui['main_layout'].html('main', '<html><head></head><body></body></html>');
                    w2ui['main_layout'].load('main', 'http://www.hyperlogic.co.kr:8080/' + type + '?' + 'dataset=' + parent + '&' + 'data_index=' + data_index);
                }
                else if (type == 'U') {
                    w2ui['main_layout'].hide('preview', true);
                    w2ui['main_layout'].html('main', '<html><head></head><body></body></html>');
                    w2ui['main_layout'].load('main', 'http://www.hyperlogic.co.kr:8080/' + type + '?' + 'dataset=' + parent + '&' + 'data_index=' + data_index);
                }
                else if (type == 'C') {
                    w2ui['main_layout'].hide('preview', true);
                    w2ui['main_layout'].html('main', '<html><head></head><body></body></html>');
                    w2ui['main_layout'].load('main', 'http://www.hyperlogic.co.kr:8080/' + type + '?' + 'dataset=' + parent + '&' + 'data_index=' + data_index);
                }
                else if (type == 'VCOM') {    
                    w2ui['main_layout'].show('preview', true);
                    w2ui['main_layout'].set('main', { size: 370 });
                    w2ui['main_layout'].resize();
                    w2ui['main_layout'].html('main', '<html><head></head><body></body></html>');
                    w2ui['main_layout'].load('main', 'http://www.hyperlogic.co.kr:8080/VCOM');
                    w2ui['main_layout'].html('preview', '<html><head></head><body></body></html>');
                } 
                }
            }
        

    }

    left.nodes = window.treejson;
    
    var main_layout = $('#main_layout').w2layout({
                        name: 'main_layout',
                        panels: [
                            { type: 'top', size: 40, style: 'border: 0px; border-bottom: 1px solid silver; background-color: #fff; color: #555;', overflow: 'auto'},
                            { type: 'left', size: 350, resizable: true, style: 'border-right: 1px solid silver;', overflow: 'auto'},
                            { type: 'main', resizable: true, style: 'background-color: white;'},
                            { type: 'preview', size: '50%', resizable: true, style: 'background-color: white; border-top: 1px solid silver;' }
                        ]
                    });                

    window.preview_load = function () {      
        w2ui['main_layout'].html('preview', '<html><head></head><body></body></html>');
        w2ui['main_layout'].load('preview', 'http://www.hyperlogic.co.kr:8080/' + 'M' + '?' + 'dataset=' + parent + '&' + 'data_index=' + data_index);
                }
                
    w2ui['main_layout'].html('top', top_html)
    // init sidebar
    w2ui['main_layout'].html('left', $().w2sidebar(left));
    

});