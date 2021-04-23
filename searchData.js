const elasticsearch = require('elasticsearch');
const indexName = 'demo_elastic_index';
const query = 'Lewisham';

//1: The query parameter indicates query context.
//2 and //3: The bool and match clauses are used in query context, which means that they are used to score how well each document matches.
//4: The filter parameter indicates filter context.
//5 and //6: The term and range clauses are used in the filter context. They will filter out documents that do not match, but they will not affect the score for matching documents.


// {
//   "query": {                                  //1
//     "bool": {                                 //2
//       "must": [
//        { "match":{"address":"Street"}}        //3
//       ],
//       "filter": [                             //4
//         { "term":{"gender":"f"}},             //5
//         { "range": { "age": { "gte": 25 }}}   //6
//       ]
//     }
//   }
// }


const searchData = async () => {
  const client = new elasticsearch.Client({
  host: 'localhost:9200',
  // log: 'trace',
  });
await client.ping({
  requestTimeout: 3000
  }, function (error) {
    if (error) {
      console.trace('elasticsearch cluster is down!');
     } else {
      console.log('Elastic search is running.');
    }
  });
try {
  const resp = await client.search({
  index: indexName,
  type: 'place',
  body: {
    sort: [
    {
      place_rank_num: { order: 'desc' },
    },
    {
      importance_num: { order: 'desc' },
    },
],
query: {
    bool: {
    should: [{
              match: {
              lat: '51.4624325',
              }
             },{
              match: {
              alternative_names: query,
             },
          }]
        },
     },
   },
});
  const { hits } = resp.hits;
  console.log(hits);
} catch (e) {
   //   console.log("Error in deleteing index",e);
   if (e.status === 404) {
       console.log('Index Not Found');
    } else {
             throw e;
           }
    }
}
searchData();