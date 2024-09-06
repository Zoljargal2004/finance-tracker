export const addRecord = async (
  name,
  amount,
  type,
  description,
  categoryID,
  date,
  time
) => {
  try {
    const res = fetch(`http://localhost:4000/record/add`, {
      method: "POST",
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify({
        name: name,
        amount: amount,
        type: type,
        description: description,
        categoryID: categoryID,
        date: date,
        time: time,
      }),
    });
  } catch (error) {
    console.log(error);
  }
};

export const getRecords = async (date) => {
  try {
    const res = await fetch(`http://localhost:4000/record/list`, {
      method: "GET",
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify({
        date: date,
      }),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
