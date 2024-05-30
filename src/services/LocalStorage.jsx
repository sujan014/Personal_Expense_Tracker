// Keys
// NewEntry
// NetBalance
const NewEntry='NewEntry';
const NetBalance='NetBalance';
const NewCashFlow = (object) => {
    
    let t = object.date+','+object.category+','+object.item+','+object.amount;
    console.log(t);
    localStorage.setItem(NewEntry, t);
}

const GetCashFlows = () => {
    const t = JSON.parse(localStorage.getItem("NewEntry")) || [];
    t.forEach(element => {
        console.log(element);
    });
    return t;
}
export {NewCashFlow, GetCashFlows};