
function upload() {
    console.log("upload is called");

    let audio = document.getElementById("AudioFile").files[0];
    //let audio = "dskfhjlkdfhjndlkfhjndklfhnl";
    let formData = new FormData();
    //let formData = { 'audio': audio };
    formData.append("audio", audio);
    console.log(formData);
    fetch('http://localhost:3000/', { method: "POST", body: formData });
}

