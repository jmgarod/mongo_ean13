db.eans.aggregate( [
    // Etapa 1
    { $project: { strEAN: { $toString: "$EAN" } } },
 
    // Etapa 2
    { $project: {
        strEAN: 1,
        pares: { $sum: {
                $map: {
                    input: { $range: [ 0, 12, 2 ] },
                    as: "pos",
                    in: { $toInt: { $substrCP: [ "$strEAN", "$$pos", 1 ] } }
            } } } } },
    {
 
    // Etapa 3
    $project: {
        strEAN: 1,
        imparesX3: { $sum: [ { $multiply: [ { $sum: {
                $map: {
                    input: { $range: [ 1, 12, 2 ] },
                    as: "pos",
                    in: { $toInt: { $substrCP: [ "$strEAN", "$$pos", 1 ] } }
                } } }, 3 ] }, "$pares" ] } } },
    {
 
    // Etapa 4
    $project: {
        strEAN: 1,
        EAN13: { $concat: [ "$strEAN", {
                $toString: {
                    $subtract: [
                  { $multiply: [ { $ceil: { 
                      $divide: [ "$imparesX3", 10 ] } }, 10 ] },
                        "$imparesX3" ]
            } } ] } } },
    {
 
    // Etapa 5
    $project: { _id:0, CODIGO: { EAN12: "$strEAN", EAN13: "$EAN13" } } },

    // Limitamos la salida a 5 registros
    { $limit: 5}
] )
