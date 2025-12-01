const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");

router.get(
  "/search",
  wrapAsync(async (req, res) => {
    let { category, location } = req.query;
    console.log(category);
    console.log(location);
    //   res.send("server listing");

    let filterListings;

    if (category && location) {
      filterListings = await Listing.find({
        location: { $regex: location, $options: "i" },
        category: category,
      });
    } else if (location) {
      filterListings = await Listing.find({
        location: { $regex: location, $options: "i" },
      });
    } else {
      filterListings = await Listing.find({});
    }

    console.log(filterListings, "thats it");
    res.render("listings/filter.ejs", {
      filterListings,
    });
  })
);

module.exports = router;
