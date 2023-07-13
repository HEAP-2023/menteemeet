const Account = require("../models/account");
const User = require('../models/user');
const UserSkill = require('../models/userSkill');
const Skill = require('../models/skill');
const Interest = require('../models/interest');
const UserInterest = require('../models/userInterest');

const bcrypt = require("bcrypt");
// const config = require('../utils/config');
// const jwt = require("jsonwebtoken");

const updateUser = async (req, res) => {
    try {
        //Filtering out each Object so that they == to the email.
        //req.user.email == JWT's Email
        // const filteredObject = Object.fromEntries(Object.entries(storeUserObj).filter(([key, value]) => value === req.user.email));
        // const filteredJsonString = JSON.stringify(filteredObject); // Stringify the filtered object

        //to get AccountID from the login data

        // const filteredObject = Object.fromEntries(Object.entries(storeUserObj).filter(([key, value]) => key === "account_id"));
        // const getCurrID = filteredObject.account_id;

        const email = req.body.email;
        const name = req.body.name;
        const contact = req.body.contact;
        const address = req.body.address;

        const getID = req.params.id;

        // console.log(email + " " + getID);
        if (email != "") {
          //Update function
          await Account.update(
          //Add-on when confirm
            {   email: email, contact_no : contact }, 
            {   where: { account_id: getID }} )
        }
        
        //Update password
        const updatedPass = req.body.password;

        if (updatedPass != "") {
          //Hash
          const salt = await bcrypt.genSalt();
          const hashedPass = await bcrypt.hash(updatedPass, salt);

          await Account.update(
            {   password: hashedPass }, 
            {   where: { account_id: getID }} )

          //to set JTI empty.
          await User.update(
            {   json_tokenID: "placeholder" }, 
            {   where: { user_id: getID }} )

        } 
        
        return res.status(200).json({message: "Successfully Authenticated & Updated! Please re-login." });
        
    } catch (err) {
        return res.status(500).json({ error: err });
    }
}

const getUser = async (req, res) => {
    const id = req.params.id;

    try {
      const user = await User.findOne({ where: { user_id: id }, include: { model: Account }, raw: true });

      if (!user) {
        return res.status(404).json({ message: 'User not found!' })
      }

      return res.status(200).json({ user });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: err });
    }
}

const getSkill = async (req, res) => {
  const id = req.params.id

  try {
    const user = await User.findOne({ where: { user_id: id }, raw: true });

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const userSkill = await User.findAll({ where: { user_id: id }, include: Skill, raw: true });

    const toReturn = userSkill.map(skill => {
      return {
        skill_id: skill['Skills.skill_id'],
        skill: skill['Skills.skill'],
        category: skill['Skills.category'],
      };
    })

    if (toReturn) {
      return res.status(200).json({ skills: toReturn });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err });
  }
}

const addSkill = async (req, res) => {
  const id = req.params.id;
  const { skills } = req.body;

  try {
    const user = await User.findOne({ where: { user_id: id }, raw: true });

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const data = skills.map(skill => {
      return { skill_id: skill, user_id: id };
    })
  
    const result = await UserSkill.bulkCreate(data, { raw: true });
  
    if (result) {
      return res.status(201).json({ message: "Successfully added user skills!" });
    }
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: "Failed to add user skills!" });
  }
}

const addInterest = async (req, res) => {
  const id = req.params.id;
  const { interests } = req.body;

  try {
    const user = await User.findOne({ where: { user_id: id }, raw: true });

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const data = interests.map(interest => {
      return { interest_id: interest, user_id: id };
    })
  
    const result = await UserInterest.bulkCreate(data, { raw: true });
  
    if (result) {
      return res.status(201).json({ message: "Successfully added user interests!" });
    }
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: "Failed to add user interests!" });
  }
}

const getInterest = async (req, res) => {
  const id = req.params.id

  try {
    const user = await User.findOne({ where: { user_id: id }, raw: true });

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const userInterest = await User.findAll({ where: { user_id: id }, include: Interest, raw: true });

    const toReturn = userInterest.map(interest => {
      return {
        interest_id: interest['Interests.interest_id'],
        interest: interest['Interests.interest'],
      };
    })

    if (toReturn) {
      return res.status(200).json({ interests: toReturn });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err });
  }
}

module.exports = { updateUser, getUser, getSkill, addSkill, addInterest, getInterest };