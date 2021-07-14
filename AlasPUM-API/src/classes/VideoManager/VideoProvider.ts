export default interface VideoProvider {
    listVideos(): void;
    getVideo (id:String): Promise<String>;
}