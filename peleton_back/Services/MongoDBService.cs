using peleton_back.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MongoDB.Bson;

namespace peleton_back.Services
{
    public class MongoDBService
    {
        private readonly IMongoCollection<Activity> _activityCollection;

        public MongoDBService(IOptions<MongoDBSettings> mongoDBSettings){
            MongoClient client = new MongoClient(mongoDBSettings.Value.ConectionURI);
            IMongoDatabase database = client.GetDatabase(mongoDBSettings.Value.DatabaseName);
            _activityCollection = database.GetCollection<Activity>(mongoDBSettings.Value.CollectionName);
        }

        public async Task CreateAsync(Activity activity){
            await _activityCollection.InsertOneAsync(activity);

            return;
        }

        public async Task<List<Activity>> GetListAsync() {
            return await _activityCollection.Find(new BsonDocument()).ToListAsync();
        }

    }
}