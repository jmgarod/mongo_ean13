db.eans.aggregate([
    {
        $project: {
            EAN:1,
            _id:0,
            EAN13: {
                $function: {
                    body: function(ean12){
                        valores=ean12.toString()
                                     .split('')
                                     .reduce((acu,cur,i)=>{
                                        if(i%2==0) 
                                            acu.pares+=parseInt(cur);
                                        else 
                                            acu.impares+=parseInt(cur);
                                        return acu;
                                     },{ pares: 0, impares: 0 })
                        step1=valores.impares*3;
                        step2=step1+valores.pares;
                        return ean12+(Math.ceil(step2/10)*10-step2).toString();
                    },
                    args: ["$EAN"],
                    lang:"js"
                }
            }
        }
    }
])
