const reviewsService = require("./reviews.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

// Check if review_id exists in Database
async function reviewExists(req, res, next) {
    const review = await reviewsService.read(req.params.reviewId)
    if (review) {
        res.locals.review = review
        return next()
    }
    next({ 
        status: 404, 
        message: "Review cannot be found" 
    })
}

// Update the review_id with new body data
async function update(req, res) {
    const updatedReview = {
        ...req.body.data,
        review_id: res.locals.review.review_id
    }
    await reviewsService.update(updatedReview)
    res.json({ data: await reviewsService.read(updatedReview.review_id) })
}

// Read contents of Database for review_id
function read(req, res) {
    res.json({ data: res.locals.review})
}

// Delete review_id record from Database
async function destroy(req, res, next) {
    await reviewsService.destroy(res.locals.review.review_id)
    res.sendStatus(204)
}

module.exports = {
    update: [
        asyncErrorBoundary(reviewExists), 
        asyncErrorBoundary(update)
    ],
    read: [
        asyncErrorBoundary(reviewExists), 
        read
    ],
    delete: [
        asyncErrorBoundary(reviewExists), 
        asyncErrorBoundary(destroy)
    ]
}