import request from 'superagent'

const rootUrl = '/api/v1'

export async function AddQuiz({
  quizName,
  isPublic,
}: {
  quizName: string
  isPublic: boolean
}) {
  try {
    const httpRequestObject = await request
      .post(`${rootUrl}/quizzes`)
      .send({ quizName, isPublic })

    const newQuizId = httpRequestObject.body
    return newQuizId
  } catch {
    return (error: Error) => {
      throw new Error(
        `An error occurred while adding the quiz: ${error.message}`
      )
    }
  }
}
