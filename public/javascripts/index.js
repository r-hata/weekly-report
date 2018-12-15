function execCopy(string) {
    var temp = document.createElement('div');

    temp.appendChild(document.createElement('pre')).textContent = string;

    var style = temp.style;
    style.position = 'fixed';
    style.left = '-100%';

    document.body.appendChild(temp);
    document.getSelection().selectAllChildren(temp);

    var result = document.execCommand('copy');

    return result;
}

var generate = document.getElementById('generate_report');
var copy = document.getElementById('copy_report');

generate.onclick = function generateWeeklyReport() {
    const weekly_report = document.getElementById('weekly_report');

    var output = "";
    var begin_date = document.getElementById('begin_date').value;
    var begin_num = Number(begin_date.split('-')[2]);
    var end_date = document.getElementById('end_date').value;
    var end_num = Number(end_date.split('-')[2]);
    var period = ""

    output  = "お疲れ様です。\n";
    output += "\n"
    output += period + "の勤怠報告です。\n"
    output += "\n";
    output += "\n";
    output += "以上です。よろしくお願いします。"

    weekly_report.value = output
}

copy.onclick = function copyWeeklyReport() {
    var weekly_report = document.getElementById('weekly_report');

    if(!execCopy(weekly_report.value)) {
        alert('警告: このブラウザでは対応していません');
    }
    else {
        // Do nothing
    }
}

