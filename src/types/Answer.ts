import { UserLookupData } from "./User"

export type AnswerData = {
	id: string
	answer: string,
	accepted: boolean,
	user_id: string,
	question_id: string,
	created_at: Date,
	updated_at: Date
}

export type AnswerCompleteData = {
	id: string
	answer: string,
	accepted: boolean,
	user_id: string,
	question_id: string,
	created_at: Date,
	updated_at: Date
	user: UserLookupData,
}