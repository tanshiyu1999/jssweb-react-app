export const addIndex = (objArr) => {
    let counter = 1;
    objArr.forEach(obj => {
        obj.id = counter
        counter++
    })
}