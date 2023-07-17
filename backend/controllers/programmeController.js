const Programme = require("../models/programme");
const awsS3Controller = require('./awsS3Controller');


const getEachProg = async (req, res) => {
  try {
      const getProgID = req.params.id;
      const getProgObj = await Programme.findOne({ where: { programme_id: getProgID }, raw: true });

      return res.status(200).json({ message: "Programme has been retrieved.", getProgObj})

  } catch (err) {
      return res.status(500).json({ error: err });
  }
}

const getAllProg = async (req, res) => {
  try {
      const getProgObj = await Programme.findAll({attributes: ['programme_id', 'name', 'description'
      , 'category', 'display_image'], raw: true });

      return res.status(200).json({ message: "All programmes have been retrieved.", getProgObj})

  } catch (err) {
      return res.status(500).json({ error: err });
  }
}


// WIP
const addProg = async (req, res) => {
  const { name, description, category, programmeStart, programmeEnd, deadline, matching_criteria, skills } = req.body;

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
        const getProgID = req.params.id;
    
        await Programme.destroy(
            { where: { programme_id: getProgID }} );

        return res.status(200).json({ message: "Programme has been successfully deleted."})

    } catch (err) {
        return res.status(500).json({ error: err });
    }
}

module.exports = { getEachProg, getAllProg, addProg, deleteProg };
