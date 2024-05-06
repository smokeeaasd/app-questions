import { UserLookupData } from "./User"

export type AnswerSaveData = {
	answer: string,
	questionId: string
}

export type AnswerUpdateData = {
	answer: string,
	accepted: boolean,
	questionId: string,
}

export type AnswerData = {
	id: string
	answer: string,
	accepted: boolean,
	user_id: string,
	question_id: string,
	created_at: Date,
	updated_at: Date
	user: UserLookupData,
}