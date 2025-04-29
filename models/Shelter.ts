// import mongoose from 'mongoose';

// const ShelterSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   address: {
//     type: String,
//     required: true,
//   },
//   type: {
//     type: String,
//     required: true,
//     enum: ['medical', 'disaster', 'general', 'pet-friendly'],
//   },
//   accessible: {
//     type: Boolean,
//     default: true,
//   },
//   location: {
//     type: {
//       type: String,
//       enum: ["Point"],
//       default: "Point",
//     },
//     coordinates: {
//       type: [Number],
//       required: true,
//       index: "2dsphere",
//     },
//   },
//   contact: {
//     type: String,
//     required: true,
//     validate: {
//       validator: function (v: string) {
//         return /^\+?[1-9]\d{1,14}$/.test(v); // E.164 format
//       },
//       message: (props: { value: string }) => `${props.value} is not a valid phone number!`,
//     },
//   },
//   facilities: [{
//     type: String,
//   }],
// }, { timestamps: true });

// export default mongoose.models.Shelter || mongoose.model('Shelter', ShelterSchema);
