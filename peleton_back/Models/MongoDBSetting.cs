namespace peleton_back.Models
{
    public class MongoDBSettings
    {
        public string ConectionURI {get; set; } = null!;
        public string DatabaseName {get; set; } = null!;
        public string CollectionName {get; set; } = null!;

    }
}