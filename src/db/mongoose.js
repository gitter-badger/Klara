import user from "./models/user";

export async function fetchUser(key) {
	let userDb = await user.findOne({ id: key });

	if (!userDb) {
		userDb = new user({
			id: key,
			registeredAt: Date.now()
		})
		await userDb.save().catch(err => console.log(err));
		return userDb;
	}
	return userDb;
};
