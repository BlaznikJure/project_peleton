using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using peleton_back.Models;

namespace peleton_back.Services {
    public class ActivityService : IActivityService {

        public Task<Activity> ProcessTrackPointsAsync(List<TrackPoint> trackPoints, string name){

            if( trackPoints == null || trackPoints.Count < 2){

                throw new ArgumentException("At least two track points are required.");
            }

            var distance = CalculateDistance(trackPoints);
            var time = CalculateTime(trackPoints);
            var averageSpeed = CalculateAverageSpeed(distance, time);
            var altitudeGain = CalculateAltitudeGain(trackPoints);

            var activity = new Activity{
                Name = name,
                TrackPoints = trackPoints,
                Distance = Math.Round(distance, 2),
                Time = time,
                AverageSpeed = Math.Round(averageSpeed, 2),
                AltitudeGain = Math.Round(altitudeGain,2)
            };

            return Task.FromResult(activity);
        }

        private double CalculateDistance(List<TrackPoint> trackPoints){
            double distance = 0.0;
            for (int i = 1; i < trackPoints.Count; i++)
            {
                var point1 = trackPoints[i - 1];
                var point2 = trackPoints[i];
                distance += HaversineDistance(point1.Lat, point1.Lon, point2.Lat, point2.Lon);
            }
            return distance;
        }

        private TimeSpan CalculateTime(List<TrackPoint> trackPoints){
            var startTime = trackPoints.First().Time;
            var endTime = trackPoints.Last().Time;
            return endTime - startTime;
        }

        private double CalculateAverageSpeed (double distance, TimeSpan time){
            return distance / time.TotalHours;
        }

        private double CalculateAltitudeGain (List<TrackPoint> trackPoints){
            double gain = 0.0;
            double previousAltitude = trackPoints.First().Ele;

            foreach (var point in trackPoints)
            {
                if (point.Ele > previousAltitude)
                {
                    gain += point.Ele - previousAltitude;
                }

                previousAltitude = point.Ele;
            }

            return gain;
        }

        private double HaversineDistance(double lat1, double lon1, double lat2, double lon2)
        {
            var R = 6371.0; // Radius of Earth in kilometers
            var dLat = ToRadians(lat2 - lat1);
            var dLon = ToRadians(lon2 - lon1);
            var a = Math.Sin(dLat / 2) * Math.Sin(dLat / 2) +
                    Math.Cos(ToRadians(lat1)) * Math.Cos(ToRadians(lat2)) *
                    Math.Sin(dLon / 2) * Math.Sin(dLon / 2);
            var c = 2 * Math.Atan2(Math.Sqrt(a), Math.Sqrt(1 - a));
            return R * c;
        }

        private double ToRadians(double angle)
        {
            return angle * Math.PI / 180.0;
        }
    }
}