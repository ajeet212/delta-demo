// // const { storage, Cloudinary } = require("../cloudConfig.js");

// const initDB = async () => {
//   // 1. Existing Listings हटाएं
//   await Listing.deleteMany({});

//   // 2. data.js से हर listing को प्रोसेस करें
//   let allPromises = initdata.data.map(async (listing) => {
//     try {
//       // A. Cloudinary अपलोड (सीधे URL से)
//       // 'upload' फ़ंक्शन को यहाँ Cloudinary SDK का 'uploader.upload' होना चाहिए
//       let cloudResponse = await Cloudinary.uploader.upload(listing.image.url, {
//         storage,
//       });
//       // मान लीजिए कि cloudResponse में secure_url और original_filename है

//       // B. image URL और filename को अपडेट करें
//       listing.image.url = cloudResponse.secure_url;
//       listing.image.filename = cloudResponse.original_filename; // या public_id

//       // C. owner ID जोड़ें
//       listing.owner = "691ac39520ab31c7dc416375";

//       return listing;
//     } catch (err) {
//       console.error("Upload failed for listing:", listing.title, err);
//       return listing; // failed listing को भी return कर सकते हैं या skip कर सकते हैं
//     }
//   });

//   // 3. सभी वादों (Promises) के पूरा होने का इंतज़ार करें (Parallel)
//   let finalData = await Promise.all(allPromises);

//   // 4. डेटा को MongoDB में सेव करें
//   await Listing.insertMany(finalData);

//   console.log("Database initialized successfully!");
// };

// अब 'secondinitdb' की जरूरत नहीं है
// initDB();

// import axios from "axios";

// async function forwardGeocode(query) {
//   try {
//     const response = await axios.get(
//       "https://nominatim.openstreetmap.org/search",
//       {
//         params: {
//           q: query,
//           format: "json",
//           addressdetails: 1,
//           limit: 3,
//         },
//         headers: {
//           "User-Agent": "wanderlust-app/1.0 (mic.ajeet@gmail.com)",
//           "Accept-Language": "en",
//         },
//       }
//     );

//     return response.data;
//   } catch (err) {
//     console.log("Geocode error:", err.response?.status, err.response?.data);
//     console.log("aaa");
//   }
// }

// let rest = forwardGeocode("New Delhi");
// console.log(rest);

// const Nominatim = require("nominatim-geocode");
// // const  = new Nominatim();

// // import nominatim from "nominatim-geocode";

// Nominatim.reverse({ lat: 55, lng: 33 }, (err, result) => {
//   if (!err) console.log(result);
//   // {
//   //  address: {...},
//   //  display_name: "22, Golestan, Iran"
//   //  lat: "36.9631102"
//   //  lon: "54.9534786"
//   //  osm_id: "196174062"
//   //  ...
//   // }
// });

// const NodeGeocoder = require("node-geocoder");

// const options = {
//   provider: "openstreetmap",
// };

// const geocoder = NodeGeocoder(options);

// async function getLocation(address) {
//   const res = await geocoder.geocode(address);
//   console.log(res);
// }

// getLocation("Malibu, United States");
