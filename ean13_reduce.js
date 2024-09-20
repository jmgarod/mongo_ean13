db.eans.aggregate([
   { $project: { EAN12: { $toString: "$EAN" } } },
    {
      $project: {
        EAN12: 1,
        chars: {
          $reduce: {
            input: { $range: [ 0, 12 ] },
            initialValue: { pares: 0, impares: 0 },
            in: { $cond: { if: { $eq: [ { $mod: [ "$$this", 2 ] }, 0 ] },
                                then: { pares: { $add: [ { $toInt: { 
                                        $substrCP: [ "$EAN12" , "$$this", 1 ] } }, 
                                        "$$value.pares" ] },
                   impares: "$$value.impares"
                 },
                 else: { pares: "$$value.pares",
                         impares: { $add: [ { $toInt: { 
                                        $substrCP: [ "$EAN12", "$$this", 1] } }, 
                                        "$$value.impares" ]
                } } } } } } } 
    },
    {
      $project: {
        EAN12: 1,
        chars: 1,
        x: { $add: [ { $multiply: [ "$chars.impares", 3 ] }, "$chars.pares" ] } } 
    },
    {
      $project: {
        EAN12: { $toLong: "$EAN12" },
        chars: 1,
        x: 1,
        EAN13: { $toLong: {
          $concat: [ "$EAN12", { $toString: { 
            $subtract: [ { $multiply: [{ $ceil: { $divide: ["$x", 10] } }, 10] }, "$x" ] } } ]
        } } } 
    },
    {
      $project: { EAN12: 1, EAN13: 1, _id: 0 }
    },
    { $limit: 5 }
  ])
