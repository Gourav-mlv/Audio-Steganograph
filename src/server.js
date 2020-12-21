const express = require('express');
const cors = require('cors');
const upload = require('express-fileupload');
const app = express();

app.use(cors());
app.use(express.json());
app.use(upload());




app.get('/', (req, res) => {
    // var text = req.params.secret;
    // res.write(text);
    res.send("Hello");
    console.log(req.params.audio);
});

app.post('/upload', (req, res) => {


    if (req.body.SecretText) {
        if (req.files) {
            console.log(req.body);
            console.log(req.files);
            var file = req.files.AudioFile,
                filename = Math.random().toString() + file.name;
            file.mv("./upload/" + filename, (err) => {
                if (err) {
                    console.log(err);
                    res.send("error occured")
                } else {
                    return res.send('File uploaded');
                }
            })


            var spawn = require("child_process").spawn;
            var process = spawn('python', ["./script.py",
                req.body.SecretText,
                filename]);

            process.stdout.on('data', function (data) {
                console.log(data.toString());
                return res.send(data.toString());
            })


        }
    } else {
        if (req.files) {
            console.log(req.body);
            console.log(req.files);

            // res.write("Decrypt File Uploaded");
           // res.sendStatus(200);

            var file = req.files.AudioFile,
                filename = Math.random().toString() + file.name;

            file.mv("./upload/dec" + filename, (err) => {
                if (err) {
                    console.log(err);
                    res.send("error occured")
                } else {
                    console.log('Decrypt File uploaded');
                }
            })


            var spawn = require("child_process").spawn;
            var process = spawn('python', ["./decrypt.py",
                filename]);



            process.stdout.on('data', function (data) {
                res.send(data.toString());
                console.log(data.toString());
                dataToSend = data.toString();
            })
            // setTimeout(()=>{
            //     return res.send(dataToSend);
            // }, 3000);

            // process.on('close', (code) => {
            //     console.log(`child process close all stdio with code ${code}`);
            //     // send data to browser
            //     return res.send(dataToSend)
            // });

        }
    }


});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server has started to listen on Port ${PORT}`);
});