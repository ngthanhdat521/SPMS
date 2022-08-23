const defaultState = {
    user: {
        roleUser: [],
    },
    isLogedIn: true,
    isTopicFormSubmitted: false,
    theme: 0,

    // student dashboard
    currentDeletedItem: { topicId: "sdf" },

    //Group form storage
    group: {
        groupName: "",
        isScientificGroup: false,
        groupDesc: "",
        students: [],
    },
};

export const reducer = function (state = defaultState, action) {
    switch (action.type) {
        case "UPDATE_SESSION":
            state.isLogedIn = true;
            state.user = action.payload;
            return { ...state };
        case "UPDATE_AUTHENTICATION":
            state.isLogedIn = action.payload;
            return { ...state };
        case "CLEAR_SESSION":
            state.isLogedIn = false;
            state.user = {
                roleUser: [],
            };
            return { ...state };
        case "ACTIVE_STATUS_TOPIC_FORM":
            state.isTopicFormSubmitted = !state.isTopicFormSubmitted;
            return { ...state };
        case "RESET_STATUS_TOPIC_FORM":
            state.isTopicFormSubmitted = false;
            return { ...state };
        case "UPDATE_CURRENT_DELETED_ITEM":
            state.currentDeletedItem = action.payload;
            return { ...state };
        case "UPDATE_THEME":
            state.theme = action.payload;
            return { ...state };
        case "UPDATE_GROUP_FORM":
            state.group = action.payload;
            return { ...state };
        case "UPDATE_COUNCIL_FORM":
            state.council = action.payload;
            return { ...state };
        default:
            return state;
    }
};
