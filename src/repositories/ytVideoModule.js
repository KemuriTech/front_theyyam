class YTVideoModule {
  getYTVideoUrl (uid, param='autoplay=1&mute=1&controls=0') {
    return `https://www.youtube.com/embed/${uid}?${param}`;
  }
  isYTVideoValid (uid) {
    return new Promise((resolve,reject) => {
      let img = new Image()
      img.onload = () => resolve({ height: img.height, width: img.width })
      img.onerror = reject
      img.src = `https://img.youtube.com/vi/${uid}/mqdefault.jpg`;
    });
  }

  checkThumbnail (width) {
    if (width === 120) {
      return false;
    }
    return true;
  }

  async getValidUID(getAllYTUIDs) {
    const uids = getAllYTUIDs();
    let valid_uid = [];
    for (let i = 0; i < uids.length; i++) {
      await this.isYTVideoValid(uids[i])
        .then(dim => {
          if (this.checkThumbnail(dim.width))
            valid_uid.push(uids[i]);
        })
    }
    return valid_uid;
  }

  youtubeParser(url = ''){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
  }
}

export default YTVideoModule;