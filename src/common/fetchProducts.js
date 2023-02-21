import { ref, isRef, unref, watchEffect } from 'vue';

export function useFetch(url,query, callback) {
  const data = ref(null);
  const error = ref(null);
  let dataSample = [
    {
      id: 1,
      name: 'aaxxxx',
      price: 100,
      sales: [20],
      clock: 3.2,
      releaseDate: "21-12-2016"      
    },
    {
      id: 2,
      name: 'bbpsuxxx',
      price: 20,
      sales: [20], 
      clock: 2.7,
      releaseDate: "21-12-2020"     
    },
    {
      id: 3,
      name: 'Dfffffpsuxxx',
      price: 20,
      sales: [50],
      releaseDate: "16-12-2012"    
    },
    {
      id: 4,
      name: 'eeeeetestt',
      price: 30,
      sales: [60],
      releaseDate: "21-12-2016"    
    },
    {
      id: 5,
      name: 'Ayewfffffpsuxxx',
      price: 20,
      sales: [50],
      releaseDate: "11-10-2017"    
    }, 
    {
      id: 6,
      name: 'Byewfffffpsuxxx',
      price: 20,
      sales: [50],
      releaseDate: "25-11-2015"    
    }
  ];

  let applyFilters = function(search){
    return function(a){ 
      return Object.keys(search)
            .every( function(k) { 
                /* do not compare for undefined 
                or null search-properties 
                or if item has not this property */
                if(!search[k] || !a.hasOwnProperty(k)){ 
                    return true;
                }
                let found = a[k] === search[k] 
                     || 
                (search[k] && typeof search[k] === 'object' && k==='price' && search[k].min <= a[k] && a[k] <= search[k].max);               
                return found;
            });              
    }
  }


  function doFetch() {
    // reset state before fetching..
    data.value = null;
    error.value = null;
    // unref() unwraps potential refs
    fetch(unref(url), {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(query)
      })
      .then((res) => res.json())
      .then(function (json) { 
        data.value = json;
        if (callback) {
         // callback(json);

          let dataSampleFiltered =  json.filter(applyFilters(query)); 
          callback(dataSampleFiltered);

        }
      })
      .catch((err) => { 
        error.value = err;
        if (callback) {
         let dataSampleFiltered =  dataSample.filter(applyFilters(query)); 
          callback(dataSampleFiltered);
        }
      });
  }
 
  doFetch();
  
  return { data, error };
}
