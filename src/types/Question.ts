import { AnswerCompleteData } from "./Answer"
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
}

export interface QuestionCompleteData {
  id: number
  title: string
  description: string
  user_id: number
  created_at: string
  updated_at: string
  answers: AnswerCompleteData[]
  categories: CategoryData[]
  user: UserLookupData
}