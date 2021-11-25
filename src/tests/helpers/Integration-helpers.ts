import * as express from 'express';
import app from '../../index';

export default class IntegrationHelpers {
    public static appInstance: express.Application;
    public static async getApp(): Promise<express.Application> {
        if (this.appInstance) {
            return this.appInstance;
        }
        this.appInstance = app;
        return this.appInstance;
    }
}