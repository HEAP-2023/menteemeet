const Account = require("../models/account");
const Organiser = require('../models/organiser');
const Programme = require('../models/programme');
const awsS3Controller = require('./awsS3Controller');
const bcrypt = require("bcrypt");
const { generateAccessToken } = require('./accountController');

function updateJWT(getOrgObj) {
  try {
    const accessToken = generateAccessToken(getOrgObj);

    return accessToken;

  } catch (err) {
    return err;
  }
}

const getOrg = async (req, res) => {
  const id = req.params.id;

  try {
    const organiser = await Organiser.findOne(
      { where: { organiser_id: id }, 
      include: [
        {
          model: Account,
          attributes: {
            exclude: ['password', 'account_id', 'json_tokenID'], // Exclude the 'password','json_tokenID' and 'account_id' field from the Account model
          },
        }
      ], raw: true });

    console.log(organiser);

    if (!organiser) {
      return res.status(404).json({ message: 'Organiser not found!' })
    }

    return res.status(200).json({ organiser });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err });
  }
}

const updateOrg = async (req, res) => {
    const account = req.account

    try {
        //Filtering out each Object so that they == to the email.

        // const filteredObject = Object.fromEntries(Object.entries(storeUserObj).filter(([key, value]) => value === req.user.email));
        // const filteredJsonString = JSON.stringify(filteredObject); // Stringify the filtered object

        if (req.body === undefined || Object.keys(req.body).length === 0) {
          return res.status(400).json({ message: "Fields are empty."});
        }

        const email = req.body.email;
        const name = req.body.name;
        const contact = req.body.contact_no;

        const description = req.body.description;

        const getOrgID = req.params.id;
        const getOrgObj = await Organiser.findOne({ where: { organiser_id : getOrgID }, raw: true });

        //Ensure that the current organiser is authorised to update details
        if (account.account_id !== getOrgObj.account_id) {
          return res.status(403).json({ message: "Not authorised!" })
        }

        await Organiser.update(
          { description: description },
          { where: { organiser_id : getOrgID }} );

        //Update function
        await Account.update(
          { email: email, name: name, contact_no: contact }, 
          { where: { account_id: getOrgObj.account_id }} )

        const accessToken = updateJWT(getOrgObj);
        return res.status(200).json({message: "Successfully updated!", accessToken });
        
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err });
    }
}

const addProg = async (req, res) => {
  const organiser_id = req.params.id;
  const { name, description, category, programmeStart, programmeEnd, menteeCapacity, mentorCapacity, deadline, matching_criteria, skills } = req.body;

  try {
    const newProg = await Programme.create({
      name, 
      description, 
      category,
      programmeStart,
      programmeEnd,
      menteeCapacity,
      mentorCapacity,
      deadline,
      matching_criteria,
      skills,
      organiser_id
    })

    const uploadFile = await awsS3Controller.uploadToS3(req.file, newProg.programme_id);

    if (uploadFile) {
      const prog = await Programme.update({ display_image: JSON.stringify(uploadFile) },{ where: { programme_id: newProg.programme_id } });
      const progToReturn = {
        ...newProg.dataValues,
        display_image: JSON.stringify(uploadFile)
      }
      return res.status(200).json({ message: 'Successfully created programme!', programme: progToReturn });
    } else {
      await Programme.destroy({ where: { programme_id: newProg.programme_id }});
      res.status(500).json({ message: 'Failed to upload display image!' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to create programme!" });
  }
}

module.exports = { getOrg, updateOrg, addProg };