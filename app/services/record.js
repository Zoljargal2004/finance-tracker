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
    const res = fetch(
      `https://finance-tracker-service.onrender.com/record/add`,
      {
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
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const getRecords = async (date, category, type, min, max) => {
  try {
    const res = await fetch(
      `https://finance-tracker-service.onrender.com/record/list/?date=${date}&category=${
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

export const getAmount = async (type, month) => {
  try {
    const res = await fetch(
      `https://finance-tracker-service.onrender.com/record/amount/?type=${type}&month=${month}`,
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

export const getRecordsGroupByCategory = async () => {
  try {
    const res = await fetch(
      `https://finance-tracker-service.onrender.com/record/groupByCategory`
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Frontend error: ", error);
  }
};

export const getRecentRecords = async (n) => {
  try {
    const res = await fetch(
      `https://finance-tracker-service.onrender.com/record/getRecent?number=${n}`
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Frontend Error : ", error);
  }
};

export const deleteRecord = async (id) => {
  try {
    const res = await fetch(
      `https://finance-tracker-service.onrender.com/record/delete`,
      {
        method: "DELETE",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
          id: id,
        }),
      }
    );
  } catch (error) {
    console.error("Fetching error: ", error);
  }
};
