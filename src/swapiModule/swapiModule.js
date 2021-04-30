const SWAPI_LINK = 'https://swapi.dev/api/'
//Получает основной список по стандартной ссылке
// export function getMainList(){
//     return new Promise (function(resolve, reject){
        
//         fetch(SWAPI_LINK)
//         .then((response) => {
//             //console.log(response)
//             if (!response.ok){reject(response)}
//             else return response.json();
//         })
//         .then((data) => {
//             resolve(data)
//         })
//     })     
// }
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
    let mainRequest = new Promise (function(resolve, reject){
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
    promisesArray.push(mainRequest)
    mainRequest.then(data =>{
        data = data.results
        let promisesArray = [];
        for (let i=0; i< data.length; i++){
            for (let key in data[i]){
                //console.log(key)
                if (key !== 'url' && typeof data[i][key] === 'string' && /^http*/.test(data[i][key]))  {
                    promisesArray.push(getListByLink(data[i][key])
                    .then((resp) => {
                        data[i][key] = resp.name? resp.name : resp.title? resp.title: data[i][key]}))
                } else if (Array.isArray(data[i][key]))  {
                    console.log('array')
                    for (let j = 0; j < data[i][key].length; j++){
                        if (typeof data[i][key][j] === 'string' && /^http*/.test(data[i][key][j]))  {
                            promisesArray.push(getListByLink(data[i][key][j])
                            .then((resp) => {
                                data[i][key][j] = resp.name? resp.name : resp.title? resp.title: data[i][key][j]}))
                            }
                    }
                }
            }
        }
        diggedData = data;            
    })  
    return Promise.allSettled(promisesArray).then(()=>{return diggedData})
    
} 
