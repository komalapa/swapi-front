import moment from 'moment';

export const SWAPI_LINK = 'https://swapi.dev/api/'

//Получает список по указанной ссылке. Если ссылка не указана получает главный список
export function getListByLink(link){
    if (!link) link = SWAPI_LINK;

    link = link.replace("http://","https://")

    return new Promise (function(resolve, reject){
        fetch(link,{cache: "force-cache"})
        .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            else return response.json();
        })
        .then((data) => {
            resolve(data)
        })
        .catch((err)=>reject(err))
    })  
}

//Получает список по ссылке и разворачивает названия.
export function digListByLink(link){
    let mainRequest = getListByLink(link)
    var promisesArray = [];
    
    return mainRequest
    .then(data =>{    
        let fields = data.results ? data.results:[data]
        
        for (let i=0; i< fields.length; i++){
            for (let key in fields[i]){
                
                if (key !== 'url' && typeof fields[i][key] === 'string' && /^http*/.test(fields[i][key]))  {
                    const foundLink = fields[i][key].replace("http://","https://")
                    let digPromise = (getListByLink(foundLink)
                    .then((resp) => {
                        fields[i][key] = resp.name? resp.name : resp.title? resp.title: fields[i][key]; return fields}))
                    promisesArray.push(digPromise)
                } else if (Array.isArray(fields[i][key]))  {
                    
                    for (let j = 0; j < fields[i][key].length; j++){
                        if (typeof fields[i][key][j] === 'string' && /^http*/.test(fields[i][key][j]))  {
                            const foundLink = fields[i][key][j].replace("http://","https://")
                            let digPromise = (getListByLink(foundLink)
                            .then((resp) => {
                                fields[i][key][j] = resp.name? resp.name : resp.title? resp.title: fields[i][key][j]; return fields}))
                            promisesArray.push(digPromise)
                        }
                    }

                }
                
                if (key === "created" || key === "edited"){
                    fields[i][key] = moment(fields[i][key]).format('ddd-DD/MM/YYYY')
                }
            }
        }
        return Promise.allSettled(promisesArray).then((res)=>{return data});
    })
}

//Аналог While для промисов
function promiseWhile(data, condition, action) {
    let whilePr = (data) => {
      return condition(data) ?
        action(condition(data)).then(whilePr) :
        Promise.resolve(data);
    }
    return whilePr(data);
  };

function addNextPage() {
    let list = {next:'', data:[]};
    return function(link) {
        return getListByLink(link).then(data => {
            list.data = [...list.data , ...data.results]; 
            list.next = data.next; 
            return list})
    };
  }

//Полный список по ссылке без замены ссылок на наазвания
export function getAllItemsByLink(link){
    let addPage = addNextPage()
    if (!link) link = SWAPI_LINK+'people';
    link = link.split('?')[0];
    let list = {next: link, data:[]}
    let nextPage=(data)=>data.next
    return promiseWhile(list, nextPage, addPage)
}