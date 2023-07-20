const Account = require("../models/account");
const Organiser = require('../models/organiser');
const Programme = require('../models/programme');
const awsS3Controller = require('./awsS3Controller');

const { generateAccessToken, resetJWT } = require('./accountController');

const bcrypt = require("bcrypt");

const logoutOrg = async (req, res) => {
  try {

    const getOrgID = req.params.id;
    const getOrgObj = await Organiser.findOne({ where: { organiser_id : getOrgID }, raw: true });

    resetJWT(getOrgObj.account_id);

    return res.status(200).json({ message: "You have been successfully logged out!" });

  } catch (err) {
    return res.status(500).json({ error: err });
  }
}

function updateJWT(getOrgObj) {
  try {
    const accessToken = generateAccessToken(getOrgObj);

    return accessToken;

  } catch (err) {
    return err;
  }
}

const updateOrg = async (req, res) => {
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

        await Organiser.update(
          { description: description },
          { where: { organiser_id : getOrgID }} );

        //Update function
        await Account.update(
          { email: email, name: name, contact_no: contact }, 
          { where: { account_id: getOrgObj.account_id }} )
        
        //Update password
        const updatedPass = req.body.password;
        if (updatedPass != "" && updatedPass != null) {
          //Hash
          const salt = await bcrypt.genSalt();
          const hashedPass = await bcrypt.hash(updatedPass, salt);

          await Account.update(
            {   password: hashedPass }, 
            {   where: { account_id: getOrgObj.account_id }} )

          return res.status(200).json({message: "Successfully Updated! (PW)" });
        } 

        const getAccessToken = updateJWT(getOrgObj);
        return res.status(200).json({message: "Successfully Updated Including JWT!", getAccessToken });
        
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err });
    }
}

const getOrg = async (req, res) => {
    // const id = req.params.id;

    // try {
    //   const user = await User.findOne(
    //     { where: { user_id: id }, 
    //     include: [
    //       {
    //         model: Account,
    //         attributes: {
    //           exclude: ['password', 'account_id', 'json_tokenID'], // Exclude the 'password' and 'json_tokenID' field from the Account model
    //         },
    //       }
    //     ], raw: true });

    //   if (!user) {
    //     return res.status(404).json({ message: 'User not found!' })
    //   }

    //   return res.status(200).json({ user });
    // } catch (err) {
    //   console.log(err);
    //   return res.status(500).json({ error: err });
    // }
    return res.status(200).json({ message: "Not doing ANything. Wait for Axel's GET" });
}

const addProg = async (req, res) => {
  const organiser_id = req.params.id;
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

module.exports = { logoutOrg, updateOrg, getOrg, addProg };