const express=require("express");
const bodyparser=require("body-parser");
const app=express();
const path= require("path");
const http=require("https")
const ejs=require("ejs");
app.set("view engine","ejs");
require("dotenv").config();
app.use(bodyparser.urlencoded({extended: true}));
app.listen( process.env.PORT || 3000,()=>{
    console.log("running");
})
app.use(express.static(path.join(__dirname,"./public")))
let imageUrl="https://media.istockphoto.com/photos/doing-business-with-a-smile-picture-id1330547068?s=612x612";
const options = {
	"method": "POST",
	"hostname": "emotion-detection2.p.rapidapi.com",
	"port": null,
	"path": "/emotion-detection",
	"headers": {
		"content-type": "application/json",
		"X-RapidAPI-Host": "emotion-detection2.p.rapidapi.com",
		"X-RapidAPI-Key": "80993ad235msha35c6f295a22308p1d9c3djsnfca854cdee30",
		"useQueryString": true
	}
};
let check=0;
app.post("/",(requ,resp)=>{
    
imageUrl=requ.body.image;

const req = http.request(options, function (res) {


    res.on("data", function (chunk) {
       let emotion=JSON.parse(chunk)[0].emotion.value;
	   console.log(JSON.parse(chunk));
    check=1;
	   resp.render("home",{mood: emotion,url: imageUrl,check:check})
    });


});

req.write(JSON.stringify({
  url: imageUrl
}));
req.end();


})

app.get("/",(request,response)=>{
  
    response.render("second")

})
// const req = http.request(options, function (res) {


// 	res.on("data", function (chunk) {
// 		console.log(JSON.parse(chunk)[1].emotion.value);
// 	});

// // 	res.on("end", function () {
// // 		const body = Buffer.concat(chunks);
// // 		console.log(body.toString());
// // 	});
// });

// req.write(JSON.stringify({
//   url: imageUrl
// }));
// req.end();
