const mongoose = require("mongoose")


// structure of data
// schemaで設定しなかったものを送っても無視されてdatabaseにはしまわれない
// nameやcompletedのあとのやつらはValidationで、、ルールを設定している
const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "must provide name"],
        trim: true, // spaceなくす
        maxlength: [20, "name cannot be more than 20 characters"]
    },
    completed: {
        type: Boolean,
        default: false
    }
})

// mongoose.modelには名前とschemaを受け渡す
module.exports = mongoose.model("Task", TaskSchema)