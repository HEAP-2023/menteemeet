const Programme = require("../models/programme");

const deleteProg = async (req, res) => {
    try {
        const deleteProgID = req.params.id;
        // console.log(deleteID);
        if (await Programme.destroy(
            { where: { programme_id: deleteProgID }} )) {
        };

        return res.status(200).json({ message: "Programme has been successfully deleted."})

    } catch (err) {
        return res.status(500).json({ error: err });
    }
}

module.exports = { deleteProg };
