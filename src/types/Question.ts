import { AnswerData } from "./Answer"
import { CategoryData } from "./Category"
import { UserLookupData } from "./User"

export type QuestionData = {
	id: string
	title: string
	description: string
	user_id: string
	created_at: Date
	updated_at: Date
	answered_at: Date

  answers: AnswerData[]
  categories: CategoryData[]

  user: UserLookupData
}

export type QuestionCreateData = {
	title: string,
	description: string,
	user_id: string
}