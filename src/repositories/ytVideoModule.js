class YTVideoModule {
    getYTVideoUrl (uid, param='autoplay=1&mute=1&controls=0') {
        return `https://www.youtube.com/embed/${uid}?${param}`;
    }
}

export default YTVideoModule;