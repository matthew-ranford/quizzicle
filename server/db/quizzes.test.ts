import {
  expect,
  it,
  describe,
  beforeAll,
  beforeEach,
  afterAll,
} from 'vitest'
import { getSingleQuizQuestions, addNewQuiz } from './quizzes'
import db from './connection'
import { QuestionData, QuestionSnakeCase } from '../../models/question'

beforeAll(() => {
  return db.migrate.latest()
})
beforeEach(() => {
  return db.seed.run()
})

describe('get of a quiz and all of its questions, questions pushed into an answers array', () => {
  it('gets data and returns the quizid', async () => {
    const mockQuizData = [
      {
        quiz_name: 'My First Quiz',
        quiz_id: 1,
        question_id: 1,
        question_text: 'Pretend this is a longer question?',
        answers: [
          'correct answer',
          'incorrect answer1',
          'incorrect answer2',
          'incorrect answer3',
        ],
      },
    ]

    const testQuizData = await getSingleQuizQuestions(1)
    console.log(testQuizData)
    expect(mockQuizData[0].quiz_id).toEqual(testQuizData[0].quizId)
  })

  it('is given an incorrect id, it doesnt get the data and returns an empty array', async () => {
    const mockQuizData = []
    const testQuizData = await getSingleQuizQuestions(8)
    expect(mockQuizData).toEqual(testQuizData)
  })
})

beforeAll(() => {
  return db.migrate.latest()
})
beforeEach(() => {
  return db.seed.run()
})

describe('addNewQuiz', () => {
  const quizData = {
    quizName: 'My First Quiz',
    lastUpdated: new Date(),
    isPublic: false,
  }

  it('adds a new row to the quizzes database', async () => {
    const newQuizId = await addNewQuiz(quizData)
    expect(newQuizId).toEqual([{ quiz_id: 4 }])
  })
})

afterAll(() => {
  return db.destroy()
})
