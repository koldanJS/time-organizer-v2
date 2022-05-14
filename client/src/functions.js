export const msPerDay = 1000*3600*24
export const msPerMin = 1000*60

export const stopTracking = (dayItems, activeItem) => {
    const { startTime, itemIndex } = activeItem
    const addition = Math.round( (Date.now() - startTime) / msPerMin )
    const newDayItems = dayItems.map((item, index) => {
        if (itemIndex === index) return {...item, totalTime: item.totalTime + addition}
        return item
    })
    return newDayItems
}

export const getNewActiveItem = (newItemIndex) => {
    return {
        itemIndex: newItemIndex,
        dateString: getDateString(),
    }
}

export const getAdditionTime = (activeItem) => {
    if (!activeItem) return 0   // Без активной записи не будет добавочного времени
    return Math.round( (Date.now() - activeItem.startTime) / msPerMin )
}

export const getOffset = (dateString) => {
    const selectedDate = new Date(dateString)
    const today = new Date(getDateString())
    return Math.round((selectedDate - today) / msPerDay)
}

export const getDatePeriod = (dateString) => {
    const currentOffset = getOffset(dateString)
    const weekRange = getRange(currentOffset)  //Диапазон смещений для [Пн, Вс] в выбранной неделе
    const offsetRange = [weekRange[0] + currentOffset, weekRange[1] + currentOffset]  //Диапазон смещений для [Пн, Вс] относительно сегодня

    const fromDate = getDate(offsetRange[0])
    const toDate = getDate(offsetRange[1])

    const fromString = `${fromDate.dayOfMonth} ${fromDate.monthDayShort} ${fromDate.year}`
    const toString = `${toDate.dayOfMonth} ${toDate.monthDayShort} ${toDate.year}`
    const datePeriod = fromString + ' - ' + toString
    return datePeriod
}

export const  getNow = (offset) => offset ? (new Date(Date.now() + offset*msPerDay)) : new Date()

export const getDayNumber = (offset) => {
    const now = getNow(offset)
    return now.getDay() ? (now.getDay() - 1) : 6
}

export const getDateString = (offset, timePoint = null) => {
    let now = getNow(offset)
    if (timePoint) now = new Date(timePoint)
    return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`
}

export const getDate = (offset) => {
    const shortDays = [
        'Пн',
        'Вт',
        'Ср',
        'Чт',
        'Пт',
        'Сб',
        'Вс'
    ]
    const days = [
        'Понедельник',
        'Вторник',
        'Среда',
        'Четверг',
        'Пятница',
        'Суббота',
        'Воскресенье'
    ]
    const monthDay = [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь'
    ]
    const monthDayShort = [
        'Янв',
        'Сен',
        'Мар',
        'Апр',
        'Май',
        'Июн',
        'Июл',
        'Авг',
        'Сен',
        'Окт',
        'Ноя',
        'Дек'
    ]
    const now = getNow(offset)
    return {
        dateString: getDateString(offset),
        year: now.getFullYear(),
        month: now.getMonth() + 1,
        monthDay: monthDay[now.getMonth()],
        monthDayShort: monthDayShort[now.getMonth()],
        dayOfMonth: now.getDate(),
        dayNumber: getDayNumber(offset),
        day: days[getDayNumber(offset)],
        dayShort: shortDays[getDayNumber(offset)],
        localDay: offset ? `${days[getDayNumber(offset)]},` : 'Сегодня:'
    }
}

export const getRange = (offset) => {
    const dayNumber = getDayNumber(offset)
    return [
        -dayNumber, // Смещение от текущего дня к понедельнику
        6 - dayNumber // Смещение от текущего дня к воскресенью
    ]
}

export const getSelectedWeek = (offset) => {
    const range = getRange(offset)
    const selectedWeek = []
    for (let rangeOffset = range[0]; rangeOffset <= range[1]; rangeOffset++) {
        selectedWeek.push(getDateString(offset + rangeOffset))
    }
    return selectedWeek
}

export const getTotalTime = (day) => {
    const totalTime = day.items.reduce((total, item) => total += item.totalTime, 0)
    return totalTime
}

export const getFormatTime = (time, format = 'hh:mm') => {
    const hours = Math.floor(time/60)
    let minutes = time - hours*60
    if (minutes < 10) minutes = '0' + minutes
    const formatTime = format
        .replace('hh', hours)
        .replace('mm', minutes)
    return formatTime
}
export const getTimeNumber = (timeString) => {
    if (timeString.indexOf(':') === -1) return Number(timeString)*60
    const [ hours, minutes ] = timeString.split(':')
    return Number(hours)*60 + Number(minutes)
}
export const controlTime = (timeString) => {
    switch (timeString.length) {
        case 0: return true
        case 1: return timeString.search(/^[0-9]$/) + 1
        case 2: return timeString.search(/^(([0-1]?[0-9]|2[0-3])|([0-9]:))$/) + 1
        case 3: return timeString.search(/^(([0-1]?[0-9]|2[0-3]):|([0-9]:[0-9]))$/) + 1
        case 4: return timeString.search(/^(([0-1]?[0-9]|2[0-3]):[0-9]|([0-9]:[0-5][0-9]))$/) + 1
        case 5: return timeString.search(/^(([0,1][0-9])|(2[0-3])):[0-5][0-9]$/) + 1
        default: return false
    }
}