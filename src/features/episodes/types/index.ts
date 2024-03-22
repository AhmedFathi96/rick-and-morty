import { ICharacter } from "../../characters/types"

export interface IEpisode {
	id: number
	name: string
	air_date: string
	episode: string
	characters: ICharacter[]
	actions?: string
}
