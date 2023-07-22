const Account = require("../models/account");
const User = require('../models/user');
const UserSkill = require('../models/userSkill');
const Skill = require('../models/skill');
const Interest = require('../models/interest');
const UserInterest = require('../models/userInterest');

const UserProgramme = require('../models/userProgramme');
const Programme = require('../models/programme');
const { Op } = require("sequelize");
const { getPagination, getPagingData } = require('./programmeController');

const { generateAccessToken } = require('./accountController');

function updateJWT(getUserObj) {
  try {
    const accessToken = generateAccessToken(getUserObj);

    return accessToken;

  } catch (err) {
    return err;
  }
}

const updateUser = async (req, res) => {
    const account = req.account;

    try {
        //Filtering out each Object so that they == to the email.

        // const filteredObject = Object.fromEntries(Object.entries(storeUserObj).filter(([key, value]) => value === req.user.email));
        // const filteredJsonString = JSON.stringify(filteredObject); // Stringify the filtered object        
        
        const getUserID = req.params.id;
        const getUserObj = await User.findOne({ where: { user_id : getUserID }, raw: true });

        //Ensure that the current user is authorised to update details
        if (account.account_id !== getUserObj.account_id) {
          return res.status(403).json({ message: "Not authorised!" });
        }

        if (req.body === undefined || Object.keys(req.body).length === 0) {
          return res.status(400).json({ message: "Fields are empty."});
        }

        const email = req.body.email;
        const name = req.body.name;
        const contact = req.body.contact_no;
        const teleUsername = req.body.telegram_username;

        await User.update(
          { telegram_username: teleUsername },
          { where: { user_id : getUserID }} );

        //Update function
        await Account.update(
          { email: email, name: name, contact_no: contact },
          { where: { account_id: getUserObj.account_id }} )

        const accessToken = updateJWT(getUserObj);
        return res.status(200).json({ message: "Successfully updated!", accessToken });
        
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err });
    }
}

const getUser = async (req, res) => {
    const id = req.params.id;

    try {
      const user = await User.findOne(
        { where: { user_id: id }, 
        include: [
          {
            model: Account,
            attributes: {
              exclude: ['password', 'account_id', 'json_tokenID'], // Exclude the 'password','json_tokenID' and 'account_id' field from the Account model
            },
          }
        ], raw: true });

      console.log(user);

      if (!user) {
        return res.status(404).json({ message: 'User not found!' })
      }

      return res.status(200).json({ user });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: err });
    }
}

const getAllProgByUserID = async (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);

  try {

    const account = req.account;
    const getUserID = req.params.id;

    const getUserObj = await User.findOne({ where: { user_id : getUserID }, raw: true });

    //Ensure that the current user is authorised to update details
    if (account.account_id !== getUserObj.account_id) {
      return res.status(403).json({ message: "Not authorised!" });
    }

    const getUserRole = req.body.role;

    //Returns array.
    const getUserProgObj = await UserProgramme.findAll({ where: { user_id : getUserID, role: getUserRole },
      raw: true });
      
    if (!getUserProgObj) {
      return res.status(400).json({ message: "User is not enrolled in any programme!" });
    }

    const arrIDs = [];
    getUserProgObj.forEach(obj => {
      arrIDs.push(obj.programme_id);
    })

    const conditions = { [Op.or]: [ { programme_id: arrIDs } ]};

    await Programme.findAndCountAll({ attributes: ['programme_id', 'name', 'description'
      , 'category', 'display_image'], where: conditions, limit, offset, raw: true })
      .then(data => {
        const response = getPagingData(data, (Number(page) + 1), limit);

        if (response.currentPage > response.totalPages) {
          return res.status(400).json({message: "Nothing to retrieve. Exceeded page request", response });
        }
      return res.status(200).json({message: "All programmes have been retrieved for User No: " + getUserID + ".", response }) 
      });
      
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err });
  }
}

const getUnsignedProg = async (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);

  try {
    var resp;

    const account = req.account;
    const getUserID = req.params.id;

    const getUserObj = await User.findOne({ where: { user_id : getUserID }, raw: true });

    //Ensure that the current user is authorised to update details
    if (account.account_id !== getUserObj.account_id) {
      return res.status(403).json({ message: "Not authorised!" });
    }

    //Returns array.
    const getUserProgObj = await UserProgramme.findAll({ where: { user_id : getUserID },
      raw: true });
    
    console.log(getUserProgObj);
      
    if (!getUserProgObj || getUserProgObj.length == 0) {
      await Programme.findAndCountAll({ attributes: ['programme_id', 'name', 'description'
        , 'category', 'display_image'], limit, offset, raw: true })
        .then(data => {
          const response = getPagingData(data, (Number(page) + 1), limit);
          resp = response;

          if (response.currentPage > response.totalPages) {
            return res.status(400).json({message: "Nothing to retrieve. Exceeded page request", response });
          }
        });
     
    } else {
      const arrIDs = [];
      getUserProgObj.forEach(obj => {
        arrIDs.push(obj.programme_id);
      })
      
      const conditions = { [Op.not]: [ { programme_id: arrIDs } ]};

      await Programme.findAndCountAll({ attributes: ['programme_id', 'name', 'description'
        , 'category', 'display_image'], where: conditions, limit, offset, raw: true })
        .then(data => {
          const response = getPagingData(data, (Number(page) + 1), limit);
          resp = response;

          if (response.currentPage > response.totalPages) {
            return res.status(400).json({message: "Nothing to retrieve. Exceeded page request", response });
          }
        });
    }

    return res.status(200).json({
      message: "All programmes that are not signed up have been retrieved for User No: " 
      + getUserID + ".", resp }) 
      
  } catch (err) {
    console.error(err);
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

module.exports = { updateUser, getUser, getAllProgByUserID, getUnsignedProg, getSkill, addSkill, addInterest, getInterest };