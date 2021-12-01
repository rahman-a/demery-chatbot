const defineWeekDay = (blocks, days) => {
    const weekDays = ['saturday', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday']
    let selectedDay = null 
    let prevDay = null
    const sortedDays = days.sort((a, b) => {
        a = weekDays.indexOf(a)
        b = weekDays.indexOf(b)
        return a < b ? -1 : 1
    })
    if(blocks.length > 1)  {
        for(let i = 0; i < blocks.length - 1; i++){
            if(blocks[i + 1].timedCreated > blocks[i].timedCreated) {
                prevDay = blocks[i + 1].day
            }
        } 
    } else {
        prevDay = blocks.length === 1 && blocks[0].day
    }
    const indexOfDay = weekDays.indexOf(prevDay)
    const beforeDays = weekDays.slice(0, indexOfDay)
    const afterDays = weekDays.slice(indexOfDay + 1, weekDays.length)
    for(let d in sortedDays) {
        if(afterDays.includes(sortedDays[d])){
            selectedDay = sortedDays[d] 
            break;
        }
    }
    if(selectedDay) return selectedDay
    
    for(let d in sortedDays) {
        if(beforeDays.includes(sortedDays[d])) {
            selectedDay = sortedDays[d]
            break;   
        }
    }
    return selectedDay
}

export {
    defineWeekDay
}
