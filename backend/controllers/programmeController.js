const Programme = require("../models/programme");
const Application = require("../models/application");

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
    Programme.findAndCountAll({ attributes: ['programme_id', 'name', 'description'
      , 'category', 'display_image'], limit, offset, raw: true })

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
    return res.status(500).json({ message: "Failed to fetch all appliations for the programme!" });
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

console.log("Day 1 keys: ", day1Keys);

    if (day1Keys[i] === day2Keys[i]) {

      const avail1 = dayOfAvail1[day1Keys[0]];
      const avail2 = dayOfAvail2[day2Keys[0]];

console.log("Hello?");
console.log(day1Keys[0]);

      // Check if the availability for the day of the week matches
      if (avail1.every((timeSlot) => avail2.includes(timeSlot))) {
        console.log("Pass");
        return res.status(200).json({ dayOfAvail1 }); // Availability for the day of the week doesn't match
      }
    }
  }

  return res.status(200).json({ message: "test" });

}

module.exports = { getEachProg, getAllProg, getPagination, getPagingData, getApplicationsByProgID, runAlgo };