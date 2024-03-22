export interface ICharacter {
	id: number
	name: string
	species?: string
	origin?: IOrigin
	location?: ILocation
	actions?: string
}

interface IOrigin {
	id: number
	name: string
}

interface ILocation {
	id: number
	name: string
}
