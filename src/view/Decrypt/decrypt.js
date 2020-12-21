document.getElementById('uploadDec').addEventListener('submit', performPostRequest);



function performPostRequest() {

    var formData = new FormData();
    var audiofile = document.querySelector('#file');

    formData.append('AudioFile', audiofile.files[0]);
    console.log(formData);
    axios.post('http://localhost:3000/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(function (response) {
        console.log(response);
        // resultElement.innerHTML = generateSuccessHTMLOutput(response);
    })
        .catch(function (error) {
            console.log(error);
            //   resultElement.innerHTML = generateErrorHTMLOutput(error);
        });

    //   var audio = document.getElementById('AudioFile');
    //   console.log(audio);
    //   var todoTitle = document.getElementById('todoTitle').value;
    //   resultElement.innerHTML = '';

    //   axios.post('http://jsonplaceholder.typicode.com/todos', {
    //     userId: '1',
    //     title: todoTitle,
    //     completed: false
    //   })
    //   .then(function (response) {
    //     resultElement.innerHTML = generateSuccessHTMLOutput(response);
    //   })
    //   .catch(function (error) {
    //     resultElement.innerHTML = generateErrorHTMLOutput(error);
    //   });


    //   e.preventDefault();
}



/////





// let data = new FormData();

// data.append('wavfile', file, file.name);

// const config = {
//   headers: { 'content-type': 'multipart/form-data' }
// }
// axios.post('/api/recorderfiles', data, config)