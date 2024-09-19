/**
 * Gets an item by its id
 * 
 * Errors out if there is no item with that id
 * 
 * @param id The id to get the item by
 * @param array The array to find the item in
 * @returns The item with that id
 */
export const getById = <Type extends { id: string }>(
  id: string | null,
  array: Type[]
) => {
  const item = array.find((i) => i.id === id)
  if (!item) throw new Error("Failed to find by id: " + id)
  return item
}

/**
 * Gets an item by its id
 * 
 * Returns null if the id is undefined or null
 * 
 * @param id The id to get the item by
 * @param array The array to find the item in
 * @returns The item with that id or null
 */
export const tryGetById = <Type extends { id: string }>(
  id: string | null | undefined,
  array: Type[]
) => {
  if(!id) return null
  return getById(id, array)
}
