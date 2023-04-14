const getAdress = async (route : string  ="") : Promise<string[] | undefined> => {
    
    try {
        const adressRoute = `https://schoolapi.herokuapp.com/${route}`;
        const data = await fetch(adressRoute)
        .then(res => res.json())
        .catch(err => console.log(err))
        return data;
        
    } catch (error) {
        console.log(error)    
    }

}

export default getAdress;

