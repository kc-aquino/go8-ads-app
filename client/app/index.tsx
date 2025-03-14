import React, { useEffect, useState } from 'react';
import { View, ScrollView, Image, Dimensions } from 'react-native';
import MyFlightCard from '~/components/MyFlightCard';
import TableArrival_Departure from '~/components/TableArrival_Departure';
import { flightSchedule } from '~/sampleData';
import { useColorScheme } from '~/lib/useColorScheme';
import { AnnouncementComponent } from '~/components/AnnouncementComponent';
import { getUserData } from '~/lib/controllers/fetchers';

export default function Screen() {
    const colorScheme = useColorScheme().colorScheme;
    const { width } = Dimensions.get('window');
    const bannerAd = '~/assets/images/ads/pluswidth_banner_ad_1.png';
    const popupAd = '~/assets/images/ads/BurgerKing_ad_2.png';

    const [userData, setUserData] = React.useState<any>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const data = await getUserData();
            setUserData(data);
            console.log(data);
        };

        fetchUserData();
    }, []);

    return (
        <View className='flex-1 w-full bg-secondary/30 '>
            <ScrollView contentContainerStyle={{ paddingHorizontal: 8, paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
                <View className='w-full max-w-screen'>
                    <AnnouncementComponent />
                    <MyFlightCard flightSchedule={flightSchedule} userData={userData} />
                    <TableArrival_Departure flightSchedule={flightSchedule} />
                </View>
            </ScrollView>

            {/* Sticky Banner */}
            <View className='absolute bottom-0 w-full'>
                <Image source={require(bannerAd)} style={{ width: width, height: width * 0.3, resizeMode: 'stretch' }} />
            </View>
        </View>
    );
}
