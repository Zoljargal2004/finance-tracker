export const addRecord = async (name, amount, type, description, categoryID, date, time) => {
  try{const res = fetch(`http://localhost:4000/record/add`, {
    method: "POST",
    headers: { "Content-type": "application/json; charset=UTF-8" },
    body: JSON.stringify({
      name: name,
      amount: amount,
      type: type,
      description: description,
      categoryID: categoryID,
      date: date,
      time: time
    }),
  });}
  catch(error){
    console.log(error)
  }
};


