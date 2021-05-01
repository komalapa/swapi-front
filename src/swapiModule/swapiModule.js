import moment from 'moment';


export const SWAPI_LINK = 'https://swapi.dev/api/'

//Получает список по указанной ссылке. Если ссылка не указана получает главный список
export function getListByLink(link){
    if (!link) link = SWAPI_LINK;
    return new Promise (function(resolve, reject){
        
        fetch(link)
        .then((response) => {
            //console.log(response)
            if (!response.ok){reject(response)}
            else return response.json();
        })
        .then((data) => {
            resolve(data)
        })
    })  
}
//Получает список по ссылке и разворачивает названия.
export function digListByLink(link){
    let promisesArray = [];
    let diggedData={}
    let mainRequest = getListByLink(link)
    promisesArray.push(mainRequest)
    mainRequest.then(data =>{
        //console.log(data)
        let fields = data.results
        let promisesArray = [];
        for (let i=0; i< fields.length; i++){
            for (let key in fields[i]){
                //console.log(key)
                if (key !== 'url' && typeof fields[i][key] === 'string' && /^http*/.test(fields[i][key]))  {
                    promisesArray.push(getListByLink(fields[i][key])
                    .then((resp) => {
                        fields[i][key] = resp.name? resp.name : resp.title? resp.title: fields[i][key]}))
                } else if (Array.isArray(fields[i][key]))  {
                    //console.log('array')
                    for (let j = 0; j < fields[i][key].length; j++){
                        if (typeof fields[i][key][j] === 'string' && /^http*/.test(fields[i][key][j]))  {
                            promisesArray.push(getListByLink(fields[i][key][j])
                            .then((resp) => {
                                fields[i][key][j] = resp.name? resp.name : resp.title? resp.title: fields[i][key][j]}))
                            }
                    }
                }
                if (key === "created" || key === "edited"){
                    //console.log(data[i][key])
                    fields[i][key] = moment(fields[i][key]).format('ddd-DD/MM/YYYY')
                    //console.log(data[i][key])
                }
            }
        }
        diggedData = data;
        diggedData.results=fields; 
        //console.log(data)           
    })  
    return Promise.allSettled(promisesArray).then(()=>{return diggedData})
    
} 

function getFullList(link, data){
    if (!data) data=[];
    getListByLink(link)
    .then(pageData =>{
        //console.log(data)
        data = [...data, ...pageData.results]

        if (pageData.next) {data = getFullList(pageData.next, data)
        } else {
            console.log(data)
            return [...data]
        }
    })
}

export function filterByFilms(link){
    if (!link) link = SWAPI_LINK;
    let films = ["none"] 
    getListByLink(SWAPI_LINK+'films/').then((filmsData)=>{
        films = filmsData.results.map(item => item.title)
        //console.log("films",films)
    })
    //console.log()
    console.log(getFullList(link+'people'))
}