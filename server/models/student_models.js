import { model, Schema } from 'mongoose'

const StudentSchema = new Schema({
    student_id: {type: String, unique: true, required: true},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    userName: {type: String, required: true},
    department: {type: String, required: true},
})

module.exports = model("Student", StudentSchema)