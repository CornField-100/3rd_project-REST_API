const db = require("../database.js")

exports.getAllUsers = function (req, res) {
	db.all("SELECT * FROM users", [], (err, rows) => {
		if (err) {
			res.status(500).json({ error: err.message })
		}
		{
			const updatedRows = rows.map((user) => ({
				...user,
				profileImg: `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}`,
			}))
			res.json(updatedRows)
		}
	})
}

exports.createNewUser = (req, res) => {
    const { firstName, lastName } = req.body;
    function isAlphanumeric(str) {
        const regex = /^[a-zA-Z0-9]+$/;
        return regex.test(str);
    }

    if (!firstName || !lastName ) 
        return res.status(400).json({ error: "The first name and last name is required!" });

    if (typeof firstName !== "string" || typeof lastName != "string")
        return res.status(400).json({ error: "That's a weird first or last name!" });

    if (!isAlphanumeric(firstName) || !isAlphanumeric(lastName))
        return res.status(400).json({ error: "That name is not allowed!" });

    db.run(
        "INSERT INTO users (firstName, lastName) VALUES (?, ?)",
        [firstName, lastName],
        function (err) {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.status(201).json({ id: this.lastID, firstName });
            }
        }
    )
}

// POST update a user based on its ID
exports.updateUser = (req, res) => {
	const { firstName, lastName } = req.body

	const userId = req.params.id

	let updateFields = []
	let queryParams = []

	if (firstName) {
		updateFields.push("firstName = ?")
		queryParams.push(firstName)
	}

	if (lastName) {
		updateFields.push("lastName = ?")
		queryParams.push(lastName)
	}

	if (updateFields.length > 0) {
		queryParams.push(userId)

		const query = `UPDATE users SET ${updateFields.join(", ")} WHERE id = ?`

		db.run(query, queryParams, function (err) {
			if (err) {
				res.status(500).json({ error: err.message })
			} else if (this.changes === 0) {
				res.status(404).json({ message: "User not found" })
			} else {
				res.json({ msg: "User updated", userId, firstName, lastName })
			}
		})
	} else {
		res.status(400).json({ message: "No fields to update" })
	}
}

exports.deleteUser = (req, res) => {
	const { id } = req.params
	db.run("DELETE FROM users WHERE id = ?", [id], function (err) {
		if (err) {
			res.status(500).json({ error: err.message })
		} else if (this.changes === 0) {
			res.status(404).json({ message: "User not found" })
		} else {
			res.status(200).json({ message: "User deleted !" })
		}
	})
}
