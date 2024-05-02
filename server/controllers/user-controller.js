const { MongoClient, ServerApiVersion } = require("mongodb");
const ApiError = require("../exceptions/api-error");
const teacherService = require("../service/teacher_service");
const studentService = require("../service/student_service");
const { validationResult, cookie } = require("express-validator");

const client = new MongoClient(process.env.DB_URL, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(
          ApiError.BadRequest("Ошибка при валидации", errors.array())
        );
      }
      const { role, userName, email, password, department, post } = req.body;

      if (role === "Студент") {
        const studentData = await studentService.registration(
          email,
          password,
          userName,
          department
        );
        return res.status(200).json(studentData);
      }

      if (role === "Преподаватель") {
        const teacherData = await teacherService.registration(
          email,
          password,
          userName,
          department,
          post
        );
        return res.status(200).json(teacherData);
      }
    } catch (e) {
      next(e);
    }
  }

  async getListOfUniver(req, res) {
    try {
      await client.connect();
      const db = client.db("University");
      const collection = db.collection("ListOfUniver");
      const universities = await collection.find().toArray();
      res.json(universities);
    } catch (error) {
      res.status(500).send("Internal Server Error");
    } finally {
      await client.close();
    }
  }
}

module.exports = new UserController();
