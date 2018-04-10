// Full Documentation - https://www.turbo360.co/docs
const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()

// create resources object
 const resources = [
	 'room',
	 'topic',
	 'reply',
	 'user'
 ]
 

/*  This is a sample API route. */
// CRUD Happening Here

router.post('/:resource', (req, res) => {
	const resource = req.params.resource
	if (resources.indexOf(resource) == -1){ //This is invalid resource!
		res.json({
			confirmation: 'fail',
			message: 'Invalid Resource: ' + resource
		})

		return
	}
	//Reference https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf

	turbo.create(resource, req.body)
	.then(data => {
		res.json({
			confirmation: 'success',
			data: req.body
		})

	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})
})

router.get('/:resource', (req, res) => {
	const resource = req.params.resource
	if (resources.indexOf(resource) == -1){ //This is invalid resource!
		res.json({
			confirmation: 'fail',
			message: 'Invalid Resource: ' + resource
		})
		return
	}

	turbo.fetch(resource, req.query)
	.then(data => {
		res.json({
			confirmation: 'success',
			data: req.body
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})
})

router.get('/:resource/:id', (req, res) => {
	const resource = req.params.resource
	if (resources.indexOf(resource) == -1){ //This is invalid resource!
		res.json({
			confirmation: 'fail',
			message: 'Invalid Resource: ' + resource
		})
		return
	}

	//Promises
	turbo.fetchOne(resource, req.params.id)
	.then(data => {
		res.json({
			confirmation: 'success',
			data: req.body
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})
})


module.exports = router
