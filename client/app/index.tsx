import React from 'react';
import { View, ScrollView } from 'react-native';
import MyFlightCard from '~/components/MyFlightCard';
import TableArrival_Departure from '~/components/TableArrival_Departure';
import { flightSchedule } from '~/sampleData';

export default function Screen() {
    return (
        <View className='flex-1 w-full bg-secondary/30'>
            <ScrollView contentContainerStyle={{ paddingHorizontal: 8 }} showsVerticalScrollIndicator={false}>
                <View className='w-full max-w-screen  '>
                    <MyFlightCard flightSchedule={flightSchedule} />
                    <TableArrival_Departure flightSchedule={flightSchedule} />
                </View>
            </ScrollView>
        </View>
    );
}
