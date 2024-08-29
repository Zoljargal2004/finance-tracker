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

export const fetchCategories = async () => {
  const res = await fetch(`http://localhost:4000/category/list`, {
    method: "GET",
    headers: {'Content-type': 'application/json'}
});
  return res.json()
};

