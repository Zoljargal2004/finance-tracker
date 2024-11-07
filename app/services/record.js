import { backLink } from "./category";

export const addRecord = async (
  userid,
  name,
  amount,
  type,
  description,
  categoryID,
  date,
  time
) => {
  if (!userid) return [];
  try {
    const res = fetch(`${backLink}/record/add`, {
      method: "POST",
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify({
        userid: userid,
        name: name,
        amount: amount,
        type: type,
        description: description,
        categoryID: categoryID,
        date: date,
        time: time,
      }),
    });
  } catch (error) {}
};

export const getRecords = async (userid, date, category, type, min, max) => {
  if (!userid) return [];
  try {
    const res = await fetch(
      `${backLink}/record/list/?date=${date}&category=${category || ""}&type=${
        (type && type != "ALL" && type) || ""
      }&min=${min || ""}&max=${max || ""}&userid=${userid}`,
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

export const getAmount = async (userid, type, month) => {
  if (!userid) return [];
  try {
    const res = await fetch(
      `${backLink}/record/amount/?type=${type}&month=${month}&userid=${userid}`,
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

export const getRecordsGroupByCategory = async (userid) => {
  if (!userid) return [];
  try {
    const res = await fetch(
      `${backLink}/record/groupByCategory&userid=${userid}`
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Frontend error: ", error);
  }
};

export const getRecentRecords = async (userid, n) => {
  if (!userid) return [];
  try {
    const res = await fetch(
      `${backLink}/record/getRecent?number=${n}&userid=${userid}`
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Frontend Error : ", error);
  }
};

export const deleteRecord = async (id) => {
  try {
    const res = await fetch(`${backLink}/record/delete`, {
      method: "DELETE",
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify({
        id: id,
      }),
    });
  } catch (error) {
    console.error("Fetching error: ", error);
  }
};
