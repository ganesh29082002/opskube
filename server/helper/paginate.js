export const paginate = async (model, page, limit, pipeline = [], dataLimit, sortBy) => {

    console.log(model, page, limit, pipeline , "paginate")
       const defaultSort = { createdAt: -1 };
       const sort = sortBy || defaultSort; // If sortBy is not provided, default to { createdAt: -1 }
       console.log("sorting by ", sort);
   
   
       const skip = (page - 1) * limit;
       const aggregationPipeline = [
           ...pipeline,
           {
               $facet: {
                   items: [
                       { $match: {} },
                       ...(dataLimit === "all" ? [] : [{ $skip: skip }, { $limit: limit }]) // Apply skip and limit only if limit > 0
                   ],
                   totalItems: [
                       { $count: "count" }
                   ]
               }
           },
           {
               $unwind: {
                   path: "$totalItems",
                   preserveNullAndEmptyArrays: true
               }
           }
       ];
   
       const results = await model.aggregate(aggregationPipeline);
       console.log(results , "aggregate result");
   
       const items = results.length && results[0].items ? results[0].items : [];
       const totalItems = results.length && results[0].totalItems ? results[0].totalItems.count : 0;
       const totalPages = Math.ceil(totalItems / limit);
   
       return {
           items,
           totalItems,
           totalPages,
           currentPage: page
       };
   }
   