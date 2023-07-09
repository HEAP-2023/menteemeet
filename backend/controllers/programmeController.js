const Programme = require("../models/programme");
const awsS3Controller = require('./awsS3Controller');

// WIP
const addProg = async (req, res) => {
  const id = req.params.id;
  const { name, description, category, capacity, matching_criteria, deadline, display_image  } = req.body;

  try {
    const uploadFile = awsS3Controller.uploadToS3(req, res);

    const newProg = await Programme.create({
      name, 
      description, 
      category, 
      capacity, 
      matching_criteria, 
      application_deadline: deadline, 
    }, { raw: true })

    //create forum
    const newForum = await Forum.create({

    })
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
