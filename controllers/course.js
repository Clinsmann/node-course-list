const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi');
const Course = require('../models/course');

router.get('/',async (req, res) => {
    try {
        const courses = await Course.find();
        res.render('course', {courses});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
});

router.get('/:id', getCourse, (req, res) => {
    res.render('view-course', {course: res.course});
});

router.post('/', async (req, res) => {
    const {error} = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    try {
        const newCourse = await (new Course(req.body)).save();
        res.status(201).json(newCourse);
    } catch (e) {
        res.status(400).json({message: e.message});
    }
});

router.get('/:id/update', getCourse, (req, res) => {
    res.render('update-course', {course: res.course});
});

router.patch('/:id', getCourse, async (req, res) => {
    const {error} = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    if (req.body.code != null) res.course.code = req.body.code;
    if (req.body.title != null) res.course.title = req.body.title;

    try {
        const updatedCourse = await res.course.save();
        res.json(updatedCourse);
    } catch (e) {
        res.status(400).json({message: e.message})
    }
});

router.delete('/:id', getCourse, async (req, res) => {
    try {
        res.course.remove();
        res.json({message: 'Deleted Subscriber'});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
});

async function getCourse(req, res, next) {
    let course;
    try {
        course = await Course.findById(req.params.id);
        if (!course) return res.status(404).json({message: "Cannot find product!"});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
    res.course = course;
    next()
}

function validateCourse(course) {
    const schema = Joi.object().keys({
        code: Joi.string().min(3).required(),
        title: Joi.string().min(5).required()
    });
    return Joi.validate(course, schema);
}

module.exports = router;