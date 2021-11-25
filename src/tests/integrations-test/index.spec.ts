import 'jest';
import * as express from 'express';
import request from 'supertest';
import {
    StatusCodes,
} from 'http-status-codes';

import IntegrationHelpers from '../helpers/Integration-helpers';
import { IDeck } from '../../services/deck';

describe('status integration tests', () => {
    let app: express.Application
    let deck: IDeck
    
    beforeAll(async() => {
        app = await IntegrationHelpers.getApp();
    });

    let mock_deck = {
        deck_type: "FULL",
        shuffled: false,
        remaining: 52
    }

    it('can hello message from main endpoint', async () => {
        await request(app)
            .get('/')
            // .set('Accept', 'application/json')
            .expect((res: request.Response) => {
                // eslint-disable-next-line no-console
                return res.text == "hello";
            })
            .expect(StatusCodes.OK);
    });
    // it('can get server time', async () => {
    //     await request(app)
    //         .get('/api/status/time')
    //         .set('Accept', 'application/json')
    //         .expect((res: request.Response) => {
    //             // eslint-disable-next-line no-console
    //             console.log(res.text);
    //         })
    //         .expect(StatusCodes.OK);
    // });
    it('CREATE a FULL card', async () => {
        await request(app)
            .get('/deck')
            .set('Accept', 'application/json')
            .expect(StatusCodes.OK)
            .expect((res: request.Response) => {
                deck = JSON.parse(res.text)
            })
    });
    it('OPEN a FULL card', async () => {
        await request(app)
            .get('/deck/' + deck.deck_id)
            .set('Accept', 'application/json')
            .expect(StatusCodes.OK)
            .expect((res: request.Response) => {
                deck = JSON.parse(res.text)
            })
    });
    it('DRAW a card from deck', async () => {
        await request(app)
            .get('/deck/' + deck.deck_id + '/1')
            .set('Accept', 'application/json')
            .expect(StatusCodes.OK)
            .expect((res: request.Response) => {
                deck = JSON.parse(res.text)
            })
    });
    // it('can get server system usage', async () => {
    //     await request(app)
    //         .get('/api/status/usage')
    //         .set('Accept', 'application/json')
    //         .expect(StatusCodes.OK);
    // });
    // it('can get server system process info', async () => {
    //     await request(app)
    //         .get('/api/status/process')
    //         .set('Accept', 'application/json')
    //         .expect(StatusCodes.OK);
    // });
    // it('should get the error', async () => {
    //     await request(app)
    //         .get('/api/status/error')
    //         .set('Accept', 'application/json')
    //         .expect(StatusCodes.BAD_REQUEST);
    // });
});