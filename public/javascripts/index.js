function execCopy(string) {
    let temp = document.createElement('div');

    temp.appendChild(document.createElement('pre')).textContent = string;

    let style = temp.style;
    style.position = 'fixed';
    style.left = '-100%';

    document.body.appendChild(temp);
    document.getSelection().selectAllChildren(temp);

    let result = document.execCommand('copy');

    return result;
}

let generate = document.getElementById('generate_report');
let copy = document.getElementById('copy_report');

generate.onclick = function generateWeeklyReport() {
    let weekName = [
        "(日)", "(月)", "(火)", "(水)", "(木)", "(金)", "(土)"
    ]
    const weeklyReport = document.getElementById('weekly_report');

    let output = "";
    const  beginDate = new Date(document.getElementById('begin_date').value);
    const  beginDay = beginDate.getDate();
    const  endDate = new Date(document.getElementById('end_date').value);
    const  endDay = endDate.getDate();

    output  = "お疲れ様です。\n";
    output += "\n"

    if (isFinite(beginDay) && isFinite(endDay)) {
        let period = (beginDate.getMonth() + 1) + "/" + beginDay + weekName[beginDate.getDay()] + "～";
        if (beginDate.getMonth() !== endDate.getMonth()) {
            period += (endDate.getMonth() + 1) + "/";
        }
        period += endDay + weekName[endDate.getDay()];

        output += period + "の勤怠報告です。\n"
        output += "\n";

        daysNum = Math.ceil((endDate - beginDate) / 86400000); // 86,400,000ms = 1day
        let writeDate = beginDate;
        for (let i = 0; i <= daysNum; i++) {
            output += writeDate.getDate() + "日" + weekName[writeDate.getDay()];
            output += " 9:00 - 18:00\n"

            writeDate.setDate(writeDate.getDate() + 1)
        }
    }

    output += "\n";
    output += "以上です。よろしくお願いします。"

    weeklyReport.value = output
}

copy.onclick = function copyWeeklyReport() {
    let weeklyReport = document.getElementById('weekly_report');

    if(!execCopy(weeklyReport.value)) {
        alert('警告: このブラウザでは対応していません');
    }
}

