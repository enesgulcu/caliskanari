export default async function getAdress(route="") {
    
const adressRoute = `https://adressapi.herokuapp.com/${route}`;
const data = await fetch(adressRoute)
.then(res => res.json())
.catch(err => console.log(err))
return data;

}

