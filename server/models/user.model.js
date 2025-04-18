import mongoose from "mongoose";


const userSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true,
      },
      userName: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      gender: {
        type: String,
        required: true,
      },
      avatar: {
        type: String,
        required: true,
      },
},{timestamps:true})

userSchema.index({ userName: 1 }, { unique: true });


export default mongoose.model("User",userSchema)

