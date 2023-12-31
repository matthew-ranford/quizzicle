import express from 'express'
import * as db from '../db/quizzes.ts'

const router = express.Router()

// GET /api/v1/quizzes
router.get('/', async (req, res) => {
  try {
    const quizzes = await db.getQuizzes()
    res.json(quizzes)
  } catch (err) {
    res.status(500).send('Could not get Quizzes')
  }
})

router.get('/:quiz_id', async (req, res) => {
  const id = Number(req.params.quiz_id)

  try {
    const quizDBData = await db.getSingleQuizQuestions(id)
    const quizData = quizDBData.map((element) => {
      const revisedQuestion = { ...element, answers: [] }
      Object.keys(element).forEach((key) => {
        if (key.match('Answer')) {
          revisedQuestion.answers.push(element[key])
          delete revisedQuestion[key]
        }
      })
      return revisedQuestion
    })
    res.json(quizData)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Rats! Somthing went wrong!' })
  }
})

// POST /api/v1/quizzes
router.post('/', async (req: express.Request, res: express.Response) => {
  const { quizName, isPublic } = req.body
  const newQuizEntry = {
    quizName,
    lastUpdated: new Date(),
    isPublic,
  }
  try {
    const newQuizData = await db.addNewQuiz(newQuizEntry)

    const id = newQuizData[0].quiz_id
    res.status(200).json(id)
  } catch (error) {
    console.log(error)
    res.status(500).send('could not add new quiz')
  }
})

router.get('/name/:id', async (req, res) => {
  const quizId = Number(req.params.id)
  const response = await db.getQuizNameById(quizId)

  res.json(response)
})

export default router
