import { remoteConfig } from '..';

export const expressUrl =
    window.location.hostname === 'localhost'
        ? 'http://localhost:5001/charitydiscount-test/europe-west1/manage/'
        : remoteConfig.getString('express_url');
