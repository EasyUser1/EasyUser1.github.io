function TrackingManager() {
    this.CallWebService = true;
    this.SessionId = 0;
    this.EnableDebugMode = false;
    this.SessionEndsPageUrl = "";
    this.IFrameClientId = "";

    // The control for writing debbuging information
    this._debuggingControl = null;

    // Write debug information in debug mode
    this.WriteDebugInformation = function(information) {
        if (this._debuggingControl != null) {
            this._debuggingControl.innerHTML += information.replace(/</g, "&lt;").replace(/>/g, "&gt;") + "<br/>"; // SAFE
        }
    }
    
    // Initialize the tracking manager
    this.Initialize = function () {
        if (this.EnableDebugMode && this.DebuggingControlId != "") {
            this._debuggingControl = $get(this.DebuggingControlId);
            this.WriteDebugInformation("[Initialize Tracking Session] Session Id: " + this.SessionId);
        }
    }
}

var _trackingManager = new TrackingManager();