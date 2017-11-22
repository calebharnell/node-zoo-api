const express = require('express')
const SeaAnimal = require('../models/sea-animal')

const router = express.Router()

function validateFound(animal) {
  if (animal == null) {
    const error = new Error('Sea Animal not found') // Error with message
    error.status = 404 // Store status for res.status() to use
    throw error
  }
}

router.get('/sea-animals', (req, res) => {
  const query = req.query.q || ''
  let seaAnimals
  if (query) {
    seaAnimals = SeaAnimal.search(query)
  }
  else {
    seaAnimals = SeaAnimal.all()
  }
  res.json(seaAnimals)
})

router.get('/sea-animals/:id', (req, res) => {
  const seaAnimal = SeaAnimal.find(req.params.id)
  validateFound(seaAnimal)
  res.json(seaAnimal)
})

router.post('/sea-animals', (req, res) => {
  const seaAnimal = SeaAnimal.create(req.body)
  res.status(201).json(seaAnimal)
})

router.patch('/sea-animals/:id', (req, res) => {
  const seaAnimal = SeaAnimal.findAndUpdate(req.params.id, req.body)
  validateFound(seaAnimal)
  res.json(seaAnimal)
})

router.delete('/sea-animals/:id', (req, res) => {
  const seaAnimal = SeaAnimal.destroy(req.params.id)
  validateFound(seaAnimal)
  res.json(seaAnimal)
})

module.exports = router
