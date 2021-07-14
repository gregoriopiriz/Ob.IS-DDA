import VideoProvider from './VideoProvider';
export default class VideoProviderProxy implements VideoProvider{
    
    service: VideoProvider;

    videos: String[] = [];

    constructor(_service: VideoProvider) {
        this.service = _service;
    }


    listVideos() {}
    async getVideo(id:String){
        let video = "";
        for (let i = 0; i < this.videos.length; i++) {
            const element = this.videos[i];
            if(element.substring(0,3) == id){
                video = element.toString();
            }
        }
        if(video == ""){
            video = (await this.service.getVideo(id)).toString();
            if (!this.videos.includes(video)){
                this.videos.push(video);
            }
        }
        return video.toString().substring(3);
    }
}