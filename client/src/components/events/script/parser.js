export const dateDataToDate = (date) => {
    return date.slice(0,10).replaceAll("-", ".");
}


export const eventTypeParser = (eventStr) => {
    return eventStr.replaceAll(" ", "-").toLowerCase();
}

