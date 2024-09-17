export async function postNewCat(name, icon, color) {
  if (name == "") {
    return 0;
  }
  await fetch(`https://finance-tracker-service.onrender.com/category/add`, {
    method: "POST",
    headers: { "Content-type": "application/json; charset=UTF-8" },
    body: JSON.stringify({
      name: name,
      icon_name: icon,
      color: color,
    }),
  });
}

export const fetchCategories = async () => {
  const res = await fetch(
    `https://finance-tracker-service.onrender.com/category/list`,
    {
      method: "GET",
      headers: { "Content-type": "application/json" },
    }
  );
  const datas = await res.json();
  return datas;
};

export const deleteCategories = async (id) => {
  const res = await fetch(
    `https://finance-tracker-service.onrender.com/category/delete`,
    {
      method: "DELETE",
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify({
        id: id,
      }),
    }
  );
};

export const editCategory = async (id, newName, newIconName, newColor) => {
  const res = await fetch(
    `https://finance-tracker-service.onrender.com/category/edit`,
    {
      method: "PUT",
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify({
        id: id,
        name: newName,
        icon_name: newIconName,
        color: newColor,
      }),
    }
  );
};
