import VideoProvider from './VideoProvider';
import fs from 'fs';
import path from 'path';
import Video from '../../models/Video';
export default class VideoProviderClass implements VideoProvider {

    constructor() { }


    listVideos() { }
    async getVideo(id: String) {
        const bdvideo = await Video.findOne({ planeId: id.toString() })
        let v = '';

        if (bdvideo) {
            v = `${id}${bdvideo.videoURL}`
        }

        return v;
    }

}