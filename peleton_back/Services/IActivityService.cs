using System.Collections.Generic;
using System.Threading.Tasks;
using peleton_back.Models;

namespace peleton_back.Services {
    public interface IActivityService {
        Task<Activity> ProcessTrackPointsAsync(List<TrackPoint> trackPoints, string name);
    }
}