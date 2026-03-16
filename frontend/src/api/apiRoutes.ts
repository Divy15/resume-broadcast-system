
export const ApiRoutes = {
    "hrmanagement": {
        "dashboardSummary" : "/hr/management/dashboard/summary",
        "storeHRInfo" : "/hr/management/store/hr/info",
        "positionList" : "/hr/management/position/list",
        "hrInfoList" : "/hr/management/hr/information/list",
        "templateList" : "/hr/management/template/list",
        "selectedHRInfoList" : "/hr/management/selected/hr/information/list",
        "storeTemplateSelection" : "/hr/management/store/template/selection"
    },

    "emailJob" : {
        "getJobList": "/emailjob/job/list",
        "getJobInfo": "/emailjob/job/info",
    },

    "auth": {
        "storeUserData": "/auth/store/user/data",
        "loginUserData": "/auth/login/user/data"
    },

    "templateConfig":{
        "storeTemplateConfig": "/template/config/store/template",
        "filterTemplateList": "/template/config/filtered/list",
        "templateList" : "/template/config/list",
        "getTemplateInfo": "/template/config/template/info",
        "deleteTemplate": "/template/config/delete/template",
        "updateTemplate": "/template/config/update/template/info"
    }
    
};