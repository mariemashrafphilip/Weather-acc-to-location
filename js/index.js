let findBtn = document.getElementById('find')
let input = document.getElementById('input')
let loading =document.querySelector('.loading')
// let allData=[]
// e66e1bcf0c4941bbbb2194959242806



// getData('cairo')
// Api
async function getData(value){
try {
    loading.classList.remove('d-none')
    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=e66e1bcf0c4941bbbb2194959242806&q=${value}&days=3`);

    let data = await response.json()

    // let allData = data.forecast.forecastday

    console.log (data)


    displayData(data)
    loading.classList.add('d-none')

} catch(error) {
    loading.classList.add('d-none')

    console.log('Errorrrrrr')
}  
}


function displayData (data){

    let location = data.location.name
    let info = data.forecast.forecastday
    console.log(info.length)

    let cartona =""

    for(let i = 0 ; i<info.length ; i++){
        let h = getDay(info[i].date)
        console.log(info[i])
cartona +=`
<div class="col-md-4 ">
<div class="card border-primary mb-3 " style="max-width: 18rem;" >
<div class="card-header bg-info d-flex justify-content-between "> <p>${h.x}</p>  <p>28${i< 1? h.y : "" }</p> </div>
  <div class="card-body text-primary ">
    <h5 class="card-text pb-4">${i<1? location : ""}</h5>
    <p class="card-title text-info fs-3 pb-4"> ${i<1 ? data.current.temp_c : info[i].day.avgtemp_c} ºC</p>
    <img src=${i<1 ? data.current.condition.icon : info[i].day.condition.text} class="pb-4" alt="">
    <span class="pb-5">${i<1 ? data.current.condition.icon : info[i].day.condition.icon}</span>

   <div>
   ${i < 1 ? ` <div class="icons d-flex justify-content-between fs-6 pt-5 pb-5">
      <span ><i class="fa-solid fa-umbrella text-warning"></i> <span>${data.current.humidity} % </span></span>
      <span ><i class="fa-solid fa-wind text-info"></i><span> ${data.current.wind_kph} kph</span></span>
      <span><i class="fa-solid fa-compass text-success"></i> <span>${data.current.wind_dir}</span></span>
     </div>` : ''}
   </div>

  </div>
</div>

</div>
</div>
</div>
 `
    }
    document.getElementById('major').innerHTML= cartona
}



input.addEventListener('input', function(e){
    // getData()
getData(e.target.value)
})

function getDay(f){
    let day = new Date(f)
   
    let x = day.toLocaleString("en-Us",{weekday:"long"})
    let y = day.toLocaleString("en-Us",{month:"long"})

console.log(x , y)
return {x , y}
}

navigator.geolocation.getCurrentPosition(
    (data)=>{
        let lat = data.coords.latitude
        let long = data.coords.longitude
        console.log(lat,long)
        getData(`${lat},${long}`)
    },

    (err)=>{
        getData('cairo')
    }
)

findBtn.addEventListener('click',function(){
    getData(input.value)
})