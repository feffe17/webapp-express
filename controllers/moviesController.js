const connection = require("../db/posts")

function index(req, res) {
    connection.query(`SELECT * FROM movies`, (err, results) => {
        if (err) return res.status(500).json({ err: err })

        res.json({
            movies: results,
            count: results.length
        })
    })
}

function show(req, res) {
    const id = req.params.id
    const movie = `SELECT * FROM movies WHERE id = ?`
    const review = `SELECT * FROM reviews WHERE movie_id = ?`

    connection.query(movie, [id], (err, results) => {
        if (err) return res.status(500).json({ err: err })
        if (results.length == 0) return res.status(404).json({ err: 'Movies not found' })
        connection.query(review, [id], (err, reviewsResults) => {
            if (err) return res.status(500).json({ err: err })
            const movieReview = {
                ...results[0],
                reviews: reviewsResults
            }

            res.json(movieReview)
        })
    })
}



module.exports = {
    index,
    show
}