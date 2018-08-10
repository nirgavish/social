declare module "*.json" {
    const value: any;
    export default value;
}

declare namespace Express {
    export interface Request {
        user: any;
    }
}
