// 사이드바
$(function () {
    var driver_name, drive_date, car_type;
    var cnt = 0;
    $('#sidebar').w2sidebar({        
        name: 'sidebar',
        bottomHTML : '<div id="bottomGrid" style="width: 100%; height: 500px; display:none;"></div>',
        nodes: [                
            { id: 'date', text: '일별데이터분석', img: 'icon-folder' },
            { id: 'random', text: '임의분석', img: 'icon-folder' }                
        ],

        // 사이드바 click function
        onClick: function(event) {
            if(event.target.indexOf('date') != -1) {                
                var gridjson;
                
                let todatetime = new Date();   
                let year = todatetime.getFullYear(); // 년도
                let month = todatetime.getMonth() + 1;  // 월
                let date = todatetime.getDate();  // 날짜
                let day = todatetime.getDay();  // 요일
                let before = todatetime.getDate()-7;

                var today = year + '-' + month + '-' + date;
                var fromday = year + '-' + month + '-' + before;
                
                $.ajax({
                    // url: 'http://1.234.51.110:8000/metadata/queryByDate?fromdate='+fromday+'&todate='+today,
                    url: 'http://1.234.51.110:8000/metadata/queryByDate?fromdate=2019-01-01&todate='+today,
                    type: "GET",
                    dataType:"json",
                    //전역변수 지정시 필수 
                    async : false,
                    success: function(json) {
                        gridjson = json;
                        console.log(gridjson);
                    }
                })

                // 기존 그리드 제거
                if(w2ui.hasOwnProperty('mainGrid')) w2ui['mainGrid'].destroy();
                if(w2ui.hasOwnProperty('bottomGrid') )w2ui['bottomGrid'].destroy();
                if(w2ui.hasOwnProperty('tabGrid') )w2ui['tabGrid'].destroy();

                // 사이드바 바텀그리드
                $('#bottomGrid').w2grid({ 
                    name: 'bottomGrid', 
                    show: {                        
                        toolbar: true,
                        toolbarEdit: true,
                        toolbarAdd: true, 
                        toolbarDelete: true,
                        footer: true
                    },
                    multiSearch: true,
                    columns: [
                        { field: 'recid', text: 'ID', size: '50px', attr:"align=center", editable: { type: 'int' } },
                        { field: 'DATE', text: 'DATE', size: '100px', attr:"align=center", editable: { type: 'date' } },
                        { field: 'DRIVER', text: 'DRIVER', size: '100px' , attr:"align=center", editable: { type: 'text' } },
                        { field: 'TYPE', text: 'TYPE', size: '100px', attr:"align=center", editable: { type: 'text' } },
                    ],
                    records : gridjson,
                    onAdd: function (event) {                        
                        var url = "insert.html";
                        var name = "Insert Form";
                        var option = "width = 600, height = 500, top = 100, left = 200, location = no"
                        window.open(url, name, option);
                    },                      
                    searches: [
                        { field: 'recid', caption: 'ID', type: 'int' },
                        { field: 'DATE', caption: 'DATE', type: 'date' },
                        { field: 'DRIVER', caption: 'DRIVER', type: 'text' },
                        { field: 'TYPE', caption: 'TYPE', type: 'text' },
                    ],
                    // 바텀그리드 click function
                    onClick: function(event) {
                        
                        var mainJson = this.get(event.recid);
                        driver_name = mainJson.DRIVER;
                        drive_date = mainJson.DATE;
                        car_type = mainJson.TYPE;
                    
                        if(w2ui.hasOwnProperty('mainGrid')) w2ui['mainGrid'].destroy();
                        if(w2ui.hasOwnProperty('tabGrid') )w2ui['tabGrid'].destroy();
                        
                        viewGrid(mainJson);
                    },
                    onEdit: function (event) {
                        var url = "update.html?driver_name="+driver_name+'&drive_date='+drive_date+'&car_type='+car_type;
                        var name = "Update Form";
                        var option = "width = 600, height = 500, top = 100, left = 200, location = no"
                        window.open(url, name, option);
                    },
                    onDelete: function (event) {
                        if(event.force==true){
                            $.ajax({
                                url:'http://1.234.51.110:8000/delete_metadata/?date='+drive_date+'&driver='+driver_name+'&car_type='+car_type,
                                type:'DELETE',
                                dataType:'json',
                                contentType : 'application/x-www-form-urlencoded; charset=utf-8',                     
                                success : function(result) {                               
                                    alert('삭제되었습니다.')
                                    document.location.reload();                                                            
                                }
                            });                         
                        }                 
                    }
                });
                
                $('#bottomGrid').css("display", "block");


            } else if (event.target.indexOf('random') != -1) {

                var gridjson;

                $.ajax({
                    url: 'http://www.hyperlogic.co.kr:3000/records?record_count=10',
                    type: "GET",
                    dataType:"json",
                    //전역변수 지정시 필수 
                    async : false,
                    success: function(json) {
                        gridjson = json;
                    }
                })

                // 기존그리드 제거
                if(w2ui.hasOwnProperty('mainGrid')) w2ui['mainGrid'].destroy();
                if(w2ui.hasOwnProperty('bottomGrid') )w2ui['bottomGrid'].destroy();

                viewGrid();

            }
        }        
    });

}); // $(function())

// 그리드
function viewGrid (mainJson) {   
        
    if(mainJson.TYPE=='일반') {
        $.ajax({
            url: 'http://1.234.51.110:8000/turbo/?fromdate='+mainJson.DATE+'&todate='+mainJson.DATE,
            type: "GET",
            dataType:"json",
            //전역변수 지정시 필수 
            async : false,
            success: function(json) {
                gridjson = json;
            }
        })
    } else {
        $.ajax({
            url: 'http://1.234.51.110:8000/hybrid/?fromdate='+mainJson.DATE+'&todate='+mainJson.DATE,
            type: "GET",
            dataType:"json",
            //전역변수 지정시 필수 
            async : false,
            success: function(json) {
                gridjson = json;
            }
        })
    }
     
    $('#mainGrid').w2grid({ 
        name: 'mainGrid', 
        columns: [                
            { field: 'recid', text: 'ID', size: '50px', attr:"align=center", editable: { type: 'int' } },
            { field: 'DATE', text: 'DATE', size: '100%', attr:"align=center", editable: { type: 'date' } },
            { field: 'RPM', text: 'RPM', size: '100%' , attr:"align=center", editable: { type: 'text' } },
            { field: 'TORQUE', text: 'TORQUE', size: '100%', attr:"align=center", editable: { type: 'text' } },
            { field: 'ETC', text: 'ETC', size: '100%', attr:"align=center", editable: { type: 'text' } },
            { field: 'SPEED', text: 'SPEED', size: '100%' , attr:"align=center", editable: { type: 'text' } },
            { field: 'ATS', text: 'ATS', size: '100%', attr:"align=center", editable: { type: 'text' } },
            { field: 'IATS', text: 'IATS', size: '100%', attr:"align=center", editable: { type: 'text' } },
            { field: 'ECTS', text: 'ECTS', size: '100%' , attr:"align=center", editable: { type: 'text' } },
            { field: 'OPTS', text: 'OPTS', size: '100%', attr:"align=center", editable: { type: 'text' } },
            { field: 'ATF', text: 'ATF', size: '100%', attr:"align=center", editable: { type: 'text' } },
            { field: 'MAFS', text: 'MAFS', size: '100%' , attr:"align=center", editable: { type: 'text' } },
            { field: 'MAPS', text: 'MAPS', size: '100%', attr:"align=center", editable: { type: 'text' } },
            { field: 'TEMP', text: 'TEMP', size: '100%', attr:"align=center", editable: { type: 'text' } },
            { field: 'EGR', text: 'EGR', size: '100%' , attr:"align=center", editable: { type: 'text' } },
            { field: 'MOTERRPM', text: 'MOTERRPM', size: '100%', attr:"align=center", editable: { type: 'text' } },
            { field: 'BPS', text: 'BPS', size: '100%', attr:"align=center", editable: { type: 'text' } },
            { field: 'EWGA', text: 'EWGA', size: '100%' , attr:"align=center", editable: { type: 'text' } },
            { field: 'STATORTEMP', text: 'STATORTEMP', size: '100%', attr:"align=center", editable: { type: 'text' } },
            { field: 'OILTEMP', text: 'OILTEMP', size: '100%', attr:"align=center", editable: { type: 'text' } },
            { field: 'INVERTERTEMP', text: 'INVERTERTEMP', size: '100%' , attr:"align=center", editable: { type: 'text' } },
            { field: 'BATTERYTEMP', text: 'BATTERYTEMP', size: '100%', attr:"align=center", editable: { type: 'text' } }
            
        ],  
        records : gridjson,
              
        searches: [
           { field: 'recid', caption: 'ID', size: '50px', type: 'int' },
           { field: 'DATE', caption: 'DATE', size: '100px', type: 'date' },
           { field: 'RPM', caption: 'RPM', size: '100px' , type: 'text' },
           { field: 'TORQUE', caption: 'TORQUE', size: '100%', type: 'text'  },
           { field: 'ETC', caption: 'ETC', size: '100%', type: 'text' },
           { field: 'SPEED', caption: 'SPEED', size: '100px' , type: 'text'  },
           { field: 'ATS', caption: 'ATS', size: '100%', type: 'text' },
           { field: 'IATS', caption: 'IATS', size: '100%', type: 'text' },
           { field: 'ECTS', caption: 'ECTS', size: '100px',  type: 'text' },
           { field: 'OPTS', caption: 'OPTS', size: '100%', type: 'text' },
           { field: 'ATF', caption: 'ATF', size: '100%', type: 'text' },
           { field: 'MAFS', caption: 'MAFS', size: '100px' , type: 'text' },
           { field: 'MAPS', caption: 'MAPS', size: '100%', type: 'text' },
           { field: 'TEMP', caption: 'TEMP', size: '100%', type: 'text' },
           { field: 'EGR', caption: 'EGR', size: '100px' , type: 'text' },
           { field: 'MOTERRPM', caption: 'MOTERRPM', type: 'text' },
           { field: 'BPS', caption: 'BPS', size: '100%',type: 'text' },
           { field: 'EWGA', caption: 'EWGA', size: '100px' , type: 'text' },
           { field: 'STATORTEMP', caption: 'STATORTEMP', type: 'text' },
           { field: 'OILTEMP', caption: 'OILTEMP', size: '100%', type: 'text' },
           { field: 'INVERTERTEMP', caption: 'INVERTERTEMP', type: 'text' },
           { field: 'BATTERYTEMP', caption: 'BATTERYTEMP',  type: 'text' }
        ],      
    });     
    $('#mainGrid').css("display", "block");

    
    var tabjson;

    $.ajax({
        url: 'http://1.234.51.110:8000/detail_metadata2/?driver='+mainJson.DRIVER+'&date='+mainJson.DATE+'&type='+mainJson.TYPE,
        type: "GET",
        dataType:"html",
        data:"detail.html",
        //전역변수 지정시 필수 
        async : false,
        success: function(json) {
            
            tabjson = json;
            console.log(tabjson);
            // console.log(tabjson);
        }
    })
    $(function () {
        
        $('#tabs').w2tabs(config.tabs);
        // var jsonKey = Object.keys(tabjson[0]);

        // var tab1_html = "";
            
        //     tab1_html += "<div class='table-responsive'>"
        //     tab1_html += "<table id='tab_table' class='min-w-full leading-normal' style='width: 100%; height: 410px;'>";
        //     tab1_html += "  <thead>";
        //     tab1_html += "      <tr>";
        //     tab1_html += "          <th class='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>"+jsonKey[1]+"</th>";
        //     tab1_html += "          <th class='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>"+jsonKey[0]+"</th>";
        //     tab1_html += "          <th class='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>"+jsonKey[2]+"</th>";
        //     tab1_html += "          <th class='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>"+jsonKey[3]+"</th>";
        //     tab1_html += "          <th class='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>"+jsonKey[4]+"</th>";
        //     tab1_html += "          <th class='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>"+jsonKey[5]+"</th>";
        //     tab1_html += "          <th class='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>"+jsonKey[6]+"</th>";
        //     tab1_html += "          <th class='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>"+jsonKey[7]+"</th>";
        //     tab1_html += "          <th class='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>"+jsonKey[8]+"</th>";
        //     tab1_html += "          <th class='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>"+jsonKey[9]+"</th>";
        //     tab1_html += "          <th class='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>"+jsonKey[10]+"</th>";
        //     tab1_html += "          <th class='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>"+jsonKey[11]+"</th>";
        //     tab1_html += "          <th class='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>"+jsonKey[12]+"</th>";
        //     tab1_html += "      </tr>";
        //     tab1_html += "  </thead>";
        //     tab1_html += "  <tbody>";
        //     tab1_html += "      <tr class='px-5 py-5 border-b border-gray-200 bg-white text-xl'>";
        //     tab1_html += "          <td class='px-5 py-5 border-b border-gray-200 bg-white text-xl'>"+tabjson[0].DATE+"</td>";
        //     tab1_html += "          <td class='px-5 py-5 border-b border-gray-200 bg-white text-xl'>"+tabjson[0].DRIVEDISTANCE+"</td>";
        //     tab1_html += "          <td class='px-5 py-5 border-b border-gray-200 bg-white text-xl'>"+tabjson[0].WEATHER+"</td>";
        //     tab1_html += "          <td class='px-5 py-5 border-b border-gray-200 bg-white text-xl'>"+tabjson[0].AIRCONDITIONER+"</td>";
        //     tab1_html += "          <td class='px-5 py-5 border-b border-gray-200 bg-white text-xl'>"+tabjson[0].PEOPLE+"</td>";
        //     tab1_html += "          <td class='px-5 py-5 border-b border-gray-200 bg-white text-xl'>"+tabjson[0].TYPE+"</td>";
        //     tab1_html += "          <td class='px-5 py-5 border-b border-gray-200 bg-white text-xl'>"+tabjson[0].END_TIME+"</td>";
        //     tab1_html += "          <td class='px-5 py-5 border-b border-gray-200 bg-white text-xl'>"+tabjson[0].DRIVEMODE+"</td>";
        //     tab1_html += "          <td class='px-5 py-5 border-b border-gray-200 bg-white text-xl'>"+tabjson[0].DRIVER+"</td>";
        //     tab1_html += "          <td class='px-5 py-5 border-b border-gray-200 bg-white text-xl'>"+tabjson[0].TEMPERATURE+"</td>";
        //     tab1_html += "          <td class='px-5 py-5 border-b border-gray-200 bg-white text-xl'>"+tabjson[0].HUMIDITY+"</td>";
        //     tab1_html += "          <td class='px-5 py-5 border-b border-gray-200 bg-white text-xl'>"+tabjson[0].TOTAL_WEIGHT+"</td>";
        //     tab1_html += "          <td class='px-5 py-5 border-b border-gray-200 bg-white text-xl'>"+tabjson[0].START_TIME+"</td>";
        //     tab1_html += "      </tr>";
        //     tab1_html += "  </tbody>";
        //     tab1_html += "</table>";
        //     tab1_html += "</div>";

        
        $("#tab1").html(tabjson);

        // w2ui['main_layout'].load('tab1', 'http://1.234.51.110:8000/test/?driver='+mainJson.DRIVER+'&date='+mainJson.DATE+'&type='+mainJson.TYPE);
        // w2ui['main_layout'].load('tabs', 'http://1.234.51.110:8000/test/?driver='+mainJson.DRIVER+'&date='+mainJson.DATE+'&type='+mainJson.TYPE, 'slide-left', function () {
        //     console.log('content loaded');
        // });

    });
 }
 

var config = {
    tabs: {
        name: 'tabs',
        active: 'tab1',
        tabs: [
            { id: 'tab1', text: 'Tab 1' },
            { id: 'tab2', text: 'Tab 2' },
            { id: 'tab3', text: 'Tab 3' },
        ],
        onClick: function (event) {
            $('#tab_example .tab').hide();
            $('#tab_example #' + event.target).show();
        }
    }
}




// 레이아웃
$(function () {
    var pstyle = 'border: 1px solid #dfdfdf;';
    var main_layout = $('#main_layout').w2layout({
        name: 'main_layout',
        padding: 4,
        panels: [
            { type: 'top', size: '70px', style: pstyle, content: header },
            { type: 'left', size: '20%', resizable: true, style: pstyle, content: sidebar },
            { type: 'main', style: pstyle, content: mainGrid },
            { type: 'preview', size: '50%', resizable: true, style: pstyle, content: tab_example }
        ]
    });
});

window.preview_load = function () {

}

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


function login_popup(){
    var url = "login.html";
    var name = "Login Form";
    var option = "width = 600, height = 700, top = 100, left = 200, location = no"
    window.open(url, name, option);
}