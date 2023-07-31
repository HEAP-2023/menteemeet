const Programme = require("../models/programme");
const Application = require("../models/application");
const {Op} = require('sequelize');
const Skill = require("../models/skill");
const Interest = require("../models/interest");
const UserProgramme = require("../models/userProgramme");

const getEachProg = async (req, res) => {
  try {
      const id = req.params.id;
      const programme = await Programme.findOne({ where: { programme_id: id }, raw: true });

      return res.status(200).json({ message: "Programme has been retrieved.", programme})

  } catch (err) {
      console.error(err);
      return res.status(500).json({ error: err, message : "Failed to retrieve programme" });
  }
}

// For all Programs - Pagination (Helper Method 1)
const getPagination = (page, size) => {
  const limit = size ? +size : 5;
  const offset = page ? (Number(page) - 1) * limit : 0;

  return { limit, offset };
};
//(Helper Method 2)
const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: programmes } = data;
  const currentPage = page ? +page : 0;

  var adjustedCurrentPage = 1;
  if (currentPage > 0) {
    adjustedCurrentPage = currentPage - 1; // Subtract 1 to match the specified URL page number
  }
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, programmes, totalPages, currentPage: adjustedCurrentPage };
};

const getAllProg = (req, res) => {
  //how to use this, put in the link --> Ex. http://localhost:5000/api/v1/programmes/?page=1&size=6
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);

  try {
    Programme.findAndCountAll({  limit, offset, raw: true })

      .then(data => {
        const response = getPagingData(data, (Number(page) + 1), limit);

        if (response.currentPage > response.totalPages) {
          return res.status(400).json({message: "Nothing to retrieve. Exceeded page request", response });
        }

        res.status(200).json({message: "All programmes have been retrieved.", response });
      })

    } catch (err) {
      console.error (err);
      return res.status(500).json({ error: err, message : "Failed to retrieve programmes" });
    }
}

const getApplicationsByProgID = async (req, res) => {
  const id = req.params.id;

  try {
    if (!await Programme.findOne({ where: { programme_id: id }})) {
      return res.status(400).json({ message: "Programme does not exist!" });
    }
    
    const applications = await Application.findAll({ where: { programme_id: id } });
    
    return res.status(200).json({ message: "All applications retrieved successfully!", applications });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to fetch all applications for the programme!" });
  }
};

const getMenteeApplicationsByProgId = async (req, res) => {
  const id = req.params.id;

  try {
    if (!await Programme.findOne({ where: { programme_id: id }})) {
      return res.status(400).json({ message: "Programme does not exist!" });
    }
    
    const applications = await Application.findAll({ where: { programme_id: id, role: "mentee" } });
    
    return res.status(200).json({ message: "All mentee applications retrieved successfully!", applications });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to fetch all mentee applications for the programme!" });
  }
};

const getMentorApplicationsByProgId = async (req, res) => {
  const id = req.params.id;

  try {
    if (!await Programme.findOne({ where: { programme_id: id }})) {
      return res.status(400).json({ message: "Programme does not exist!" });
    }
    
    const applications = await Application.findAll({ where: { programme_id: id, role: "mentor" } });
    
    return res.status(200).json({ message: "All mentor applications retrieved successfully!", applications });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to fetch all mentor applications for the programme!" });
  }
};

//Testing Only.
const runAlgo = async (req, res) => {

  //Application ID passed in
  const getAppID1 = req.body.appID1;
  const getAppID2 = req.body.appID2;


  const getAppObj1 = await Application.findOne({ where: { application_id: getAppID1 }, raw: true });
  const getAppObj2 = await Application.findOne({ where: { application_id: getAppID2 }, raw: true });


  const getAvail1 = JSON.parse(getAppObj1.availability);
  // const getSkills1 = getAppObj1.skills;
  // const getInterests1 = getAppObj1.interests;

  const getAvail2 = JSON.parse(getAppObj2.availability);
  // const getSkills2 = getAppObj2.skills;
  // const getInterests2 = getAppObj2.interests;

  console.log("Avail: ", getAvail1);
  // console.log("Skills: ", getSkills);
  // console.log("Interests: ", getInterests);
  console.log("Avail: ", getAvail2);

  console.log("Start");
  console.log(getAvail1[0]);
  console.log("End");

  if (getAvail1.length !== getAvail2.length) {
    console.log("false"); // If the schedules have different lengths, they don't match
    return res.status(404).json({ message: "Length False" });
  }

  for (let i = 0; i < getAvail1.length; i++) {
    const dayOfAvail1 = getAvail1[i];
    const dayOfAvail2 = getAvail2[i];

    const day1Keys = Object.keys(dayOfAvail1);
    const day2Keys = Object.keys(dayOfAvail2);

     // Check if the days of the week match
    if (day1Keys.length !== 1 || day2Keys.length !== 1) {
      console.log("false"); 
      return res.status(404).json({ message: "Days of the week don't match" }); // 
    }

    var avail1 = "";
    var avail2 = "";

    var isValid = false;

console.log("Day 1 keys: ", day1Keys);

    if (day1Keys[i] === day2Keys[i]) {
      console.log("TEST: ", dayOfAvail1.length);

      for (let l = 0; l < dayOfAvail1.length; l++) {

      }

      avail1 = dayOfAvail1[day1Keys[0]];
      avail2 = dayOfAvail2[day2Keys[0]];

      isValid = true;

console.log("Hello?");
console.log(day1Keys[0]);

    }

    if (isValid) {
      // Check if the availability for the day of the week matches
      if (avail1.every((timeSlot) => avail2.includes(timeSlot))) {
        console.log("Pass");
        return res.status(200).json({ dayOfAvail1 }); // Availability for the day of the week doesn't match
      }
    }
    
  }

  return res.status(200).json({ message: "test" });

}

const getAllSkills = async (req, res) => {
  try {
    const getSkillsObj = await Skill.findAll({ raw: true });
    return res.status(200).json({ getSkillsObj });
    
  } catch (err) {
    return res.status(500).json({ message: "Failed to fetch all skills!" });
  }
}

const getAllInterests = async (req, res) => {
  try {
    const getInterestsObj = await Interest.findAll({ raw: true });
    return res.status(200).json({ getInterestsObj });

  } catch (err) {
    return res.status(500).json({ message: "Failed to fetch all interests!" });
  }
}

const searchProgByName = async (req, res) => {
  const progName = req.params.name;
  try {
    const foundProgs = await Programme.findAll({
      where:{
        name:{
          [Op.substring]: progName,
        }
      },
    });
    console.log("debug found progs", foundProgs);
    return res.status(200).json(foundProgs);
  }catch(err){
    return res.status(500).json({message: "No Results Found"});
  }
}

const getAllMenteeByProgID = async (req, res) => {
  const id = req.params.id;

  const mentees = await UserProgramme.findAll({ where: { programme_id: id, role: "mentee" }, include: { 
    model: Application,
    attributes: ["availability", "skills", "interests"],
  },
    raw: true });

  return res.status(400).json({ mentees });
}

const scorer = async (req, res) => {
  const id = req.params.id;

  //Get all mentees for the programme
  const mentees = await UserProgramme.findAll({ where: { programme_id: id, role: "mentee" }, include: { 
    model: Application,
    attributes: ["availability", "skills", "interests"],
  },
    raw: true });
  //Get all mentors for the programme
  const mentors = await UserProgramme.findAll({ where: { programme_id: id, role: "mentor" }, include: { 
    model: Application,
    attributes: ["availability", "skills", "interests"],
  },
    raw: true });

    //Calculate the score for each mentee with all mentors
  const result = calculateOverallScore(mentees[0], mentors);

  return res.status(400).json({ result });
}

const calculateAvailabilityScore = (menteeAvailability, mentorAvailability) => {
  let availabilityScore = 0;

  for (const mentorDay of mentorAvailability) {
    for (const menteeDay of menteeAvailability) {
      if (Object.keys(mentorDay)[0] === Object.keys(menteeDay)[0]) {
        const mentorTimeSlots = mentorDay[Object.keys(mentorDay)[0]];
        const menteeTimeSlots = menteeDay[Object.keys(menteeDay)[0]];

        for (const mentorTimeSlot of mentorTimeSlots) {
          if (menteeTimeSlots.includes(mentorTimeSlot)) {
            // Increase the score if the mentor and mentee have availability on the same day and time slot
            availabilityScore += 1;
          }
        }
      }
    }
  }

  return availabilityScore;
}

const calculateSkillScore = (menteeSkill, mentorSkill) => {
  let skillScore = 0;

  for (const mentorDay of mentorAvailability) {
    for (const menteeDay of menteeAvailability) {
      if (Object.keys(mentorDay)[0] === Object.keys(menteeDay)[0]) {
        const mentorTimeSlots = mentorDay[Object.keys(mentorDay)[0]];
        const menteeTimeSlots = menteeDay[Object.keys(menteeDay)[0]];

        for (const mentorTimeSlot of mentorTimeSlots) {
          if (menteeTimeSlots.includes(mentorTimeSlot)) {
            // Increase the score if the mentor and mentee have availability on the same day and time slot
            availabilityScore += 1;
          }
        }
      }
    }
  }

  return availabilityScore;
}

const calculateOverallScore = (mentee, mentors) => {

  const WEIGHT_AVAILABILITY = 0.6;
  const WEIGHT_SKILLS = 0.2;
  const WEIGHT_INTERESTS = 0.2;

  const score = {};

  const menteeAvailbility = JSON.parse(mentee["Application.availability"]);

  mentors.forEach(mentor => {
    console.log('mentee', mentee);
    console.log('mentor', mentor);
    const mentorAvailability = JSON.parse(mentor["Application.availability"]);
    const availabilityScore = Math.round(calculateAvailabilityScore(menteeAvailbility, mentorAvailability) / 21 * 100); //21 is the maximum score
    console.log(availabilityScore);
  })
}

module.exports = { getEachProg, getAllProg, getPagination, getPagingData, getApplicationsByProgID, 
  getMenteeApplicationsByProgId, getMentorApplicationsByProgId, runAlgo, getAllSkills, getAllInterests, searchProgByName, getAllMenteeByProgID, scorer };