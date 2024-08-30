using System;
using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;
using System.Security.Cryptography.X509Certificates;

namespace peleton_back.Models {
    public class Activity{
        
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id {get; set; }

        public string Name {get; set; } = "";
        public double Distance {get; set;}
        public TimeSpan Time {get; set;}
        public double AverageSpeed {get; set;}
        public double AltitudeGain {get; set;}

        [BsonElement("trackPoints")]
        [JsonPropertyName("trackPoints")]
        public List<TrackPoint>? TrackPoints {get; set;} = new List<TrackPoint>();
    }
}