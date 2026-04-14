
export const ApiRoutes = {
    "hrmanagement": {
        "dashboardSummary" : "/hr/management/dashboard/summary",
        "storeHRInfo" : "/hr/management/store/hr/info",
        "positionList" : "/hr/management/position/list",
        "hrInfoList" : "/hr/management/hr/information/list",
        "templateList" : "/hr/management/template/list",
        "selectedHRInfoList" : "/hr/management/selected/hr/information/list",
        "storeTemplateSelection" : "/hr/management/store/template/selection",
        "storeResume": "/hr/management/upload-resume",
        "getResumeList": "/hr/management/resume/list",
        "getHRDetails": "/hr/management/hr/details",
        "deleteHRDetails": "/hr/management/delete/hr/details",
        "updateHRDetails": "/hr/management/update/hr/details",
    },

    "emailJob" : {
        "getJobList": "/emailjob/job/list",
        "getJobInfo": "/emailjob/job/info",
    },

    "auth": {
        "storeUserData": "/auth/store/user/data",
        "loginUserData": "/auth/login/user/data",
        "authRedirection": "/auth/user/redirection"
    },

    "templateConfig":{
        "storeTemplateConfig": "/template/config/store/template",
        "filterTemplateList": "/template/config/filtered/list",
        "templateList" : "/template/config/list",
        "getTemplateInfo": "/template/config/template/info",
        "deleteTemplate": "/template/config/delete/template",
        "updateTemplate": "/template/config/update/template/info"
    },

    "appPasswordConfig": {
        "storeConfig": "/app/password/store/app/password/config",
        "getConfig": "/app/password/get/app/config"
    },

    "dashboardConfig": {
        "hrRegistrationBarChart": "/dashboard/hr/registration/bar/chart",
        "companyRegistrationBarChart": "/dashboard/company/registration/bar/chart",
        "totalCounts": "/dashboard/total/counts"
    },

    "profile": {
        "getProfileDetails": "/profile/get/profile/details",
        "updateProfileDetails": "/profile/update/profile/details",
        "updateProfilePassword": "/profile/update/profile/password"
    }
    
};