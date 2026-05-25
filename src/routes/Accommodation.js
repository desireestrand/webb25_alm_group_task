const Accommodation = required("./models/Accommodation");
const router =required("express").Router();

router.post("/", async (req, res) => {
    try {
        const accommodation = await Accommodation.create(req.body);
        res.status(201).json(accommodation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const accommodations = await Accommodation.find();
        res.json(accommodations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

module.exports = router;