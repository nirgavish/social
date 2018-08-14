export const Config = {
    // TODO: Change to env file

    /*
    When set to true, content is available only to logged-in users
    */
    // TODO: Implement walledGarden middleware, still buggy
    walledGarden: false,

    /*
    When set to false, only admins can add new users
    */
    // TODO: Implement usersMayRegister
    usersMayRegister: true,

    /*
    if no S3 credentials are present, local file system is used
    */
    // TODO: Implement S3 and filesystem
    S3Credentials: {},

    /*
    When set to false, only admins can start a group
    */
    // TODO: Implement usersMayStartGroups
    usersMayStartGroups: true,

    /*
    */
}
