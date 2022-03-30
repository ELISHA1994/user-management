import db from "../model/index.js"

const User = db.User;
const Op = db.Op

// ViewAll Users
export async function ViewAll(req, res, next) {
    try {
        let removedUser = req.query.removed;
        const users = await User.findAll({
            where: {
                status: 'active'
            }
        });
        // console.log("Users", users.map(user => user.toJSON()));
        res.render("home", { users: users.map(user => user.toJSON()), removedUser});
    } catch (err) {
        console.log(err);
        next(err);
    }
}

// Find user by search
export async function Find(req, res, next) {
    try {
        let searchTerm = req.body.search;
        const users = await User.findAll({
            where: {
                [Op.or]: [
                    {
                        first_name: {
                            [Op.like]: `%${searchTerm}%`
                        }
                    },
                    {
                        last_name: {
                            [Op.like]: `%${searchTerm}%`
                        }
                    },
                ]
            }
        })
        console.log(`%${searchTerm}%`);
        console.log(users.map(user => user.toJSON()));
        res.render("home", { users: users.map(user => user.toJSON()) });
    } catch (err) {
        console.log(err);
        next(err);
    }
}

// Add user page
export async function Form(req, res, next) {
    res.render('add-user');
}
// Create User
export async function Create(req, res, next) {
    try {
        const { first_name, last_name, email, phone, comments } = req.body;
        const user = await db.User.create({
            first_name,
            last_name,
            email,
            phone,
            comments
        })
        user ?
            res.render('add-user', { alert: "User added successfully."}) :
            console.log("error")
    } catch (err) {
        console.error(err);
        next(err);
    }
}

// Edit user page
export async function Edit(req, res, next) {
    try {
        let user = await db.User.findOne({
            where: {
                id: req.params.id
            }
        });
        res.render('edit-user', { user: user.toJSON() })
    } catch (err) {
        console.error(err);
        next(err);
    }
}

// Update User
export async function Update(req, res, next) {
    try {
        const { first_name, last_name, email, phone, comments } = req.body;
        await db.User.update(
            {
                first_name,
                last_name,
                email,
                phone,
                comments
            },
            {
                where: {
                    id: req.params.id
                }
            }
        )
        let user = await db.User.findOne({
            where: {
                id: req.params.id
            }
        });
        // console.log(user);
        res.render('edit-user', { user: user.toJSON(), alert: `${first_name} has been updated.` })
    } catch (err) {
        console.error(err);
        next(err);
    }
}

export async function View(req, res, next) {
    try {
        let user = await db.User.findOne({
            where: {
                id: req.params.id
            }
        });
        res.render('view-user', { user: user.toJSON() })
    } catch (err) {
        console.log(err);
        next(err);
    }
}

// Delete User
export async function RemoveUser(req, res, next) {
    try {
        const user = await db.User.update(
            {
                status: 'removed'
            },
            {
                where: {
                    id: req.params.id
                }
            }
        )
        let removedUser = encodeURIComponent('User successfully removed.');
        res.redirect('/?removed=' + removedUser);
    } catch (err) {
        console.log(err);
        next(err);
    }
}


