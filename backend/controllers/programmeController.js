const Programme = require("../models/programme");

const addProg = async (req, res) => {
  
}

const deleteProg = async (req, res) => {
    try {
        const deleteProgID = req.params.id;
        // console.log(deleteID);
        if (await Programme.destroy(
            //To change account_id to progID.
            {   where: { programme_id: deleteProgID }} )) {
        };

        return res.status(200).json({message: "Program has been successfully deleted."})

    } catch (err) {
        return res.status(500).json({ error: err });
    }
}

module.exports = { deleteProg };
