export const addIndex = (objArr) => {
    let counter = 0;
    objArr.forEach(obj => {
        obj.id = counter
        counter++
    })
}