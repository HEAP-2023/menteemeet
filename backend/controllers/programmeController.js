const Programme = require("../models/programme");

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

module.exports = { getEachProg, getAllProg, getPagination, getPagingData };