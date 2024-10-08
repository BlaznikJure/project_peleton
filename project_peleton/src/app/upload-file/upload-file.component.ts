import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivityService } from '../shared/activity.service';

@Component({
  selector: 'app-upload-file',
  standalone: true,
  imports: [],
  templateUrl: './upload-file.component.html',
  styleUrl: './upload-file.component.css'
})
export class UploadFileComponent {
  private activityService = inject(ActivityService);

  fileSelected: boolean = false;
  selectedFile: File | null = null;

  constructor(private http: HttpClient){}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.fileSelected = true; // Show the Save button
    } else {
      this.fileSelected = false; // Hide the Save button
    }
  }

  sendFile(): void{
      if (!this.selectedFile) {
        return;
      }
  
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      
      this.http.post('http://localhost:5138/api/Activity/post/activity',formData)
        .subscribe({
          next: (response) => {
            console.log('File successfully uploaded', response);
            // Handle success (e.g., show a success message, clear the form, etc.)
          },
          error: (error) => {
            console.error('Error uploading file', error);
            // Handle error (e.g., show an error message)
          }
      });

      
  
  }
  
  



}











// async getFile(): Promise<void> {
  //   if (this.selectedFile) {
      
  //     const trackPoints = await this.extractTracksFromGpx(this.selectedFile);

  //     const json = this.convertTracksToJson(trackPoints);
      
  //     console.log(json);

  //     this.extractNameAndType(this.selectedFile);
      

  //   }
  // }

  // private extractTracksFromGpx(file: File): Promise<any[]> {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();

  //     reader.onload = async (e: ProgressEvent<FileReader>) => {
  //       const fileContent = e.target?.result as string;

  //       // Parse the XML with namespace support
  //       const parser = new xml2js.Parser({ explicitArray: false, mergeAttrs: true });
        
  //       parser.parseString(fileContent, (err, result) => {
  //         if (err) {
  //           reject(err);
  //         } else {
  //           try {
  //             const trackPoints = result?.gpx?.trk?.trkseg?.trkpt;

  //             if (trackPoints && Array.isArray(trackPoints)) {
  //               const formattedTrackPoints = trackPoints.map((trkpt: any) => ({
  //                 lat: parseFloat(trkpt.lat),
  //                 lon: parseFloat(trkpt.lon),
  //                 ele: parseFloat(trkpt.ele),
  //                 time: trkpt.time
  //               }));
  //               resolve(formattedTrackPoints);
  //             } else if (trackPoints) {  // Handle single track point case
  //               resolve([{
  //                 lat: parseFloat(trackPoints.lat),
  //                 lon: parseFloat(trackPoints.lon),
  //                 ele: parseFloat(trackPoints.ele),
  //                 time: trackPoints.time
  //               }]);
  //             } else {
  //               resolve([]);
  //             }
  //           } catch (error) {
  //             console.error('Error processing GPX file:', error);
  //             resolve([]);
  //           }
  //         }
  //       });
  //     };

  //     reader.readAsText(file); // Read the file as text
  //   });
  // }

  // private convertTracksToJson(trackPoints: any[]): any {
  //   return trackPoints; // Since trackPoints is already an array of objects, it's effectively a JSON object
  // }

  // private extractNameAndType(file: File): void {
  //   const reader = new FileReader();

  //   reader.onload = (e: ProgressEvent<FileReader>) => {
  //     const fileContent = e.target?.result as string;

  //     // Parse the XML with namespace support
  //     const parser = new xml2js.Parser({ explicitArray: false, mergeAttrs: true });
      
  //     parser.parseString(fileContent, (err, result) => {
  //       if (err) {
  //         console.error('Error parsing GPX file for name and type:', err);
  //         return;
  //       }

  //       let name = result?.gpx?.metadata?.name || result?.gpx?.trk?.name || 'Unknown';
  //       let type = result?.gpx?.metadata?.type || result?.gpx?.trk?.type || 'Unknown';

  //       this.nameAndTypeEdit(name, type);
  //     });
  //   };

  //   reader.readAsText(file); // Read the file as text
  // }

  // private nameAndTypeEdit(name: string, type: string): void {
  //   this.gpxName = name;
  //   this.nameDisplay = true;
  //   this.gpxType = type;
  // }
