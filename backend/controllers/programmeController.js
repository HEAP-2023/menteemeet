const Programme = require("../models/programme");
const awsS3Controller = require('./awsS3Controller');

// WIP
const addProg = async (req, res) => {
  const { name, description, category, programmeStart, programmeEnd, deadline, matching_criteria, skills } = req.body;
    console.log("sent to back")
    console.log(req.body);
  try {
    const newProg = await Programme.create({
      name, 
      description, 
      category,
      programmeStart,
      programmeEnd,
      deadline,
      matching_criteria,
      skills
    }, { raw: true })

    const uploadFile = await awsS3Controller.uploadToS3(req.file, newProg.programme_id);

    if (uploadFile) {
      const prog = await Programme.update({});
      console.log(uploadFile);
      return res.status(200).json({ message: 'Successfully created programme!' });
    }

    // //create forum
      // const newForum = await Forum.create({
  
    // })
  } catch(err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
}

const deleteProg = async (req, res) => {
    try {
        const deleteProgID = req.params.id;
        // console.log(deleteID);
        if (await Programme.destroy(
            { where: { programme_id: deleteProgID }} )) {
        };

        return res.status(200).json({ message: "Programme has been successfully deleted."})

    } catch (err) {
        return res.status(500).json({ error: err });
    }
}

module.exports = { addProg, deleteProg };
