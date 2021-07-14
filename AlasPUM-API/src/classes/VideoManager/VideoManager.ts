import VideoProvider from './VideoProvider';
export default class VideoManager {
    provider: VideoProvider
    constructor(_provider: VideoProvider) {
        this.provider = _provider
    }
}