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

router.get("/:id", async (req, res) => {
    try {
        const accommodation = await Accommodation.findById(req.params.id);
        if (accommodation) {
            res.json(accommodation);
        } else {
            res.status(404).json({ message: "Accommodation not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const accommodation = await Accommodation.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const accommodation = await Accommodation.findByIdAndDelete(req.params.id);
        if (accommodation) {
            res.json({ message: "Accommodation deleted" });
        } else {
            res.status(404).json({ message: "Accommodation not found" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

module.exports = router;