import mongoose from 'mongoose'
const {config} = require('../config/config')

const NODE_ENV = process.env.NODE_ENV || "local"; //local

export const connect = async()=>{
    console.log("hiii")
    try {
        // await mongoose.connect(`mongodb://${config[NODE_ENV].db.HOST}:${config[NODE_ENV].db.PORT}/${config[NODE_ENV].db.DATABASE}`)
        await mongoose.connect(process.env.MONGO_URL)
        console.log("database is connected to mongodb")
    } catch (error) {
        console.log(error.message)
        return error
    }
}