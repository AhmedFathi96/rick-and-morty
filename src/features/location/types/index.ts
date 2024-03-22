import { ICharacter } from "../../characters/types"

export interface ILocation {
	id: number
	name: string
	type: string
	dimension: string
	residents: ICharacter[]
	actions?: string
}
