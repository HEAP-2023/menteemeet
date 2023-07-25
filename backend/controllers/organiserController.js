const Account = require("../models/account");
const Organiser = require('../models/organiser');
const Programme = require('../models/programme');
const Application = require('../models/application');

const UserProgramme = require('../models/userProgramme');

const awsS3Controller = require('./awsS3Controller');
const { Op } = require("sequelize");

const { generateAccessToken } = require('./accountController');
const { getPagination, getPagingData } = require('./programmeController');

const updateJWT = async (updatedAcc) => {
  try {
    const accessToken = await generateAccessToken(updatedAcc);

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
        if (req.body === undefined || Object.keys(req.body).length === 0) {
          return res.status(400).json({ message: "Fields are empty."});
        }

        if (account.account_type != "organiser") {
          return res.status(403).json({ message: "You are not an organiser." });
        } 

        const getOrgObj = await Organiser.findOne({ where: { account_id : getAccID }, raw: true });
        if (!getOrgObj) {
          return res.status(403).json({ message: "No such organiser." });
        }

        const email = req.body.email;
        const name = req.body.name;
        const contact = req.body.contact_no;

        const description = req.body.description;

        await Account.update(
          { email: email, name: name, contact_no: contact },
          { where: { account_id: getOrgObj.account_id }} );

        const updatedAcc = await Account.findOne({ where: { account_id: getOrgObj.account_id }, raw: true });
        const accessToken = await updateJWT(updatedAcc);

        await Organiser.update(
          { description: description },
          { where: { account_id : getOrgObj.account_id }} );

        //Ensure that the current organiser is authorised to update details
        // if (account.account_id !== getOrgObj.account_id) {
        //   return res.status(403).json({ message: "Not authorised!" })
        // }
        return res.status(200).json({ message: "Successfully updated for all tables!", accessToken });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err });
    }
}

const addProg = async (req, res) => {
  const account = req.account;

  // If account_type is not organiser, reject
  if (account.account_type != "organiser")
    return res.status(403).json({ message: "Not authorised! Only organisers can create programmes!" });

  // Retrieve organiser from organiser table
  const org = await Organiser.findOne({ where: { account_id: account.account_id } });

  // If no organiser found, it would mean that the jwt is for a user that doesn't exist
  if (!org)
    return res.status(403).json({ message: "Not authorised! Only organisers can create programmes!" });

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
      organiser_id: org.organiser_id
    })

    const uploadFile = await awsS3Controller.uploadToS3(req.file, newProg.programme_id);

    if (uploadFile) {
      const prog = await Programme.update({ display_image: JSON.stringify(uploadFile) },{ where: { programme_id: newProg.programme_id } });
      const progToReturn = {
        ...newProg.dataValues,
        display_image: JSON.stringify(uploadFile)
      }
      console.log("created programme but image failed")
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

const getAllProgsByOrgID = async (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);

  try {
    const account = req.account;

    const getOrgObj = await Organiser.findOne({ where: { account_id: account.account_id }, raw: true });

    //Returns array.
    const getOrgProgObj = await Programme.findAll({ where: { organiser_id : getOrgObj.organiser_id},
      raw: true });
      
    if (!getOrgProgObj) {
      return res.status(400).json({ message: "Organiser has not created any programmes." });
    }

    const ProgIDarr = [];
    getOrgProgObj.forEach(obj => {
      ProgIDarr.push(obj.programme_id);
    })

    const conditions = { [Op.or]: [ { programme_id: ProgIDarr } ]};

    await Programme.findAndCountAll({ attributes: ['programme_id', 'name', 'description'
      , 'category', 'display_image'], where: conditions, limit, offset, raw: true })
      .then(data => {
        const response = getPagingData(data, (Number(page) + 1), limit);

        if (response.currentPage > response.totalPages) {
          return res.status(400).json({message: "Nothing to retrieve. Exceeded page request", response });
        }
      return res.status(200).json({ message: "All programmes have been retrieved for Organiser No: " + getOrgObj.organiser_id + ".", response }) 
      });
      
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err });
  }
}

const evaluateApp = async (req, res) => {
  try {
    const account = req.account;
    if (account.account_type !== 'organiser') {
      return res.status(403).json({ message: "You are not allowed to view this page." });
    }

    const getAppID = req.params.appID;

    const getApplication = await Application.findOne({ where: { application_id: getAppID }, raw: true });
    if (!getApplication) {
      return res.status(404).json({ message: "Application not found!" });
    }

    const approval = req.body.approval;

    if ((approval > 1 || approval < 0) || (approval === undefined) || (approval === "") || (approval === null)) {
      return res.status(400).json({ message: "Approve Status Code is invalid." });
    }

    await Application.update({ is_accepted: approval }, { where: { application_id: getAppID }} );

    const getApp = await Application.findOne({ where: { application_id: getAppID }, raw: true });

    if (approval === 1) {
      await UserProgramme.create({ role: getApp.role, user_id: getApp.user_id, 
        programme_id: getApp.programme_id });
    } else {
      await UserProgramme.destroy({ where: { programme_id: getApp.programme_id } });
    }
    
    return res.status(200).json({ message: "Application and UserProgramme have been updated." });

  } catch (err) {
    return res.status(500).json({ error: err });
  }
}

const getApp = async (req, res) => {
  try {
    const account = req.account;
    if (account.account_type !== 'organiser') {
      return res.status(403).json({ message: "You are not allowed to view this page." });
    }

    const getProgID = req.params.progID;

    const getApplication = await Application.findOne({ where: { programme_id: getProgID }, raw: true });
    if (!getApplication) {
      return res.status(404).json({ message: "Programme not signed up by any application." });
    }

    return res.status(200).json({ message: "Application retrieved.", getApplication });

  } catch (err) {
    return res.status(500).json({ error: err });
  }
}

const deleteProg = async (req, res) => {

  const account = req.account;
  const id = req.params.id;
  const getProgID = req.params.progID

  const org = await Organiser.findOne({ where: { organiser_id: id } });

  //Ensure that the current organiser is authorised to update details
  if (account.account_id !== org.account_id) {
    return res.status(403).json({ message: "Not authorised!" })
  }

  try {
    await Programme.destroy(
          { where: { programme_id: getProgID }} );

    return res.status(200).json({ message: "Programme has been successfully deleted."})

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err });
  }
}

module.exports = { getOrg, updateOrg, addProg, getAllProgsByOrgID, evaluateApp, getApp, deleteProg };