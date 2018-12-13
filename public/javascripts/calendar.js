window.onload = function() {
    // Get current year and month
    var current = new Date();
    var year = current.getFullYear();
    var month = current.getMonth() + 1;

    // Show the calendar
    var wrapper = document.getElementById('calendar');
    add_calendar(wrapper, year, month);
}

/**
 * Show the calendar with specified date
 * @param {object} wrapper - The parent element to add calendar
 * @param {number} year    - Assign the year
 * @param {number} month   - Assign the month
 */
function add_calendar(wrapper, year, month) {
    // Delete the calendar if it has been added
    wrapper.textContent = null;

    // Get content displayed on the calendar
    var headData = generate_calendar_header(wrapper, year, month);
    var bodyData = generate_month_calendar(year, month);

    // Add the calendar element
    wrapper.appendChild(headData);
    wrapper.appendChild(bodyData);
}

/**
 * Generate the calendar header with specified date
 * @param {object} wrapper - The parent element to add calendar
 * @param {number} year    - Assign the year
 * @param {number} month   - Assign the month
 */
function generate_calendar_header(wrapper, year, month) {
    // Get the previous month and the next month
    var nextMonth = new Date(year, (month - 1));
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    var prevMonth = new Date(year, (month - 1));
    prevMonth.setMonth(prevMonth.getMonth() - 1);

    // Header element
    var cHeader = document.createElement('div');
    cHeader.className = 'calendar-header';

    // Add title
    var cTitle = document.createElement('div');
    cTitle.className = 'calendar-header__title';
    var cTitleText = document.createTextNode(year + '年' + month + '月');
    cTitle.appendChild(cTitleText);
    cHeader.appendChild(cTitle);

    // Add the previous month button
    var cPrev = document.createElement('button');
    cPrev.className = 'calendar-header__prev';
    var cPrevText = document.createTextNode('prev');
    cPrev.appendChild(cPrevText);
    // Set event when clicking the previous month button
    cPrev.addEventListener('click', function() {
        add_calendar(wrapper, prevMonth.getFullYear(), prevMonth.getMonth() + 1);
    }, false);
    cHeader.appendChild(cPrev);

    // Add the next month button
    var cNext = document.createElement('button');
    cNext.className = 'calendar-header__next';
    var cNextText = document.createTextNode('next');
    cNext.appendChild(cNextText);
    // Set event when clicking the nextious month button
    cNext.addEventListener('click', function() {
        add_calendar(wrapper, nextMonth.getFullYear(), nextMonth.getMonth() + 1);
    }, false);
    cHeader.appendChild(cNext);

    return cHeader;
}

/**
 * Generate the calendar element with specified date
 * @param {number} year    - Assign the year
 * @param {number} month   - Assign the month
 */
function generate_month_calendar(year, month) {
    var weekdayData = ['日', '月', '火', '水', '木', '金', '土'];
    // Get the calendar data
    var calendarData = get_month_calendar(year, month);

    var i = calendarData[0]['weekday']; // Get the day of the week on the first day
    // Fill top of the calendar before the first day
    while(i > 0) {
        i--;
        calendarData.unshift({
            day: '',
            weekday: i
        });
    }
    var i = calendarData[calendarData.length - 1]['weekday']; // Get the day of the week on the last day
    // Fill bottom of the calendar after the last day
    while(i < 6) {
        i++;
        calendarData.push({
            day: '',
            weekday: i
        });
    }

    // Generate the calendar element
    var cTable = document.createElement('table');
    cTable.className = 'calendar-table';

    var insertData = '';
    // Generate the part of the week
    insertData += '<thead>';
    insertData += '<tr>';
    for (var i = 0; i < weekdayData.length; i++) {
        insertData += '<th>';
        insertData += weekdayData[i];
        insertData += '</th>';
    }
    insertData += '</tr>';
    insertData += '</thead>';

    // Generate the part of the days
    insertData += '<tbody>';
    for (var i = 0; i < calendarData.length; i++) {
        if (calendarData[i]['weekday'] <= 0) {
            insertData += '<tr>';
        }
        insertData += '<td>';
        insertData += calendarData[i]['day'];
        insertData += '</td>';
        if (calendarData[i]['weekday'] >= 6) {
            insertData += '</tr>';
        }
    }
    insertData += '</tbody>';

    cTable.innerHTML = insertData;
    return cTable;
}

/**
 * Get the calendar data with specified date
 * @param {number} year    - Assign the year
 * @param {number} month   - Assign the month
 */
function get_month_calendar(year, month) {
    var firstDate = new Date(year, (month - 1), 1);
    var lastDay = new Date(year, (firstDate.getMonth() + 1), 0).getDate();
    var weekday = firstDate.getDay();

    var calendarData = []; // Initialize the calendar data
    var weekdayCount = weekday;
    for (var i = 0; i < lastDay; i++) {
        calendarData[i] = {
            day: i + 1,
            weekday: weekdayCount
        }
        // Return to 0(Sunday) after counting until 6(Saturday)
        if (weekdayCount >= 6) {
            weekdayCount = 0;
        } else {
            weekdayCount++;
        }
    }

    return calendarData;
}
