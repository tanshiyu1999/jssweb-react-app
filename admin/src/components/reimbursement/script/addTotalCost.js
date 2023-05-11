export const addTotalCost = (objArr) => {
    objArr.forEach(obj => {
        let totalCost = obj.reimbursement_quantity * obj.reimbursement_cost;
        obj.totalCost = totalCost;
    })
}