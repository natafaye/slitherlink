import { getById } from "./getById";
import { Line } from "./types";

export const getLinesWithFillValue = (
    fillValue: boolean | null, 
    lineIds: string[], 
    allLines: Line[]
) => lineIds
    .map(id => getById(id, allLines))
    .filter(line => line.filled === fillValue)
    .map(line => line.id)