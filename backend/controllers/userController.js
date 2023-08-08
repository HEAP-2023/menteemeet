const Account = require("../models/account");
const User = require('../models/user');
const UserSkill = require('../models/userSkill');
const Skill = require('../models/skill');
const Interest = require('../models/interest');
const UserInterest = require('../models/userInterest');
const Application = require('../models/application');

const UserProgramme = require('../models/userProgramme');
const Programme = require('../models/programme');
const { Op } = require("sequelize");
const { getPagination, getPagingData } = require('./programmeController');

const { generateAccessToken } = require('./accountController');

const UserGroup = require("../models/userGroup");
const Session = require("../models/session");
const moment = require("moment-timezone");

const Review = require("../models/review");
const Organiser = require("../models/organiser");

const { checkCapacity } = require('./organiserController');
const OrganiserReview = require("../models/organiserReview");
const Announcement = require("../models/announcement");

const updateJWT = async (getObj) => {
  try {
    const accessToken = await generateAccessToken(getObj);

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
        if (req.body === undefined || Object.keys(req.body).length === 0) {
          return res.status(400).json({ message: "Error. Fields are empty."});
        }     
      
        // const getUserID = req.params.id;
        const getUserObj = await User.findOne({ where: { account_id : account.account_id }, raw: true });

        //Ensure that the current user is authorised to update details
        // if (account.account_id !== getUserObj.account_id) {
        //   return res.status(403).json({ message: "Not authorised!" });
        // }

        const email = req.body.email;
        const name = req.body.name;
        const contact = req.body.contact_no;

        const teleUsername = req.body.telegram_username;

        await Account.update(
          { email: email, name: name, contact_no: contact },
          { where: { account_id: getUserObj.account_id }} );

        const updatedAcc = await Account.findOne({ where: { account_id: getUserObj.account_id }, raw: true });
        const accessToken = await updateJWT(updatedAcc);

        await User.update(
          { telegram_username: teleUsername },
          { where: { account_id : account.account_id }} );

        return res.status(200).json({ message: "Successfully updated for all tables.", accessToken });
        
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
  // const { page, size } = req.query;
  // const { limit, offset } = getPagination(page, size);

  try {

    const account = req.account;
    // const getUserRole = req.params.role;

    const getUserObj = await User.findOne({ where: { account_id : account.account_id }, raw: true });

    //Ensure that the current user is authorised to update details
    // if (account.account_id !== getUserObj.account_id) {
    //   return res.status(403).json({ message: "Not authorised!" });
    // }

    //Returns array.
    const getUserProgObj = await User.findAll({ where: { user_id : getUserObj.user_id, /* role: getUserRole */ }, include: { model: Programme, required: true },
      raw: true });
    // console.log("getUserProgObj:", getUserProgObj);
      
    if (getUserProgObj.length === 0 || !getUserProgObj) {
      return res.status(200).json({ message: "User is not enrolled in any programme!" , getUserProgObj});
    }

    //bruce
    return res.status(200).json({ message: "Programmes retrieved", getUserProgObj });

    // const arrIDs = [];
    // getUserProgObj.forEach(obj => {
    //   arrIDs.push(obj.programme_id);
    // })

    // const conditions = { [Op.or]: [ { programme_id: arrIDs } ]};

    // await Programme.findAndCountAll({ attributes: ['programme_id', 'name', 'description'
    //   , 'category', 'display_image'], where: conditions, limit, offset, raw: true })
    //   .then(data => {
    //     const response = getPagingData(data, (Number(page) + 1), limit);

    //     if (response.currentPage > response.totalPages) {
    //       return res.status(400).json({message: "Nothing to retrieve. Exceeded page request", response });
    //     }
    //   return res.status(200).json({message: "All programmes have been retrieved for User No: " + getUserObj.user_id + ".", response }) 
    //   });
      
    //bruce
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
    const getUserObj = await User.findOne({ where: { account_id : account.account_id }, raw: true });

    //Returns array.
    const getUserProgObj = await UserProgramme.findAll({ where: { user_id : getUserObj.user_id },
      raw: true });
      
    if (!getUserProgObj || getUserProgObj.length == 0) {
      await Programme.findAndCountAll({ attributes: ['programme_id', 'name', 'description'
        , 'category', 'display_image'], limit, offset, raw: true })
        .then(data => {
          const response = getPagingData(data, (Number(page) + 1), limit);
          resp = response;

          if (response.currentPage > response.totalPages) {
            return res.status(200).json({message: "Nothing to retrieve. Exceeded page request", response });
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
            return res.status(200).json({message: "Nothing to retrieve. Exceeded page request", response });
          }
        });
    }

    return res.status(200).json({
      message: "All programmes that are not signed up have been retrieved for User No: " 
      + getUserObj.user_id + ".", resp }) 
      
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

const getAllSessions = async (req, res) => {
  try {
    const account = req.account;
    const getUser = await User.findOne({ 
      where: { account_id: account.account_id }, raw: true });
    console.log("getUser:", getUser);
    const userProgObj = await UserProgramme.findAll({
      where: { user_id: getUser.user_id }, raw: true });
    console.log("userProgObj:",userProgObj)
    let getGroup = null;
    let groupArray = [];

    for (const item of userProgObj) {
      const programmeId = item.programme_id;

      getGroup = await UserGroup.findOne({
        where: { programme_id: programmeId }, raw: true });

      if (getGroup !== null && getGroup !== undefined) {
        groupArray.push({...getGroup, role: item.role });
      }
    }
    // console.log(groupArray);

    if (!getGroup) {
      return res.status(404).json({ message: "Grouping does not exist for all sessions."});
    }
    
    const getAllSessions = await Session.findAll({
      where: { group_id: { [Op.in]: groupArray.map(group => group.group_id) }},
      raw: true
    })

    const sessionsWithRole = getAllSessions.map(session => {
      const matchingGroup = groupArray.find(group => group.group_id === session.group_id);
      if (matchingGroup) {
        return { ...session, role: matchingGroup.role, programme_id: matchingGroup.programme_id };
      }
      return session;
    });

    return res.status(200).json({ message: "Retrieved Sessions for Account: " + account.name, sessionsWithRole });
    
  } catch (err) {
    return res.status(500).json({ message: "Failed to find session!" });
  }
}

const getSessionsByProgID = async (req, res) => {
  try {
    const progID = req.params.progID;

    let groupArray = [];
    const getGroup = await UserGroup.findOne({
      where: { programme_id: progID }, raw: true });

    const userProgObj = await UserProgramme.findAll({
      where: { programme_id: progID }, raw: true });

    for (const item of userProgObj) {
      if (getGroup !== null && getGroup !== undefined) {
        groupArray.push({...getGroup, role: item.role });
      }
    }

    if (!getGroup) {
      return res.status(404).json({ message: "Grouping does not exist for programme ID: " + progID });
    }
    
    const getAllSessions = await Session.findAll({
      where: { group_id: { [Op.in]: groupArray.map(group => group.group_id) }},
      raw: true
    })

    const sessionsWithRole = getAllSessions.map(session => {
      const matchingGroup = groupArray.find(group => group.group_id === session.group_id);
      if (matchingGroup) {
        return { ...session, role: matchingGroup.role, group_no: matchingGroup.group_no };
      }
      return session;
    });

    return res.status(200).json({ message: "Retrieved Session By Programme ", sessionsWithRole });
    
  } catch (err) {
    return res.status(500).json({ message: "Failed to get session!" });
  }
}

const addSessionByGrpID = async (req, res) => {

  const progID = req.params.progID;
  try {
    const { date, startTime, endTime, topic, userRole, userID} = req.body;
    // Select all groups where programme ID = progID
    const allGroupsByProgID = await UserGroup.findAll({ where: { programme_id: progID }});

    // create a variable called groupNo
    let groupNo = -1;

    // For each group, parse the mentors list into JSON
    allGroupsByProgID.map(group => {
      const mentors = JSON.parse(group.mentors);

      // IF userID in the mentor list
      mentors.map(mentor => {
        if (mentor.id == userID) {
          groupNo = group.group_no;
        }
      });    
    });

    // If no group found, exit
    if (groupNo === -1) {
      return res.status(404).json({ error: `No group found for user ID ${userID}`});
    }

    if (userRole !== "mentor") {
      return res.status(403).json({ message: "Only mentors are allowed to add sessions."});
    }

    const getUserGroupObj = await UserGroup.findOne({ where: { group_no: groupNo, programme_id: progID }, raw: true });
    if (!getUserGroupObj) {
      return res.status(404).json({ message: "Group ID does not exist."});
    }

    const convertDate = moment.tz(date, "Asia/Singapore");

    await Session.create({
      date: convertDate,
      start_time: startTime,
      end_time: endTime,
      topic: topic,
      group_id: getUserGroupObj.group_id,
    })

    return res.status(201).json({ message: "Session successfully created." });

  } catch (err) {
    return res.status(500).json({ message: "Failed to add session!" });
  }
}

const updateSessionBySessionID = async (req, res) => {
  try {
    const { date, start_time, end_time, topic, group_id, session_id } = req.body;

    const getUserGroupObj = await UserGroup.findOne({ where: { group_id: group_id }, raw: true });
    if (!getUserGroupObj) {
      return res.status(404).json({ message: "Group ID does not exist."});
    }

    const convertDate = moment.tz(date, "Asia/Singapore");

    // console.log(group_id);

    await Session.update({
      date: convertDate,
      start_time: start_time,
      end_time: end_time,
      topic: topic,
      group_id: group_id
    }, { where: {session_id: session_id } })

    return res.status(201).json({ message: "Session successfully updated." });

  } catch (err) {
    return res.status(500).json({ message: "Failed to edit session!" });
  }
}

const deleteSessionBySessionID = async (req, res) => {
  try {
    //only mentor can delete. 
    const sessID = req.params.sessID;

    const getSessionObj = await Session.findOne({ where: { session_id: sessID }, raw: true});

    if (!getSessionObj) {
      return res.status(404).json({ message: "Session does not exist. "});
    }
    
    await Session.destroy({ where: { session_id: sessID }} );

    return res.status(200).json({ message: "Session has been successfully deleted."})

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err });
  }
}

const getApps = async (getUserObj, statusOfApp) => {

  const getAppObj = await Application.findAll({ where: { user_id: getUserObj.user_id, 
    is_accepted: statusOfApp }, 

    include: [
        {
          model: Programme,
          attributes: ["name"],
        }
      ]
});
  
  if (!getAppObj || getAppObj.length < 1) {
    return false;
  }

  let appArray = [];
  //can change to forEach.
  for (const item of getAppObj) {
    if (getAppObj !== null && getAppObj !== undefined) {
      appArray.push(item.toJSON());
    }
  }

  return appArray;
}

const getApprovedApps = async (req, res) => {

  try {
    const account = req.account;
    const getUserObj = await User.findOne({ where: { account_id: account.account_id }, raw: true });
    
    const pendingStatus = 1;
    const appArray = await getApps(getUserObj, pendingStatus);

    if (!appArray) {
      return res.status(200).json({ message: "Application does not exist.", appArray})
    }
    return res.status(200).json({ message: "Retrieved Approved Applications", appArray });
  } catch (err) {
    return res.status(500).json({ message: "Failed to get applications!" });
  }
}

const getPendingApps = async (req, res) => {
  try {
    const account = req.account;
    const getUserObj = await User.findOne({ where: { account_id: account.account_id }, raw: true });

    const pendingStatus = 0;
    const appArray = await getApps(getUserObj, pendingStatus);

    if (!appArray) {
      return res.status(200).json({ message: "Application does not exist.", appArray })
    }
    
    return res.status(200).json({ message: "Retrieved Pending Applications", appArray });
  } catch (err) {
    return res.status(500).json({ message: "Failed to get applications!" });
  }
}

const getRejectedApps = async (req, res) => {
  try {
    const account = req.account;
    const getUserObj = await User.findOne({ where: { account_id: account.account_id }, raw: true });

    const pendingStatus = 2;
    const appArray = await getApps(getUserObj, pendingStatus);

    if (!appArray) {
      return res.status(200).json({ message: "Application does not exist.", appArray})
    }
    
    return res.status(200).json({ message: "Retrieved Rejected Applications", appArray });
  } catch (err) {
    return res.status(500).json({ message: "Failed to get applications!" });
  }
}

const signup = async (req, res) => {
  const account = req.account;
  const user = await User.findOne({ where: { account_id: account.account_id } });
  
  if (!user) {
    return res.status(400).json({ message: "User does not exist!" });
  }

  const { availability, skills, interests, role, programmeID } = req.body;

  try {
    const date = new Date();
    const formattedDate = date.toISOString().slice(0, 10);

    const checkProgExist = await Programme.findOne({ where: { programme_id: programmeID }, raw: true });

    if (!checkProgExist || (formattedDate > checkProgExist.deadline)) {
      return res.status(400).json({ message: "Programme does not exist or has ended! You are too late." });
    }
    // console.log("programmeID: ", programmeID)

    const isCapacityMax = await checkCapacity(programmeID, role);
    if (isCapacityMax) {
      return res.status(200).json({ message: "[SYSTEM] Rejected. Application has max capacity." });
    }

    const newApplication = await Application.create({
      date: formattedDate,
      availability,
      skills,
      interests,
      role,
      programme_id: programmeID,
      is_accepted: 0,
      user_id: user.user_id
    }) 

    return res.status(201).json({ message: "Successfully signed up!", newApplication });
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: "Failed to create an application!" });
  }
}

const addFeedback = async (req, res) => {
  try {
    const account = req.account;

    const getUserObj = await User.findOne({ where: { account_id: account.account_id }, raw: true});
    const { rating, comment, receiverID, programmeID } = req.body;

    moment.tz.setDefault('Asia/Singapore');
    const createdDateTime = moment().format('YYYY-MM-DD HH:mm:ss');

    await Review.create({ 
      date: createdDateTime,
      rating: rating,
      comment: comment,
      receiver_id: receiverID,
      author_id: getUserObj.user_id,
      programme_id: programmeID,
    })

    return res.status(201).json({ message: "Reviews created."});
  } catch (err) {
    return res.status(500).json({ err });
  }
}

const getAllFeedback = async (req, res) => {
  try {
    const account = req.account;

    const getUserObj = await User.findOne({ where: { account_id: account.account_id }, raw: true});
    const getAllReviews = await Review.findAll({ where: { author_id: getUserObj.user_id }, raw: true});
    const getAllReviewsForOrg = await OrganiserReview.findAll({where: {author_id: getUserObj.user_id}})
    const reviewsInLocalTZ = getAllReviews.map(item => ({
      ...item,
      date: item.date.toLocaleString('en-SG', { timeZone: 'Asia/Singapore' }),
    }));

    const reviewsOrg = getAllReviewsForOrg.map(item => ({
      organiser_review_id: item.dataValues.organiser_review_id,
      date: item.date.toLocaleString('en-SG', { timeZone: 'Asia/Singapore' }),
      rating: item.dataValues.rating,
      comment: item.dataValues.comment,
      receiver_id: item.dataValues.receiver_id,
      author_id: item.dataValues.author_id,
      programme_id: item.dataValues.programme_id
    }));

    let feedbackArray = [];
    for (const item of reviewsInLocalTZ) {
      if (getAllReviews !== null && getAllReviews !== undefined) {
        feedbackArray.push(item);
      }
    }
    for (const item of reviewsOrg) {
      if(getAllReviewsForOrg !== null && getAllReviewsForOrg !== undefined){
        feedbackArray.push(item);
      }
    }

    return res.status(200).json({ message: "Reviews retrieved.", feedbackArray});
  } catch (err) {
    return res.status(500).json({ err });
  }
}

const getAllAnnouncements = async (req, res) => {
  try {

    const account = req.account;

    const getUserObj = await User.findOne({ where: {account_id: account.account_id}, raw: true});
    const getUserProgObj = await UserProgramme.findAll({ where: {user_id: getUserObj.user_id}, raw: true});

    const promiseAnnouncements = getUserProgObj.map(async (userProg) => {
      const getAllAnnouncement = Announcement.findAll({ where: {programme_id: userProg.programme_id}, raw: true });
      return getAllAnnouncement;
    })

    let getAnnouncementsArr = await Promise.all(promiseAnnouncements);
    getAnnouncementsArr = getAnnouncementsArr.flat(); 
    
    const modifiedAnnouncements = getAnnouncementsArr.map(announcement => {
      let updatedDate;
      let createdDate;
      
      if (announcement.updatedAt !== null) {
        updatedDate = announcement.updatedAt.toLocaleString('en-SG', { timeZone: 'Asia/Singapore' });
      } else {
        createdDate = announcement.createdAt.toLocaleString('en-SG', { timeZone: 'Asia/Singapore' });
      }
    
      return {
        ...announcement,
        createdAt: createdDate,
        updatedAt: updatedDate,
      };
    });

    return res.status(200).json({ message: "Retrieved all announcements for you.", modifiedAnnouncements });

  } catch (err) {
    return res.status(500).json({ err });
  }
}

const getOrganiserName = async (getProgID) => {
  const programmeObj = await Programme.findOne({ where: {programme_id: getProgID }, raw: true });
  const getOrganiser = await Organiser.findOne({ where: {organiser_id: programmeObj.organiser_id }, raw: true});
  const getAccount = await Account.findOne({ where: {account_id: getOrganiser.account_id}, raw: true});

  return getAccount.name;
}

const getListOfMentors = async (req, res) => {
  try {
    const getProgID = req.params.progID;
    const account = req.account;

    // This is the mentee
    const getUserObj = await User.findOne({ where: { account_id: account.account_id }, raw: true});

    // Get all groups
    const getAllGroups = await UserGroup.findAll({ where: { programme_id: getProgID }, raw: true});

    let mentorsToReturn = [];

    getAllGroups.map((group) => {

      // Idenitfy group that mentee is in
      const allMentees = JSON.parse(group['mentees']);

      // Retrieve the list of mentors
      allMentees.map(mentee => {
        if (mentee['id'] == getUserObj['user_id'])
          mentorsToReturn = JSON.parse(group['mentors']);
      })
    });

    return res.status(200).json(mentorsToReturn);   

  } catch (err) {
    return res.status(500).json({ err });
  }
}

const getListOfMentees = async (req, res) => {
  try {
    const getProgID = req.params.progID;
    const account = req.account;

    //mentor
    const getUserObj = await User.findOne({ where: { account_id: account.account_id }, raw: true});
    //get all groups under prog id
    const getAllGroups = await UserGroup.findAll({ where: { programme_id: getProgID }, raw: true});

    let menteesToReturn = [];

    getAllGroups.map((group) => {

      // Idenitfy group that mentor is in
      const allMentors = JSON.parse(group['mentors']);

      // Retrieve the list of mentees
      allMentors.map(mentor => {
        if (mentor['id'] == getUserObj['user_id'])
          menteesToReturn = JSON.parse(group['mentees']);
      })
    });
    // console.log("mentees to return:", menteesToReturn);
    return res.status(200).json(menteesToReturn);     

  } catch (err) {
    return res.status(500).json({ err });
  }
}

const deleteReview = async (req, res) => {
  try {
    const reviewID = req.params.reviewID;

    await Review.destroy(
      { where: { review_id: reviewID } });

    return res.status(200).json({ message: "Review has been successfully deleted." })

  } catch (err) {
    return res.status(500).json({ error: err });
  }
}

const deleteOrgReview = async (req, res) => {
  try {
    const reviewID = req.params.reviewID;

    const deletedRow = await OrganiserReview.destroy(
      { where: { organiser_review_id: reviewID } });


    return res.status(200).json({ message: "Organiser review has been successfully deleted." })

  } catch (err) {
    return res.status(500).json({ error: err });
  }
}
module.exports = { updateUser, getUser, getAllProgByUserID, getUnsignedProg, getSkill, 
  addSkill, addInterest, getInterest, getAllSessions, getSessionsByProgID, addSessionByGrpID, 
  updateSessionBySessionID, deleteSessionBySessionID, getPendingApps, getApprovedApps, getRejectedApps, 
  signup, addFeedback, getAllFeedback, getAllAnnouncements, getListOfMentors, getListOfMentees, getOrganiserName,
  deleteReview, deleteOrgReview };