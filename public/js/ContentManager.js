// Used to download all needed resources from our
// webserver
function ContentManager() {
    // Method called back once all elements
    // have been downloaded
    var ondownloadcompleted;
    // Number of elements to download
    var NUM_ELEMENTS_TO_DOWNLOAD = 1;

    // setting the callback method
    this.SetDownloadCompleted = function (callbackMethod) {
        ondownloadcompleted = callbackMethod;
    };

    this.imgSkookum = new Image();

    // the background can be created with 3 different layers
    // those 3 layers exist in 3 versions
    this.imgBackgroundLayers = [];
    var numImagesLoaded = 0;

    // public method to launch the download process
    this.StartDownload = function () {
        SetDownloadParameters(this.imgSkookum, "img/logo.png", handleImageLoad, handleImageError);

        // // download the 3 layers * 3 versions
        // for (var i = 0; i < 3; i++) {
        //     this.imgBackgroundLayers[i] = new Array();
        //     for (var j = 0; j < 3; j++) {
        //         this.imgBackgroundLayers[i][j] = new Image();
        //         SetDownloadParameters(this.imgBackgroundLayers[i][j], "img/Backgrounds/Layer" + i 
        //                               + "_" + j + ".png", handleImageLoad, handleImageError);
        //     }
        // }
    };

    function SetDownloadParameters(imgElement, url, loadedHandler, errorHandler) {
        imgElement.src = url;
        imgElement.onload = loadedHandler;
        imgElement.onerror = errorHandler;
    }

    // our global handler 
    function handleImageLoad(e) {
        numImagesLoaded++;

        // If all elements have been downloaded
        if (numImagesLoaded == NUM_ELEMENTS_TO_DOWNLOAD) {
            numImagesLoaded = 0;
            // we're calling back the method set by SetDownloadCompleted
            ondownloadcompleted();
        }
    }

    //called if there is an error loading the image (usually due to a 404)
    function handleImageError(e) {
        console.log("Error Loading Image : " + e.target.src);
    }
}