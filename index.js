

const api_key="259aa3493f33284877378ff7a079fd8d";
let lattitude;
let longitude;


myFn()


async function myFn()
{

    try{

      
    let city=document.getElementById("city").value;

    let url=`https:api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    

    let response=await fetch(url);
     

    if(response.statusText=="Not Found")
    {
        document.querySelector("#container").innerHTML=null;
        document.querySelector("#gmap_canvas").src=null;
        return
    }
    else{

        let data=await response.json();
   console.log(data)

   
 lattitude=data.coord.lat;
 longitude=data.coord.lon;

 let daily_url=`https://api.openweathermap.org/data/2.5/onecall?lat=${lattitude}&lon=${longitude}&exclude=hourly,minutely&appid=${api_key}`

  let daily_res=await fetch(daily_url);

  let daily_data=await daily_res.json();
  console.log(daily_data)

  show(daily_data);

    display(data)
    }
    

}
    
    catch(err)
    {
        console.log(err)
    }



    async function display(data)
        {
            document.querySelector("#container").innerHTML=null;

            let card=document.createElement("div");
              card.setAttribute("id","card");

            let h1=document.createElement("h1");
            h1.innerText=data.name
           
            let h2=document.createElement("h2");
            h2.innerText=`current temperature: ${Math.floor(data.main.temp-273.15)}°C`;

            let p1=document.createElement("p");
            p1.innerText=`maximum Temperature is: ${Math.floor(data.main.temp_max-273.15)}°C`;

            let p2=document.createElement("p");
            p2.innerText=`minimum Temperature is: ${Math.floor(data.main.temp_min-273.15)}°C`;

            let p3=document.createElement("p");
            p3.innerText= `wind speed is : ${data.wind.speed} m/s`;

            let p4=document.createElement("p");
            p4.innerText=`clouds are : ${data.clouds.all}`
           
             let image=document.createElement("img");

             console.log(data.weather[0].icon)

             image.src=`http:openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            

            card.append(h1,image)
            document.querySelector("#container").append(card,h2,p1,p2,p3,p4)
        
            let iframe=document.getElementById("gmap_canvas");
            iframe.src=`https://maps.google.com/maps?q=${data.name}&t=k&z=13&ie=UTF8&iwloc=&output=embed`  
        
        }


console.log(lattitude);
console.log(longitude)
}



function show(daily_data)
{

    document.querySelector("#seven").innerHTML=null;
    var info=daily_data.daily;
    console.log(info);

    info.forEach(function(elem)
    {
        let dt=elem.dt;

        var day = new Date(dt*1000);

        var date=day.toDateString();
         
        var put=date.split(" ");
        console.log(put[0]);

        let pannel=document.createElement("div");

        let p1=document.createElement("p");
        p1.innerText=put[0];


        let image=document.createElement("img");

             console.log(elem.weather[0].icon)

             image.src=`http:openweathermap.org/img/wn/${elem.weather[0].icon}@2x.png`


        let p2=document.createElement("p");
        p2.innerText=Math.floor(elem.temp.max-273.15)+"°C";
        
        let p3=document.createElement("p");
        p3.setAttribute("id","min")
        p3.innerText=Math.floor(elem.temp.min-273.15)+"°C"     


        pannel.append(p1,image,p2,p3);

        document.querySelector("#seven").append(pannel)
    })
}


