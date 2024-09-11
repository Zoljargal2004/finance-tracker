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

export const getRecords = async (date, category, type, min, max) => {
  try {
    const res = await fetch(
      `http://localhost:4000/record/list/?date=${date}&category=${
        category || ""
      }&type=${(type && type != "ALL" && type) || ""}&min=${min || ""}&max=${
        max || ""
      }`,
      {
        method: "GET",
        headers: { "Content-type": "application/json; charset=UTF-8" },
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("HERE IS THE PROB", error);
  }
};

export const getAmount = async (type) => {
  try {
    const res = await fetch(
      `http://localhost:4000/record/amount/?type=${type}`,
      {
        method: "GET",
        headers: { "Content-type": "application/json; charset=UTF-8" },
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Frontend error: ", error);
  }
};
