// 引入Icons 
export async function CreateIcIcon() {
  const data = Object.freeze(await fetch('/public/icons/icons-ic.json').then(r => r.json()))
  return data;
}
