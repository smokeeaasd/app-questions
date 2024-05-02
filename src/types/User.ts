export type UserData = {
	id: string
	name: string,
	email: string,
	password: string,
	created_at: Date,
	updated_at: Date
}

export type UserRegisterData = {
	email: string,
	name: string,
	password: string
}

export type UserLoginData = {
	email: string,
	password: string
}

export type UserLookupData = {
	id: string,
	name: string
}