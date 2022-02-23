
export function latitude(cb){
    return navigator.geolocation.getCurrentPosition(cb);
}

export function longitude(){
    let long1 = navigator.geolocation.getCurrentPosition(function(position) {
        let long = position.coords.longitude;
        return long 
    });
}

function doSomething(position) {
    return {
        longitude: position.coords.longitude,
        latitude: position.coords.latitude
    }
    //console.log('dosomethig', position)
}