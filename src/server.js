const express = require('express');
const cors = require('cors');
// const upload = require('express-fileupload');
const app = express();
var formidable = require('formidable');
const fs = require('fs');

app.use(cors());
app.use(express.json());
// app.use(upload());




app.get('/', (req, res) => {
    // var text = req.params.secret;
    // res.write(text);
    res.send("Hello");

});

app.post('/upload', (req, res) => {
    var form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        console.log(fields);
        console.log(files);

        if (fields.SecretText != '#####') {
            if (files) {
                var file = files.AudioFile,
                    filename = file.name;

                var spawn = require("child_process").spawn;
                var child = spawn('python', ["./encrypter.py",
                    fields.SecretText,
                    file.path,
                    filename]);

                child.stdout.on('data', function (data) {
                    console.log(data.toString());
                    //return res.send(data.toString());
                })

                child.stderr.on('data', function (data) {
                    console.log(data.toString());
                    //return res.send(data.toString());
                })

                child.stdout.on('close', () => {

                    res.download("./modified/" + filename + "embedded.wav");
                })


            }
        }
        else {
            if (files) {
                console.log(req.body);
                console.log(files.AudioFile);

                var file = files.AudioFile,
                    filename = file.name;


                // console.log(req.files.AudioFile.mv.toString());
                // fs.writeFile("./upload/dec/" +  filename,file.data, function(err) {
                //     if(err) {
                //         return console.log(err);
                //     }
                //     console.log("The file was saved!");
                // }); 

                // file.mv("./upload/dec/" + filename)/* (err) => {
                //     if (err) {
                //         console.log(err);
                //         //res.send("error occured")
                //     } else {
                //         console.log('Decrypt File uploaded');
                //     }
                // })

                res.writeHead(200, { 'Content-Type': 'text/html' });

                var spawn = require("child_process").spawn;
                var child = spawn('python', ["./decrypter.py",
                    file.path]);

                child.stdout.on('data', (data) => {
                    console.log(data.toString());
                })

                child.stderr.on('data', function (data) {
                    console.log(data.toString());
                    //return res.send(data.toString());
                })

                child.stdout.pipe(res);
            }
        }
    });
    // if (req.body.SecretText != '#####') {

    // if (req.files) {
    //     console.log(fields);
    //     console.log(files);
    //     var file = req.files.AudioFile,
    //         filename = /*Math.random().toString()+  */ file.name;
    //     // file.mv("./upload/" + filename, (err) => {
    //     //     if (err) {
    //     //         console.log(err);
    //     //         res.send("error occured")
    //     //     } else {
    //     //         return res.send('File uploaded');
    //     //     }
    //     // })
    //     var spawn = require("child_process").spawn;
    //     var child = spawn('python', ["./script.py",
    //         req.body.SecretText,
    //         filename]);

    //     child.stdout.on('data', function (data) {
    //         console.log(data.toString());
    //         //return res.send(data.toString());
    //     })

    //     child.stdout.on('close',()=>{
    //         res.download("./modified/" +  filename+"embedded.wav");
    //     })


    //     }
    // }
    // else {
    //     if (req.files) {
    //         console.log(req.body);
    //         console.log(req.files.AudioFile);

    //         var file = req.files.AudioFile,
    //             filename = /*Math.random().toString() +*/ file.name;


    //         // console.log(req.files.AudioFile.mv.toString());
    //         // fs.writeFile("./upload/dec/" +  filename,file.data, function(err) {
    //         //     if(err) {
    //         //         return console.log(err);
    //         //     }
    //         //     console.log("The file was saved!");
    //         // }); 

    //         // file.mv("./upload/dec/" + filename)/* (err) => {
    //         //     if (err) {
    //         //         console.log(err);
    //         //         //res.send("error occured")
    //         //     } else {
    //         //         console.log('Decrypt File uploaded');
    //         //     }
    //         // })

    //         res.writeHead(200, { 'Content-Type': 'text/plain' });

    //         var spawn = require("child_process").spawn;
    //         var child = spawn('python', ["./decrypt.py",
    //             filename]);

    //         child.stdout.on('data', (data) => {
    //             console.log(data.toString());
    //         })

    //         child.stdout.pipe(res);
    //     }
    // }

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server has started to listen on Port ${PORT}`);
});