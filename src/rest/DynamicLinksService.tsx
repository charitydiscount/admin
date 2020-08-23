import { remoteConfig } from "../index";
import axios from "axios";

export const buildDynamicLink = async (
    programName: string,
    logoPath: string
): Promise<string> => {

    const targetBase =
        remoteConfig.getString('dynamic_link_target') ||
        'https://charitydiscount.ro';

    const response = await axios.post(
        `https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=${process.env.REACT_APP_FB_API_KEY}`,
        {
            dynamicLinkInfo: {
                domainUriPrefix: remoteConfig.getString('dynamic_link_prefix'),
                link: `${targetBase}/shop/` + programName,
                androidInfo: {
                    androidPackageName: 'com.clover.charity_discount',
                    androidMinPackageVersionCode: '500',
                },
                iosInfo: {
                    iosBundleId: 'com.clover.CharityDiscount',
                    iosAppStoreId: '1492115913',
                    iosMinimumVersion: '500',
                },
                analyticsInfo: {
                    googlePlayAnalytics: {
                        utmCampaign: 'shops',
                        utmMedium: 'social',
                        utmSource: 'mobile',
                    },
                },
                socialMetaTagInfo: {
                    socialTitle: programName,
                    socialDescription: 'CharityDiscount',
                    socialImageLink: logoPath,
                },
            },
        },
        {
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );

    return response.data.shortLink;
};