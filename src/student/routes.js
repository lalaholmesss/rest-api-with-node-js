const { Router } = require('express');
const router = Router();

const controller = require('./controller');

router.get("/", controller.getStudents);
router.post("/", controller.addStudent);
router.get("/:id", controller.getStudentById);
router.delete("/:id", controller.deleteStudentById);
router.put("/:id", controller.updateStudent);

module.exports = router;