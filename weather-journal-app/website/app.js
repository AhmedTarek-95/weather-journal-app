
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();
// my weather apiKey
const ApiKey ='948d36e6064882c724489839330632fa&units=metric'

/* Function called by event listener */
const btu =document.getElementById('generate').addEventListener('click', async()=>{
document.getElementById('temp').innerHTML='';
document.getElementById('date').innerHTML='';
document.getElementById('content').innerHTML ='';
try{
const ZipCode =document.querySelector('#zip').value
const content=document.querySelector('#feelings').value
if(!ZipCode){
    alert('please enter zip code')
    return

}
    const temp =await getTemp(ZipCode)
    .then((temp)=> {
        postData(temp , content)
    })
    .then(()=>{
        getData()
        
    })
    .then((lastData) => {
    updateUI(lastData);

        }
)
    
}catch(error){
    console.log(`errorr:${error}`);
} 
})


//get web api data
async function getTemp(ZipCode){
const url =`https://api.openweathermap.org/data/2.5/weather?zip=${ZipCode}&appid=${ApiKey}`
const res = await fetch (url)
const data =await res.json()
const temp= data.main.temp.toFixed()+'°C';
return temp
}

//post data
async function postData(temp ,content){ 
    await fetch ('/postData' , {
    method: 'POST',
    headers: {
        'content-Type':'application/json'
    },
    body: JSON.stringify({
    date: newDate,
    temp:temp,
    content: content,
    })
});
}

async function getData(){
    const  r=await fetch('/allData')
    const lastData = await r.json() 
    console.log(lastData);
    return lastData;
}
//function to get data
async function updateUI() {
    const request = await fetch('/allData');
    try {
        const lastNewData = await request.json();
        document.getElementById('temp').innerHTML += 'temp :' + lastNewData.temp;
        document.getElementById('date').innerHTML += 'date :' + lastNewData.date;
        document.getElementById('content').innerHTML += 'content :' + lastNewData.content;
        return lastNewData
    } catch (error) {
        console.log(`errorr:${error}`);
    }
}

