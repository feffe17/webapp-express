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

function storeReview(req, res) {
    const { movie_id, text, name, vote } = req.body;

    if (!movie_id || !text || !name || !vote) {
        return res.status(400).json({ error: 'Missing required fields: movie_id, text, name, vote' });
    }

    const query = `INSERT INTO reviews (movie_id, text, name, vote, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())`;

    connection.query(query, [movie_id, text, name, vote], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err });
        }

        res.status(201).json({
            message: 'Review added successfully',
            review_id: results.insertId,
        });
    });
}


module.exports = {
    index,
    show,
    storeReview
};
