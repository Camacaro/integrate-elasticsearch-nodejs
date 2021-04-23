const elasticsearch = require('elasticsearch');
const indexName='demo_elastic_index';
const deleteIndex = async () => {
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
     await client.indices.delete({index: indexName});
     console.log('All index is deleted');
     } catch (e) {
          //   console.log("Error in deleteing index",e);
               if (e.status === 404) {
                      console.log('Index Not Found');
               } else {
                   throw e;
               }
     }
}
deleteIndex();