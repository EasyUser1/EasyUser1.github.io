var ErrorCode =
{
    NoError: "0",
    GeneralException: "101",
    InitializationFailure: "102",
    AlreadyInitialized : "103",
    ContentInstanceTerminated: "104",
    TerminationFailure: "111",
    TerminationBeforeInitialization: "112",
    TerminationAfterTermination : "113",
    RetrieveDataBeforeInitialization: "122",
    RetrieveDataAfterTermination: "123",
    StoreDataBeforeInitialization: "132",
    StoreDataAfterTermination: "133",
    CommitBeforeInitialization: "142",
    CommitAfterTermination: "143",
    ArgumentError: "201",
    GetFailure: "301",
    SetFailure: "351",
    CommitFailure: "391",
    UndefinedDataModelElement: "401",
    UnimplementedDataModelElement: "402",
    DataModelElementValueNotInitialized: "403",
    ReadOnlyDataModelElement: "404",
    WriteOnlyDataModelElement: "405",
    DataModelElementTypeMismatch: "406",
    DataModelElementValueOutOfRange: "407",
    DataModelDependencyNotEstablished: "408"
}; 

var SCORM2004_ErrorStrings =
{
    "0" : "No Error",
    "101" : "General Exception",
    "102" : "General Initialization Failure",
    "103" : "Already Initialized",
    "104" : "Content Instance Terminated",
    "111" : "General Termination Failure",
    "112" : "Termination Before Initialization",
    "113" : "Termination AFter Termination",
    "122" : "Retrieve Data Before Initialization",
    "123" : "Retrieve Data After Termination",
    "132" : "Store Data Before Initialization",
    "133" : "Store Data After Termination",
    "142" : "Commit Before Initialization",
    "143" : "Commit After Termination",
    "201" : "General Argument Error",
    "301" : "General Get Failure",
    "351" : "General Set Failure",
    "391" : "General Commit Failure",
    "401" : "Undefined Data Model Element",
    "402" : "Unimplemented Data Model Element",
    "403" : "Data Model Element Value Not Initialized",
    "404" : "Data Model Element Is Read Only",
    "405" : "Data Model Element Is Write Only",
    "406" : "Data Model Element Type Mismatch",
    "407" : "Data Model Element Value Out Of Range",
    "408" : "Data Model Dependency Not Established"
};

// Standard Data Type Definition
var CMIString256 = '^[\\u0000-\\uffff]{0,255}$';
var CMIString4096 = '^[\\u0000-\\uffff]{0,4096}$'; 
var CMIDecimal = '^-?([0-9]{0,2})(\.[0-9]+)?$';
var CMIIdentifier = '^\\S{0,250}[a-zA-Z0-9-_:.]+$';
var CMILongIdentifier = '^(?:(?!urn:)\\S{1,4000}|urn:[A-Za-z0-9-]{1,31}:\\S{1,4000})$';
var CMITime = '^(19[7-9]{1}[0-9]{1}|20[0-2]{1}[0-9]{1}|203[0-8]{1})((-(0[1-9]{1}|1[0-2]{1}))((-(0[1-9]{1}|[1-2]{1}[0-9]{1}|3[0-1]{1}))(T([0-1]{1}[0-9]{1}|2[0-3]{1})((:[0-5]{1}[0-9]{1})((:[0-5]{1}[0-9]{1})((\\.[0-9]{1,2})((Z|([+|-]([0-1]{1}[0-9]{1}|2[0-3]{1})))(:[0-5]{1}[0-9]{1})?)?)?)?)?)?)?)?$';
var CMITimespan = '^P(\\d+Y)?(\\d+M)?(\\d+D)?(T(((\\d+H)(\\d+M)?(\\d+(\.\\d{1,2})?S)?)|((\\d+M)(\\d+(\.\\d{1,2})?S)?)|((\\d+(\.\\d{1,2})?S))))?$';
//old one: (seemed to be working quite well) CMITimespan = '^P(d+Y)?(d+M)?(d+D)?(T(d+H)?(d+M)?(d+(\.d{1,2})?S)?)?';

// Vocabulary definition
var CMICompletionStatus = '^completed$|^not attempted$|^incomplete$|^unknown$';
var CMISuccessStatus = '^passed$|^failed$|^unknown$';
var CMIExit = '^time-out$|^suspend$|^logout$|^normal$|^$';
var CMIAudioCaptioning = '^-1$|^0$|^1$';
var CMINavRequest = '^continue$|^previous$|^{target=.+}choice$|^{target=.+}jump$|^exit$|^exitAll$|^abandon$|^abandonAll$|^suspendAll$|^_none_$';
var CMIInteractionType = '^true-false$|^choice$|^fill-in$|^long-fill-in$|^matching$|^performance$|^sequencing$|^likert$|^numeric$|^other$';
var CMIInteractionResult = '^correct$|^incorrect$|^unanticipated$|^neutral$|^([0-9]{0,3})?(\.[0-9]{1,2})?$';

function Comments() {
    this.comment = null;
    this.location = "";
    this.timestamp;
}

function CorrectReponse()
{
    this.pattern;
}

function InteractionObjective() {
    this.id;
}

function Score() {
    this.scaled;
    this.raw;
    this.min;
    this.max;
}

function Objective() {
    this.id;
    this.score = new Score();
    this.success_status = "unknown";
    this.completion_status = "unknown";
    this.progress_measure;
    this.description;
}

function Interaction() 
{
    this.id;
    this.type;
    this.objectives = new Array();
    this.timestamp;
    this.correct_responses = new Array();
    this.weighting;
    this.learner_response;
    this.result;
    this.latency;
    this.description;
}

function LearnerPreference() 
{
    this.audio_level = "1.0";
    this.language = "";
    this.delivery_speed = "1.0";
    this.audio_captioning = "0";
}

function Nav()
{
    this.request = "_none_";
    this.request_valid = { "continue": "unknown", "previous": "unknown", "choice": "unknown", "jump": "unknown" };
}

function Scorm2004RTE()
{
    this.comments_from_learner = new Array();
    this.comments_from_lms = new Array();
    this.completion_status = "unknown";
    this.completion_threshold = -1;
    this.credit = "credit";
    this.entry = "ab-initio";
    this.exit = "";
    this.interactions = new Array();
    this.launch_data = "";
    this.learner_id;
    this.learner_name;
    this.learner_preference = new LearnerPreference();
    this.location;
    this.max_time_allowed;
    this.mode = "normal";
    this.objectives = new Array();
    this.progress_measure = "";
    this.scaled_passing_score;
    this.score = new Score();
    // TODO: The cmi.session_time data model element is the amount of time that the learner has 
    // spent in the current learner session for this SCO. If no learner session is in progress, then
    // the session time is the time the learner spent in the last learner session for this SCO.
    this.session_time;
    this.success_status = "unknown";
    this.suspend_data;
    this.time_limit_action = "continue,no message";
    this.total_time = "0000:00:00.00";

    // This is the ADL Object
    this.data = new Array();

    this.nav = new Nav();

    // Vimago only
    this.learner_firstname = "";
    this.learner_surname = "";
}

var scorm2004RTE = new Scorm2004RTE();


function ADLData() {
    this.id = "";
    this.store;
}

var CommunicationState = { NotInitialized: 0, Running: 1, Terminated: 2 };

function Scorm2004API()
{
    this.SupportSequencing = false;
    this.OnCloseCallBack = null;
    this._state = CommunicationState.NotInitialized;
    this._errorCode = ErrorCode.NoError;
    this._onCommitCompletedCallback = null;
    this._onCommitErrorCallback = null;

    // Indicates if Commit must be called
    this._callCommit = true;

    // List of listeners
    this._events = new Sys.EventHandlerList();

    this.AddListener = function (eventName, eventHandler)
    {
        this._events.addHandler(eventName, eventHandler);
    }

    this.GetTerminateCalledEventName = function ()
    {
        return "terminateCalled";
    }

    this.GetCommitCalledEventName = function ()
    {
        return "commitCalled";
    }

    this.GetSetValueCalledEventName = function ()
    {
        return "setValueCalled";
    }

    this.Initialize = function (param)
    {
        _trackingManager.WriteDebugInformation("SCORM 2004 [Initialize] " + param);

        this._errorCode = ErrorCode.NoError;

        if (param == "")
        {
            switch (this._state)
            {
                case CommunicationState.NotInitialized:
                    // The communication is now establised
                    this._state = CommunicationState.Running;
                    return "true";

                case CommunicationState.Running:
                    // We are already communicating
                    this._errorCode = ErrorCode.AlreadyInitialized;
                    break;

                case CommunicationState.Terminated:
                    // The communication was terminated
                    this._errorCode = ErrorCode.ContentInstanceTerminated;
                    break;

                default:
                    this._errorCode = ErrorCode.InitializationFailure;
                    break;

            }
        }
        else
        {
            this._errorCode = ErrorCode.ArgumentError;
        }
        return "false";
    }

    // TODO: A SCO is permitted, in a single communication session, to perform multiple sets of session time (cmi.session_time). When the SCO issues the
    // Terminate() or the user navigates away, the LMS shall take the last cmi.session_time that the SCO set (if there was one set) and accumulate this
    // time to the cmi.total_time.
    this.Terminate = function (param)
    {
        _trackingManager.WriteDebugInformation("[Terminate] " + param);
        this._errorCode = ErrorCode.NoError;

        if (param == "")
        {
            switch (this._state)
            {
                case CommunicationState.Running:

                    // We have to call Commit because of the End time
                    this._callCommit = true;
                    this._Commit();

                    // Call the landing page if there is one specified
                    // TODO: Check if there is any navigation request, otherwise, redirect the user to the landing page. 
                    if (_trackingManager.IFrameClientId != "" && _trackingManager.SessionEndsPageUrl != "")
                    {
                        // Set the URL
                        // The status is either the completion_status or the success_status depending if the SCO is completed or not
                        var status = scorm2004RTE.completion_status;
                        if (status == "completed")
                        {
                            status = scorm2004RTE.success_status;
                            if (status == "unknown") status = "completed";
                        }

                        // Chrome c'est de la merde. Must use a timeout to have the page loaded, see bug 60552.
                        setTimeout(function () { $get(_trackingManager.IFrameClientId).src = _trackingManager.SessionEndsPageUrl + "?mode=SCORM2004&passmark=" + scorm2004RTE.scaled_passing_score * 100 + "&score=" + scorm2004RTE.score.raw + "&status=" + status + "&duration=" + scorm2004RTE.session_time + (_trackingManager.CallWebService ? "" : "&resume=false"); }, 0);
                    }

                    if (this.OnCloseCallBack != null)
                    {
                        this.OnCloseCallBack();
                    }

                    this._initialized = false;

                    // Notify listeners
                    var handler = this._events.getHandler(this.GetTerminateCalledEventName());
                    if (handler != null) handler(this, "");

                    // Reset the state
                    this._state = CommunicationState.NotInitialized;

                    return "true";

                case CommunicationState.Terminated:
                    this._errorCode = ErrorCode.TerminationAfterTermination;
                    break;

                case CommunicationState.NotInitialized:
                    // Communication was not initialized before calling Terminate
                    this._errorCode = ErrorCode.TerminationBeforeInitialization;
                    break;

                default:
                    this._errorCode = ErrorCode.TerminationFailure;
                    break;

            }
        }
        else
        {
            this._errorCode = ErrorCode.ArgumentError;
        }
        return "false";
    }

    this.GetValue = function (element)
    {
        var returnValue = this._GetValue(element);

        // ignore for cmi.location and cmi.suspend_data as this is a "normal" error
        // Assima lessons and courses makes a call to learner_name as well, ignore.
        if (this._errorCode == ErrorCode.NoError || element == "cmi.location" || element == "cmi.suspend_data" || element == "cmi.learner_name")
            _trackingManager.WriteDebugInformation("[GetValue] " + element + " : " + returnValue);
        else
        {
            _trackingManager.WriteDebugInformation("[GetValue] ERROR " + element + " : " + returnValue + '. Error is: ' + this.GetDiagnostic(this._errorCode));
        }
        return returnValue;
    }

    this._GetValue = function (element)
    {
        switch (this._state)
        {
            case CommunicationState.NotInitialized:
                this._errorCode = ErrorCode.RetrieveDataBeforeInitialization;
                return "";
            case CommunicationState.Terminated:
                this._errorCode = ErrorCode.RetrieveDataAfterTermination;
                return "";
        }
        
        this._errorCode = ErrorCode.NoError;

        // Are we looking in the CMI Data Model or the Navigation data model?
        if (element.indexOf("adl") == 0)
        {
            // Navigation request
            return this._GetADLValue(element.replace("adl.", ""));
        }
        else
        {
            // We assume this is the CMI Data Model
            return this._GetCMIValue(element);
        }
    }

    this._GetADLValue = function (elementToFind)
    {
        switch (elementToFind)
        {
            // ADL    
            case "data._children":
                return "id,store";

            case "data._count":
                return scorm2004RTE.data.length;

            case "nav.request":
                return eval("scorm2004RTE." + elementToFind);
        }

        // Do we need to check if a request is valid?
        if (elementToFind.indexOf('nav.request_valid.') == 0)
        {
            // We may or may not support sequencing depending if we are or not in a course.
            if (this.SupportSequencing)
            {
                // The request to validate
                var request = new Request();

                // Remove the "request_valid."
                var temp = elementToFind.replace(/^nav.request_valid./gi, "");

                switch (temp)
                {
                    case "continue":
                        request.NavRequest = NavRequest.Continue;
                        break;
                    case "previous":
                        request.NavRequest = NavRequest.Previous;
                        break;
                }

                if (request.NavRequest == NavRequest.None)
                {
                    // Choice or jump?
                    if (new RegExp('^jump.{target=.+}$').test(temp))
                    {
                        request.NavRequest = NavRequest.Jump;
                        request.SetTargetActivityIdentifier(temp.replace(/^jump.{target=/gi, "").replace(/}$/gi, ""));
                    }
                    else
                    {
                        if (new RegExp('^choice.{target=.+}$').test(temp))
                        {
                            request.NavRequest = NavRequest.Choice;
                            request.SetTargetActivityIdentifier(temp.replace(/^choice.{target=/gi, "").replace(/}$/gi, ""));
                        }
                    }
                }

                if (request.NavRequest != NavRequest.None)
                {
                    if (CheckRequestValidity(request)) return "true";
                    else return "false";
                }
            }
        }

        // Invalid get
        return "false";
    }

    this._GetCMIValue = function (element)
    {
        var elementToFind = element.replace("cmi.", "");

        switch (elementToFind)
        {
            case "_version":
                return "1.0";

            case "comments_from_learner._children":
            case "comments_from_lms._children":
                return "comment,location,timestamp";

            case "learner_preference._children":
                return "audio_level,language,delivery_speed,audio_captioning";

            case "score._children":
                return "scaled,min,max,raw";

            case "objectives._children":
                return "id,score,success_status,completion_status,progress_measure,description";

            case "comments_from_learner._count":
                return scorm2004RTE.comments_from_learner.length;

            case "comments_from_lms._count":
                return scorm2004RTE.comments_from_lms.length;

            case "interactions._count":
                return scorm2004RTE.interactions.length;

            case "objectives._count":
                return scorm2004RTE.objectives.length;

            case "completion_status":

                // Do we have a completion threshold?
                if (scorm2004RTE.completion_threshold != "" && scorm2004RTE.completion_threshold > -1)
                {
                    // We have a completion threshold
                    if (scorm2004RTE.progress_measure != "" && scorm2004RTE.progress_measure > -1)
                    {
                        // See page 96
                        if (scorm2004RTE.progress_measure < scorm2004RTE.completion_threshold)
                        {
                            scorm2004RTE.completion_status = "incomplete";
                        }
                        else
                            scorm2004RTE.completion_status = 'completed';
                    }
                    else
                    {
                        // progress_measure is not defined
                        scorm2004RTE.completion_status = "unknown";
                    }
                }

                return scorm2004RTE.completion_status;

            case "completion_threshold":

                if (scorm2004RTE.completion_threshold == -1)
                {
                    this._errorCode = ErrorCode.DataModelElementValueNotInitialized;
                    return "";
                }
                return scorm2004RTE.completion_threshold;


                // Not important if the SCO set the value first or not
            case "credit":
            case "entry":
            case "launch_data":
            case "learner_id":
            case "learner_name":
            case "learner_preference.audio_level":
            case "learner_preference.language":
            case "learner_preference.delivery_speed":
            case "learner_preference.audio_captioning":
            case "mode":
            case "time_limit_action":
            case "learner_firstname": // Vimago only
            case "learner_surname": // Vimago only
                return eval("scorm2004RTE." + elementToFind);

                // Check if the value has been set first by the SCO
            case "location":

            case "max_time_allowed":
            case "progress_measure":
            case "scaled_passing_score":

            case "score.min":
            case "score.max":
            case "score.raw":
            case "score.scaled":

            case "suspend_data":

                var value = eval("scorm2004RTE." + elementToFind);
                if (value == null)
                {
                    this._errorCode = ErrorCode.DataModelElementValueNotInitialized;
                    return "";
                }

                return value;

            case "exit":
            case "session_time":
                this._errorCode = ErrorCode.WriteOnlyDataModelElement;
                return "";

            case "interactions._children":
                return "id,type,objectives,timestamp,correct_responses,weighting,learner_response,result,latency,description";

            case "objectives.score._children":
                return "scaled,raw,min,max";

            case "success_status":
                // Do we have a scaled_passing_score?
                if (scorm2004RTE.scaled_passing_score != null)
                {
                    // We do
                    if (scorm2004RTE.score.scaled != null)
                    {
                        // See page 183
                        if (scorm2004RTE.score.scaled < scorm2004RTE.scaled_passing_score)
                        {
                            scorm2004RTE.success_status = "failed";
                        }
                        else
                            scorm2004RTE.success_status = "passed";
                    }
                    else
                    {
                        // score.scaled is not defined
                        scorm2004RTE.success_status = "unknown";
                    }
                }

                return scorm2004RTE.success_status;

            case "total_time":
                return scorm2004RTE.total_time;
        }

        // Did not find it? might be a collection
        var regExp = new RegExp('[._](\\d+).', 'g');

        var returnValue = "";

        // Search for a .n.
        var temp = element.replace(regExp, '|n|').split('|');

        if (temp.length >= 3)
        {
            // we have a collection
            var collectionName = temp[0].replace("cmi.", "").replace("adl.", "");
            var collectionIndex = parseInt(element.replace(regExp, '|$1|').split('|')[1]);

            // Check collection size
            if (collectionIndex >= eval("scorm2004RTE." + collectionName).length)
            {
                this._errorCode = ErrorCode.GetFailure;
                return "";
            }

            // Check if we have other dots
            if (temp.length == 3)
            {
                var propertyName = temp[2];

                switch (propertyName)
                {
                    case "objectives._count":
                    case "correct_responses._count":
                        return eval("scorm2004RTE." + collectionName + "[" + collectionIndex + "]." + propertyName.split('.')[0] + ".length");

                    case "score._children":
                        return "scaled,raw,min,max";
                    default:
                        break;

                }

                returnValue = eval("scorm2004RTE." + collectionName + "[" + collectionIndex + "]." + propertyName);
            }
            else
            {
                // We have several collections
                var secondCollectionName = temp[2];
                var secondCollectionIndex = parseInt(element.replace(regExp, '|$1|').split('|')[3]);
                var secondPropertyName = temp[4];

                // Check collection size
                var theCollection = eval("scorm2004RTE." + collectionName + "[" + collectionIndex + "]." + secondCollectionName);

                if (secondCollectionIndex >= theCollection.length)
                {
                    this._errorCode = ErrorCode.GetFailure;
                    return "";
                }

                returnValue = eval("scorm2004RTE." + collectionName + "[" + collectionIndex + "]." + secondCollectionName + "[" + secondCollectionIndex + "]." + secondPropertyName);
            }

            // Check Initialization Constraint
            if (returnValue == null)
            {
                this._errorCode = ErrorCode.DataModelElementValueNotInitialized;
                return "";
            }

            return returnValue;
        }
        else
        {
            // No idea what this element is
            this._errorCode = ErrorCode.UndefinedDataModelElement;
            return "";
        }
    }

    this._EnsureTypeIsCorrect = function (valueToCheck, regexp)
    {
        if (new RegExp(regexp).test(valueToCheck))
        {
            return true;
        }
        else
        {
            this._errorCode = ErrorCode.DataModelElementTypeMismatch;
            return false;
        }
    }

    this.SetValue = function (element, value)
    {
        var returnValue = this._SetValue(element, value);

        if (this._errorCode == ErrorCode.NoError)
        {
            this._callCommit = true;
            _trackingManager.WriteDebugInformation("[SetValue] set " + element + " to: " + value);

            // Notify listeners
            var handler = this._events.getHandler(this.GetSetValueCalledEventName());
            if (handler != null) handler(this, element);
        }
        else
        {
            _trackingManager.WriteDebugInformation("[SetValue] ERROR when setting " + element + " to: " + value + '. Error is: ' + this.GetErrorString(this._errorCode));
        }
        return returnValue;
    }

    this._SetValue = function (element, value)
    {
        switch (this._state)
        {
            case CommunicationState.NotInitialized:
                this._errorCode = ErrorCode.StoreDataBeforeInitialization;
                return "false";
            case CommunicationState.Terminated:
                this._errorCode = ErrorCode.StoreDataAfterTermination;
                return "false";
        }

        this._errorCode = ErrorCode.NoError;

        var elementNotFound = false;

        switch (element)
        {
            case "cmi.completion_status":
                // Check constraint
                if (this._EnsureTypeIsCorrect(value, CMICompletionStatus))
                    scorm2004RTE.completion_status = value;
                break;

            case "cmi.exit":
                // Check constraint
                if (this._EnsureTypeIsCorrect(value, CMIExit))
                    scorm2004RTE.exit = value;
                break;

            case "cmi.learner_preference.audio_level":
                // Check constraint
                if (this._EnsureTypeIsCorrect(value, CMIDecimal))
                {
                    // Check range
                    if (value >= 0) scorm2004RTE.learner_preference.audio_level = value;
                    else this._errorCode = ErrorCode.DataModelElementValueOutOfRange;
                }
                break;

            case "cmi.learner_preference.language":
                // Check constraint
                if (this._EnsureTypeIsCorrect(value, CMIString256))
                    scorm2004RTE.learner_preference.language = value;
                break;

            case "cmi.learner_preference.delivery_speed":
                // Check constraint
                if (this._EnsureTypeIsCorrect(value, CMIDecimal))
                {
                    // Check range
                    if (value >= 0) scorm2004RTE.learner_preference.delivery_speed = value;
                    else this._errorCode = ErrorCode.DataModelElementValueOutOfRange;
                }
                break;

            case "cmi.learner_preference.audio_captioning":
                // Check constraint
                if (this._EnsureTypeIsCorrect(value, CMIAudioCaptioning))
                    scorm2004RTE.learner_preference.audio_captioning = value;
                break;

            case "cmi.location":
                scorm2004RTE.location = value;
                return "true";

            case "cmi.score.min":
                // Check constraint
                if (this._EnsureTypeIsCorrect(value, CMIDecimal))
                    scorm2004RTE.score.min = value;
                break;

            case "cmi.score.max":
                // Check constraint
                if (this._EnsureTypeIsCorrect(value, CMIDecimal))
                    scorm2004RTE.score.max = value;
                break;

            case "cmi.score.scaled":
                // Check constraint
                if (this._EnsureTypeIsCorrect(value, CMIDecimal))
                {
                    // Check range
                    if (value >= -1.0 && value <= 1) scorm2004RTE.score.scaled = value;
                    else this._errorCode = ErrorCode.DataModelElementValueOutOfRange;
                }
                break;

            case "cmi.score.raw":
                // Check constraint
                if (this._EnsureTypeIsCorrect(value, CMIDecimal))
                    scorm2004RTE.score.raw = value;
                break;

            case "cmi.session_time":
                // Check constraint
                if (this._EnsureTypeIsCorrect(value, CMITimespan))
                    scorm2004RTE.session_time = value;
                break;

            case "cmi.success_status":
                // Check constraint
                if (this._EnsureTypeIsCorrect(value, CMISuccessStatus))
                    scorm2004RTE.success_status = value;
                break;

            case "cmi.suspend_data":
                scorm2004RTE.suspend_data = value;
                break;

            case "adl.nav.request":
                // Check constraint
                if (this._EnsureTypeIsCorrect(value, CMINavRequest))
                    scorm2004RTE.nav.request = value;
                break;

            case "cmi.progress_measure":
                // Check constraint
                if (this._EnsureTypeIsCorrect(value, CMIDecimal))
                {
                    // Check range
                    if (value >= 0 && value <= 1) scorm2004RTE.progress_measure = value;
                    else this._errorCode = ErrorCode.DataModelElementValueOutOfRange;
                }
                break;

            default:
                elementNotFound = true;
                break;
        }

        // Did we found the element?
        if (!elementNotFound)
        {
            // We did, check the error code
            if (this._errorCode != ErrorCode.NoError)
            {
                // There was an error, return false
                return "false";
            }

            // Everything is fine
            return "true";
        }

        // Did not find it? might be a collection
        var regExp = new RegExp('[._](\\d+).', 'g');

        // Search for a .n.
        var temp = element.replace(regExp, '|n|').split('|');

        if (temp.length >= 3)
        {
            // we have a collection
            var collectionName = temp[0].replace("cmi.", "").replace("adl.", "");
            var collectionIndex = parseInt(element.replace(regExp, '|$1|').split('|')[1]);
            var propertyName = temp[2];

            if (collectionName == "data" && propertyName == "id")
            {
                this._errorCode = ErrorCode.ReadOnlyDataModelElement;
                return "false";
            }

            // Check if we have any dot in this propertyName
            var propertyNameSplit = propertyName.split('.');

            if (propertyNameSplit.length == 1)
            {
                // Test if the member exists
                if (this.GetValue("cmi." + collectionName + "._children").indexOf(propertyName) == -1)
                {
                    this._errorCode = ErrorCode.UnimplementedDataModelElement;
                    return "false";
                }
            }

            // Check collection size
            var theCollection = eval("scorm2004RTE." + collectionName);

            if (collectionIndex > theCollection.length)
            {
                this._errorCode = ErrorCode.SetFailure;
                return "false";
            }

            // Add entry?
            if (collectionIndex == theCollection.length)
            {
                // Add an entry
                theCollection[collectionIndex] = this._AddNewElement(collectionName);
            }

            // Check some additional constraints
            switch (collectionName)
            {
                case "interactions":
                    // We need to make sure the id has been set first
                    if (propertyName != "id")
                    {
                        var id = eval("scorm2004RTE." + collectionName + "[" + collectionIndex + "].id");
                        if (id == null)
                        {
                            this._errorCode = ErrorCode.DataModelDependencyNotEstablished;
                            return "false";
                        }
                    }
                    break;
                case "objectives":
                    if (propertyName == "id")
                    {
                        // Check Type Constraint
                        if (this._EnsureTypeIsCorrect(value, CMILongIdentifier))
                        {
                            // Ensure the id has not been already set
                            var currentValue = eval("scorm2004RTE.objectives[" + collectionIndex + "].id");
                            if (currentValue != null && currentValue != value)
                            {
                                this._errorCode = ErrorCode.SetFailure;
                                return "false";
                            }

                            // Ensure this id is not already used
                            for (var i = 0; i < scorm2004RTE.objectives.length; i++)
                            {
                                if (scorm2004RTE.objectives[i].id == value)
                                {
                                    this._errorCode = ErrorCode.SetFailure;
                                    return "false";
                                }
                            }
                        }
                        else
                        {
                            return "false";
                        }
                    }
                    break;
            }

            // Check if we have other dots
            if (temp.length == 3)
            {
                var propertyName = temp[2];

                // Check the type mismatch constraint


                switch (propertyName)
                {
                    /* cmi.objectives */ 

                    case "score.scaled":
                        if (this._EnsureTypeIsCorrect(value, CMIDecimal))
                        {
                            // Check range
                            if (value < -1 || value > 1)
                            {
                                this._errorCode = ErrorCode.DataModelElementValueOutOfRange;
                                return "false";
                            }
                        }
                        else return "false";
                        break;

                    case "score.raw":
                    case "score.min":
                    case "score.max":
                    case "weighting":
                        if (!this._EnsureTypeIsCorrect(value, CMIDecimal))
                            return "false";
                        break;

                    case "success_status":
                        if (!this._EnsureTypeIsCorrect(value, CMISuccessStatus))
                            return "false";
                        break;

                    case "completion_status":
                        if (!this._EnsureTypeIsCorrect(value, CMICompletionStatus))
                            return "false";
                        break;

                    case "progress_measure":
                        if (this._EnsureTypeIsCorrect(value, CMIDecimal))
                        {
                            // Check range
                            if (value < 0 || value > 1)
                            {
                                this._errorCode = ErrorCode.DataModelElementValueOutOfRange;
                                return "false";
                            }
                        }
                        else return "false";
                        break;

                    /* cmi.interactions */ 
                    case "id":
                        if (!this._EnsureTypeIsCorrect(value, CMILongIdentifier))
                            return "false";
                        break;

                    case "type":
                        if (!this._EnsureTypeIsCorrect(value, CMIInteractionType))
                            return "false";
                        break;

                    case "timestamp":
                        if (!this._EnsureTypeIsCorrect(value, CMITime))
                            return "false";
                        break;

                    case "result":
                        if (!this._EnsureTypeIsCorrect(value, CMIInteractionResult))
                            return "false";
                        break;

                    case "latency":
                        if (!this._EnsureTypeIsCorrect(value, CMITimespan))
                            return "false";
                        break;

                    default:

                        break;
                }

                // Set the value
                eval("scorm2004RTE." + collectionName + "[" + collectionIndex + "]." + propertyName + "='" + this._CleanString(value) + "';");

                return "true";
            }
            else
            {
                // We have several collections                
                var secondCollectionName = temp[2];
                var secondCollectionIndex = parseInt(element.replace(regExp, '|$1|').split('|')[3]);
                var secondPropertyName = temp[4];

                // Check collection size
                var theCollection = eval("scorm2004RTE." + collectionName + "[" + collectionIndex + "]." + secondCollectionName);

                if (secondCollectionIndex > theCollection.length)
                {
                    this._errorCode = ErrorCode.SetFailure;
                    return "false";
                }
                // Add entry?
                if (secondCollectionIndex == theCollection.length)
                {
                    // Add an entry
                    theCollection[secondCollectionIndex] = this._AddNewElement(collectionName + "." + secondCollectionName);
                }


                // Check some additional constraints
                switch (secondCollectionName)
                {
                    case "objectives":
                        // Page 112:
                        // If the supplied value of the SetValue() is a value that has already been used (not unique within the set of
                        // interaction objective identifiers) in an earlier array position within a learner attempt, then the LMS shall set
                        // the error code to 351 – General Set Failure and return “false”
                        if (secondPropertyName == "id")
                        {
                            // Check Type Constraint
                            if (!this._EnsureTypeIsCorrect(value, CMILongIdentifier))
                                return "false";

                            // Check if the id has been used before within the same set of ojectives
                            // See 1.4-13 (page 18) at http://www.adlnet.gov/wp-content/uploads/2011/07/SCORM2004-3rd_ImpactSummary.pdf
                            for (var i = 0; i < scorm2004RTE.interactions[collectionIndex].objectives.length; i++)
                            {
                                if (scorm2004RTE.interactions[collectionIndex].objectives[i].id == value)
                                {
                                    this._errorCode = ErrorCode.SetFailure;
                                    return "false";
                                }
                            }                            
                        }
                        break;
                    case "correct_responses":
                        // Page 115: 
                        // Prior to setting any associated interaction correct response, the SCO is required to have set the interaction’s 
                        // cmi.interactions.n.id and cmi.interactions.n.type
                        if (secondPropertyName == "pattern" || secondPropertyName == "learner_response")
                        {
                            if (eval("scorm2004RTE.interactions[" + collectionIndex + "].type") == null)
                            {
                                this._errorCode = ErrorCode.DataModelDependencyNotEstablished;
                                return "false";
                            }
                        }
                        break;
                }

                // Set the value
                eval("scorm2004RTE." + collectionName + "[" + collectionIndex + "]." + secondCollectionName + "[" + secondCollectionIndex + "]." + secondPropertyName + "='" + this._CleanString(value) + "';");

                return "true";
            }
        }

        // Data model is read only
        this._errorCode = ErrorCode.ReadOnlyDataModelElement;
        return "false";
    }

    // Before giving the string to the eval() method, get rid of the <br> and quotes
    this._CleanString = function (str)
    {
        // Clean the string before
        return str.toString().replace(/\r\n/g, "<br/>").replace(/\n/g, "<br/>").replace(/'/g, "\\'");
    }

    this._AddNewElement = function (collectionName) {
        switch (collectionName) {
            case "comments_from_learner":
            case "comments_from_lms":
                return new Comments();
            case "interactions":
                return new Interaction();
            case "interactions.objectives":
                return new InteractionObjective();
            case "interactions.correct_responses":
                return new CorrectReponse();
            case "objectives":
                return new Objective();
            case "objectives.score":
                return new Score();
            case "data":
                return new ADLData();
        }
    }

    this.Commit = function (param)
    {
        _trackingManager.WriteDebugInformation("[Commit] " + param);

        this._errorCode = ErrorCode.NoError;
        if (param == "")
        {
            switch (this._state)
            {
                case CommunicationState.NotInitialized:
                    this._errorCode = ErrorCode.CommitBeforeInitialization;
                    return "false";
                case CommunicationState.Terminated:
                    this._errorCode = ErrorCode.CommitAfterTermination;
                    return "false";
                case CommunicationState.Running:
                    this._Commit();
                    return "true";
            }
        }
        else
        {
            this._errorCode = ErrorCode.ArgumentError;
        }
        return "false";
    }

    this._Commit = function ()
    {
        if (this._callCommit)
        {
            var serializedCmi = Sys.Serialization.JavaScriptSerializer.serialize(scorm2004RTE);

            // Notify listeners
            var handler = this._events.getHandler(this.GetCommitCalledEventName());
            if (handler) handler(this, "");

            // Debug mode?
            _trackingManager.WriteDebugInformation("Data about to be sent to the server: <br/>" + serializedCmi);

            // Call the web service
            if (_trackingManager.CallWebService && _trackingManager.SessionId > 0)
            {
                var data = { learnerSessionId: _trackingManager.SessionId, serializedData: serializedCmi };
                Assima.Controls.Util.Net.sendBeacon("/Services/ContentItemsTrackingService.asmx/TrackScorm2004Session", data);
            }

            this._callCommit = false;
        }
    }

    this.GetLastError = function () 
    {
        return this._errorCode;
    }

    this.GetErrorString = function (param)
    {
        if (param != "")
        {
            return SCORM2004_ErrorStrings[param];
        }
        return "";
    }

    this.GetDiagnostic = function (param) 
    {
        if (param == "")
            param = this._errorCode;

        return param;
    }
}

// Instanciate the API
// DO NOT RENAME THE VARIABLE, THIS IS PART OF THE SCORM 2004 STANDARD
var API_1484_11 = new Scorm2004API();