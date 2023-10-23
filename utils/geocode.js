const request = require('request');

const geocode = (address,callback) => {
    const url = `http://api.positionstack.com/v1/forward?access_key=b5e768c944e606920e4ca1905cd2f1f0&query=${encodeURIComponent(address)}&limit=1`;

    request({url,json:true}, (error,res)=>{
        const body = res.body;
        //console.log(res);
        //console.log("Bye");
        //console.log(body)
        //console.log("Hello");
        //console.log(body.error);
        if(error)
        {
            const errorMessage = 'Please connect to your internet.\n';
            callback(errorMessage,undefined);
        }
        else if(body.error || body.data.length === 0)
        {
            const errorMessage = "Please enter correct place name";
            callback(errorMessage,undefined);
        }
        else
        {
            //console.log(body.data);
            const {latitude,longitude} = body.data[0];
            callback(undefined,{latitude,longitude});
        }
    })
}

module.exports = geocode;