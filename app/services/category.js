export async function postNewCat(name, icon, color) {
  if (name == "") {
    return 0;
  }
  await fetch(`http://localhost:4000/category/add`, {
    method: "POST",
    headers: { "Content-type": "application/json; charset=UTF-8" },
    body: JSON.stringify({
      name: name,
      icon_name: icon,
      color: color,
    }),
  });
};

export const fetchCategories = async (obj) => {
  const res = await fetch(`http://localhost:4000/category/list`, {
    method: "GET",
    headers: {'Content-type': 'application/json'}
});
const datas = await res.json()
  return datas
};

export const deleteCategories = async (id) => {
  const res = await fetch(`http://localhost:4000/category/delete`, {
    method: 'DELETE',
    headers: { "Content-type": "application/json; charset=UTF-8" },
    body: JSON.stringify(
      {
        id: id
      }
    )
  });
}