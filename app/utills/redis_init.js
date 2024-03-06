
const redisDB = require("redis");
const redisClinet = redisDB.createClient()

redisClinet.connect()
redisClinet.on("connect" , ()=> console.log("redis connected"));
redisClinet.on("error", (err)=> console.log("redisError:"+err));
redisClinet.on("conected" , ()=> console.log("redis is ready to use..."));
redisClinet.on("end" , ()=> console.log("redis closed..."));

module.exports = redisClinet

