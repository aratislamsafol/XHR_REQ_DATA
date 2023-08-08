let getData = document.querySelector('#getData');
let sendData = document.getElementById('sendData');

function sendRequestData(method,url,data){
    const promise = new Promise((resolve, reject)=>{
        const xhr = new XMLHttpRequest();
        xhr.open(method,url);
        xhr.responseType = 'json';
        xhr.setRequestHeader('Content-type','application/json');
        xhr.send(data);
    
        xhr.onload = function(){
            if(xhr.status >= 400 ){
                reject(xhr.response);
            }else{
                resolve(xhr.response)
            }
        }

        xhr.onerror = function(){
            reject("something error")
        };
    });
    return promise;
};

function getDataXml(){
    sendRequestData("GET","https://jsonplaceholder.typicode.com/posts",JSON.stringify({
        title: 'foo',
        body: 'bar',
        userId: 1,
    }))
    .then((value)=>displayUser(value));

}

function displayUser(posts){
    console.log(posts);
    const allPosts = posts.map(element=>{
        let create = document.createElement('li');
        create.innerHTML = element.title;
        document.getElementById('allTitle').append(create);
    })

}

function sendDataXml(){
    sendRequestData("POST","https://jsonplaceholder.typicode.com/posts")
    .then((resData)=>console.log(resData))
}

getData.addEventListener("click",getDataXml);
sendData.addEventListener("click",sendDataXml);

