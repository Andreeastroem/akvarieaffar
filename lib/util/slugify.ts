export function slugify(name: string) {
  console.log("name", name)
  const slug = name
    .trim()
    .replace(" ", "-")
    .toLowerCase()
    .replaceAll(new RegExp(/àáâæãāåä/g), "a")
    .replaceAll(new RegExp(/ôöòóœøōõ/g), "o")
    .replaceAll(new RegExp(/èéêëēėę/g), "e")
    .replaceAll(new RegExp(/[^a-zA-Z-]/g), "")

  return slug
}
