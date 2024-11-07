export const backLink = "http://localhost:4000";

export async function postNewCat(userId, name, icon, color) {
  if (name == "") {
    return 0;
  }
  await fetch(`${backLink}/category/add`, {
    method: "POST",
    headers: { "Content-type": "application/json; charset=UTF-8" },
    body: JSON.stringify({
      userId: userId,
      name: name,
      icon_name: icon,
      color: color,
    }),
  });
}

export const fetchCategories = async (userId) => {
  try {
    const res = await fetch(`${backLink}/category/list?userId=${userId}`, {
      method: "GET",
      headers: { "Content-type": "application/json" },
    });
    const datas = await res.json();
    return datas;
  } catch (e) {
    console.error("fetch category error ", e);
    return [];
  }
};

export const deleteCategories = async (id) => {
  const res = await fetch(`${backLink}/category/delete`, {
    method: "DELETE",
    headers: { "Content-type": "application/json; charset=UTF-8" },
    body: JSON.stringify({
      id: id,
    }),
  });
};

export const editCategory = async (id, newName, newIconName, newColor) => {
  const res = await fetch(`${backLink}/category/edit`, {
    method: "PUT",
    headers: { "Content-type": "application/json; charset=UTF-8" },
    body: JSON.stringify({
      id: id,
      name: newName,
      icon_name: newIconName,
      color: newColor,
    }),
  });
};
