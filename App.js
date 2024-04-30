import express from "express";
import bodyParser from "body-parser";
import fs from 'fs';

const port = 3001;
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
let x =[];


// Route Home generator
app.get("/", (req,res)=>{
    res.render("home.ejs", {data: x})
});

// Route generate angka random
app.post("/random", (req,res)=>{
    x=[];
    const total= parseInt(req.body.total);
    generatorNumber(total);
    res.redirect("/");
});

// Route cari angka dalam data
app.post("/find", (req,res)=>{
    const dataToSearch = parseInt(req.body.find);
    const resultData = findNumber(dataToSearch);
    res.render("home.ejs", {data: x, find: resultData});
    
});

// Route mencetak hasil angka random
app.post("/cetak", (req,res)=>{
    WriteNumber(x);
    res.redirect("/");
})


// fungsi untuk mencari nilai dalam data
const findNumber = (search)=>{
    const result = x.find(val=> val==search);
    return result;
}

// fungsi generate angka random
const generatorNumber = (num)=>{
    for (let i = 0; i < num; i++){
        let result;
        do{
            const q = Math.floor(Math.random() * 10 );
            const w = Math.floor(Math.random() * 10 );
            const r = Math.floor(Math.random() * 10 );
            const t = Math.floor(Math.random() * 10 );    
            result = `${q}${w}${r}${t}`;
            
        }while(x.includes(result));
        x.push(result);
    }
};

// fungsi mencetak hasil angka random kedalam .txt
const WriteNumber = (data)=>{
    let n = 0;
    const title = new Date().getTime();
    const stringData = data.map((item) => `${++n}. ${item}`).join('\n')
    try{
        fs.writeFileSync(`./Output/${title}.txt`, stringData);
        console.log("Succes Create File");
    }catch(err){
        console.log(err.message);
    }

}

app.listen(port, ()=>{
    console.log("Server Running...")
});