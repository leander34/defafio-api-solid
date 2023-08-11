type Criterion<T> = {
  [P in keyof T]?: T[P] | null
}

export function filterPerts<T>(pets: T[], filters: Criterion<T>): T[] {
  return pets.filter((pet) => {
    for (const chave in filters) {
      if (
        filters[chave] !== null &&
        (pet[chave] === undefined || pet[chave] !== filters[chave])
      ) {
        return false
      }
    }
    return true
  })
}
