export const SET_PROJECT = (project) => {
    return{
       type: "SET_PROJECT",
       project: project,

    };
};

export const SET_PROJECT_NULL = () => {
    return{
        type: "SET_PROJECT_NULL",
    }
}