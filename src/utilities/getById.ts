export const getById = <Type extends { id: string }>(
  id: string | null,
  array: Type[]
) => {
  const item = array.find((i) => i.id === id)
  if (!item) throw new Error("Failed to find by id: " + id)
  return item
}
