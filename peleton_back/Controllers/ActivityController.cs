using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using peleton_back.Models;
using peleton_back.Services;
using System.Globalization;
using System.Linq;
using System.Xml.Linq;
using Swashbuckle.AspNetCore.SwaggerUI;

namespace peleton_back.Controllers {

    [Controller]
    [Route("api/[Controller]")]
    public class ActivityController : Controller{
        private readonly IActivityService _activityService;
        private readonly MongoDBService _mongoDBService;
        
        public ActivityController(MongoDBService mongoDBService, IActivityService activityService){
            _mongoDBService = mongoDBService;
            _activityService = activityService;
        }

        [HttpGet("get/list/activity")]
        public async Task<List<Activity>> GetActivities() {
            return await _mongoDBService.GetListAsync();
        }

        [HttpGet("get/activity/{id}")]
        public async Task<ActionResult<Activity>> GetActivity(string id) {
            var activity = await _mongoDBService.GetActivityAsync(id); 
            if (activity == null)
            {
                return BadRequest("I can't find the activity");
            }

            return Ok(activity);
        }

        [HttpPost("post/activity")]
        public async Task<IActionResult> Post(IFormFile file){
            if (file == null || file.Length == 0)
            {
                return BadRequest("No file uploaded");
            }

            List<TrackPoint> trackPoints;
            string name;
            using (var reader = new StreamReader(file.OpenReadStream()))
            {
                var content = await reader.ReadToEndAsync();
                trackPoints = ParseGpxContent(content);
                name = GetGpxName(content);
            }

            var activity = await _activityService.ProcessTrackPointsAsync(trackPoints, name);
            await _mongoDBService.CreateAsync(activity);

            return Ok("activity added succesfully");
        }

        private string GetGpxName(string content){
            
            string name = "GPX activity";

            try
            {
                var xml = XDocument.Parse(content);

                var namElement = xml.Descendants("{http://www.topografix.com/GPX/1/1}name").FirstOrDefault();
                if (namElement != null)
                {
                    name = namElement.Value;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error getting name: {ex.Message}");
            }

            return name;
        }

        private List<TrackPoint> ParseGpxContent(string content){
            
            var trackPoints = new List<TrackPoint>();

            try
            {
                var xml = XDocument.Parse(content);

                var trackPointsElements = xml.Descendants("{http://www.topografix.com/GPX/1/1}trkpt");

                foreach (var point in trackPointsElements)
                {
                    double lat = double.Parse(point.Attribute("lat")?.Value ?? "0", CultureInfo.InvariantCulture);
                    double lon = double.Parse(point.Attribute("lon")?.Value ?? "0", CultureInfo.InvariantCulture);
                    double ele = double.Parse(point.Element("{http://www.topografix.com/GPX/1/1}ele")?.Value ?? "0", CultureInfo.InvariantCulture);
                    DateTime time = DateTime.Parse(point.Element("{http://www.topografix.com/GPX/1/1}time")?.Value ?? DateTime.MinValue.ToString(), CultureInfo.InvariantCulture, DateTimeStyles.RoundtripKind);

                    trackPoints.Add(new TrackPoint
                    {
                        Lat = lat,
                        Lon = lon,
                        Ele = ele,
                        Time = time
                    });
                }
            }
            catch (Exception ex)
            {
                // Handle parsing errors
                Console.WriteLine($"Error parsing GPX content: {ex.Message}");
            }

            return trackPoints;
        }
    }
}