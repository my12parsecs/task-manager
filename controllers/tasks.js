const Task = require("../models/Task");








const getAllTasks = async (req, res) => {
  try {
    // findの中身が空だったらfind all documents
    const tasks = await Task.find({});

    // responseのバラエティ　色々自由にやってよいよ
    res.status(200).json({ tasks });
    // res.status(200).json({ tasks, amount: tasks.length });
    // res.status(200).json({ status: "success", data: {tasks, nbHits: tasks.length} });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    // res.send("create task")
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOne({ _id: taskID });
    if (!task) {
      // returnじゃないとあかんよ　返しは一つに
      return res.status(404).json({ msg: `No task with id : ${taskID}` });
      // correct syntax(桁数とか) but no item found
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
    // そもそも wrong syntax  ex.桁数足りない
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskID });
    if (!task) {
      // returnじゃないとあかんよ　返しは一つに
      return res.status(404).json({ msg: `No task with id : ${taskID}` });
      // correct syntax(桁数とか) but no item found
    }
    // paramsに一致するitemあったよ
    res.status(200).json({ task });
    // res.status(200).send()
    // res.status(200).json({ task: null, status: "success"})
  } catch (error) {
    // そもそもsyntax(桁数とか)が違う場合はこれ
    res.status(500).json({ msg: error });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    // findoneandupdateは三つ目の引数をすることで更新後の値が帰ってきて、schemaのvalidatorも機能する
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      // returnじゃないとあかんよ　返しは一つに
      return res.status(404).json({ msg: `No task with id : ${taskID}` });
      // correct syntax(桁数とか) but no item found
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

// updateTaskと同じことを、patchではなくputでやるとどうなるか、違いなど
// const editTask = async (req, res) => {
//   try {
//     const { id: taskID } = req.params;
//     // findoneandupdateは三つ目の引数をすることで更新後の値が帰ってきて、schemaのvalidatorも機能する
//     // overwriteは、reqでなんも書かなかったやつをデフォルトに ex. completedがtrue=>falseに
//     // overwriteはschemaでdefaultが指定されてなかったらそれ自体を消す
//     const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
//       new: true,
//       runValidators: true,
//       overwrite: true
//     });
//     if (!task) {
//       // returnじゃないとあかんよ　返しは一つに
//       return res.status(404).json({ msg: `No task with id : ${taskID}` });
//       // correct syntax(桁数とか) but no item found
//     }
//     res.status(200).json({ task });
//   } catch (error) {
//     res.status(500).json({ msg: error });
//   }
// };

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
