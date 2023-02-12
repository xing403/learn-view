
export async function CreateEpIcon() {
  const data = Object.freeze(await fetch('/public/icons/icons-ep.json').then(r => r.json()))
  return data
}
