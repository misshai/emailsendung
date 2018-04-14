module.exports = (req, res, next) => {
	if (req.user.credits < 1) {
		return res.status(403).send({error: 'you should have at least 1 credit'});
	}
	next();
}
