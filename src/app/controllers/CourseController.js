const Course = require('../models/Course');
const { mongooseToObject } = require('../../util/mongoose');

class CourseController {
  //[GET] /course/:slug
  show(req, res, next) {
    Course.findOne({ slug: req.params.slug })
      .then((course) => {
        res.render('courses/show', { course: mongooseToObject(course) });
      })
      .catch(next);
  }

  //[GET] /course/create
  create(req, res, next) {
    res.render('courses/create');
  }

  //[GET] /course/:id/edit
  edit(req, res, next) {
    Course.findById(req.params.id)
      .then((course) =>
        res.render('courses/edit', {
          course: mongooseToObject(course),
        })
      )
      .catch(next);
  }

  //[PUT] /course/:id
  update(req, res, next) {
    Course.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect('/me/stored/courses'))
      .catch(next);
  }

  //[POST] /course/store
  store(req, res, next) {
    const formData = req.body;
    console.log(req.body);

    formData.image = `https://i.ytimg.com/vi/${formData.videoID}/hq720.jpg`;
    const course = new Course(formData);
    course
      .save()
      .then(() => res.redirect('/'))
      .catch((error) => {
        console.log(error);
      });
  }
}

module.exports = new CourseController();
