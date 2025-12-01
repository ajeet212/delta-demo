const NodeGeocoder = require("node-geocoder");
const options = {
  provider: "openstreetmap",
};

const geocoder = NodeGeocoder(options);
const Listing = require("../models/listing");
const ExpressError = require("../utils/ExpressError");

module.exports.index = async (req, res) => {
  const allListing = await Listing.find({});

  res.render("listings/index.ejs", { allListing });
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "review",
      populate: {
        path: "author",
      },
    })
    .populate("owner");
  if (!listing) {
    req.flash("error", "listing you requested for does not exist");
    return res.redirect("/listings");
  }
  res.render("listings/show.ejs", { listing });
};

//createlisting
module.exports.createListing = async (req, res, next) => {
  const result = await geocoder.geocode(req.body.listing.location);
  if (!result || result.length === 0) {
    next(new ExpressError("invalid location"));
  }
  const latitude = result[0].latitude;
  const longitude = result[0].longitude;
  const geomatry = {
    type: "Point",
    coordinates: [longitude, latitude],
  };

  let url = req.file.path;
  let filename = req.file.filename;
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };
  newListing.geomatry = geomatry;
  let savedListing = await newListing.save();
  console.log(savedListing);
  req.flash("success", "new listing created");
  res.redirect("/listings");
};

//edit
module.exports.editListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "listing you requested for does not exist");
    return res.redirect("/listings");
  }

  // let url = listing.image.url;
  // url = url.replace("/upload", "/upload/w_250");
  // console.log(url, "............2");
  res.render("listings/edit.ejs", { listing });
};

//update
module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  // console.log(listing);
  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }

  req.flash("success", "listing updated");
  res.redirect(`/listings/${id}`);
};

//delete
module.exports.deleteListing = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "listing deleted");
  res.redirect("/listings");
};
