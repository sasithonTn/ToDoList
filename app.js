const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var items = ["Drink Beer", "Eat Food", "Buy Food"];
app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine', 'ejs');

app.get("/", (req,res)=>{

   var today = new Date();
   var options = {
       weekday: "long",
       day: "numeric",
       month:"long"

   }
   var day = today.toLocaleDateString("en-US");

   res.render("list", {kindOfDay: day, newListItems:items});
})

app.post("/", (req, res)=>{
    // res.send(req.body.newItem);
    // res.render("list", {newListItem: req.body.newItem})
    var item = req.body.newItem;
    items.push(item);
    res.redirect("/");
})

app.post("/remove", (req,res)=>{
    var removeItem = req.body.removeItem;
    if (items.includes(removeItem)) {
        console.log(removeItem)
        items.splice(items.indexOf(removeItem),1)
    }
    res.redirect("/");
})


app.listen(3000, ()=>{
   console.log("Server is running at port 3000");
})


