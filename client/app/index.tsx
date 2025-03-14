import React, { useEffect, useState } from 'react';
import { View, ScrollView, Dimensions, Text, ActivityIndicator } from 'react-native';
import { Image } from 'expo-image';
import TableArrival_Departure from '~/components/TableArrival_Departure';
import { flightSchedule } from '~/sampleData';
import MyFlightCard from '~/components/MyFlightCard';
import { useColorScheme } from '~/lib/useColorScheme';
import { AnnouncementComponent } from '~/components/AnnouncementComponent';
import { getUserData, getAdsData } from '~/lib/controllers/fetchers';

export default function Screen() {
    const colorScheme = useColorScheme().colorScheme;
    const { width } = Dimensions.get('window');
    const defaultBannerAd = '~/assets/images/ads/GO8_Default_Horizontal.gif';
    const defaultPopupAd = '~/assets/images/ads/GO8_Default_Vertical.gif';

    const [userData, setUserData] = React.useState<any>(null);
    const [adsData, setAdsData] = React.useState<any>(null);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);

    useEffect(() => {
        const fetchUserData = async () => {
            const data = await getUserData();
            setUserData(data);
        };

        const fetchAdsData = async () => {
            const data = await getAdsData();
            setAdsData(data);
            console.log('Ads: ', data);
        };

        fetchUserData();
        fetchAdsData();
    }, []);

    // Find the ad with the slot equal to 'Bottom'
    const bottomAd = adsData?.find((ad: any) => ad.slot === 'Bottom');

    // Construct the full URL for the GIF
    const gifUrl = bottomAd ? 'http://152.42.176.184' + bottomAd.mediaUrl : null;

    return (
        <View className='flex-1 w-full bg-secondary/30 '>
            <ScrollView contentContainerStyle={{ paddingHorizontal: 8, paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
                <View className='w-full max-w-screen'>
                    <AnnouncementComponent />
                    <MyFlightCard flightSchedule={flightSchedule} userData={userData} adsData={adsData} />
                    <TableArrival_Departure flightSchedule={flightSchedule} />
                </View>
            </ScrollView>

            {/* Sticky Banner */}
            {bottomAd ? (
                <View className='absolute bottom-0 w-full'>
                    {isLoading && <ActivityIndicator size='small' color='#0000ff' />}
                    <Image
                        source={{ uri: gifUrl || defaultBannerAd }}
                        style={{ width: width, height: width * 0.25, resizeMode: 'stretch' }}
                        onLoad={() => setIsLoading(false)}
                        onError={e => {
                            console.log('Failed to load image:', e);
                            setIsLoading(false);
                        }}
                    />
                </View>
            ) : (
                <View className='absolute bottom-0 w-full'>
                    <Image source={require(defaultBannerAd)} style={{ width: width, height: width * 0.2, resizeMode: 'stretch' }} />
                </View>
            )}
        </View>
    );
}
