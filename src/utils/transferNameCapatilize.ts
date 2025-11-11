export function transferNameCapatilize(name: string): string {
  const [firstName, lastName] = name.split("_");
  return `${firstName[0].toLocaleUpperCase()}${firstName.slice(1)} ${lastName[0].toLocaleUpperCase()}${lastName.slice(1)}`
}