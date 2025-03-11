import React, { useState } from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { Table, TableRow, TableCell, TableHeader } from '~/components/ui/table';
import { Text } from '~/components/ui/text';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';

const TableArrival_Departure = ({ flightSchedule }) => {
    const [activeTab, setActiveTab] = useState<'Arrival' | 'Departure'>('Arrival');
    const currentDate = new Date().toLocaleDateString('en-US');
    const currentTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    const filteredFlights = flightSchedule.map(flight => ({
        destination: flight.destination,
        flight: flight.flight,
        airline: flight.airlineName,
        time: activeTab === 'Arrival' ? `${flight.ETA_date}  ${flight.ETA_time}` : `${flight.departureDate}  ${flight.departureTime}`,
    }));

    return (
        <View className='w-full mt-2 pb-2'>
            {/* Flight Schedule Card */}
            <Card className='max-w-full bg-[#007AFF] text-white rounded-xl w-full'>
                <CardHeader className='items-center rounded-xl p-1'>
                    <CardTitle className='text-3xl font-bold text-white my-2'>{activeTab}</CardTitle>
                </CardHeader>

                <CardContent className='p-0'>
                    <ScrollView horizontal>
                        <Table className='w-full min-w-full table-fixed border-separate'>
                            <TableHeader>
                                <TableRow className='bg-[#1a8dd8]'>
                                    <TableCell className='px-4 py-2 w-1/4'>
                                        <Text className='text-white'>Destination</Text>
                                    </TableCell>
                                    <TableCell className='px-4 py-2 w-1/4'>
                                        <Text className='text-white'>Flight</Text>
                                    </TableCell>
                                    <TableCell className='px-0 py-2 w-1/4'>
                                        <Text className='text-white'>Airline</Text>
                                    </TableCell>
                                    <TableCell className='px-6 py-2 w-1/4 whitespace-nowrap truncate'>
                                        <Text className='text-white'>{activeTab === 'Arrival' ? 'ETA' : 'Departure'}</Text>
                                    </TableCell>
                                </TableRow>
                            </TableHeader>
                            {filteredFlights.map((flight, index) => (
                                <TableRow key={index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-[#d6ebfb]'}`}>
                                    <TableCell className='px-4 py-2 w-1/4'>
                                        <Text className='text-black'>{flight.destination}</Text>
                                    </TableCell>
                                    <TableCell className='px-4 py-2 w-1/4 '>
                                        <Text className='text-black'>{flight.flight}</Text>
                                    </TableCell>
                                    <TableCell className='px-0 py-2 w-1/4'>
                                        <Text className='text-black'>{flight.airline}</Text>
                                    </TableCell>
                                    <TableCell className='px-6 py-2 w-1/4 whitespace-nowrap truncate'>
                                        <Text className='text-black'>{flight.time}</Text>
                                    </TableCell>
                                </TableRow>
                            ))}
                            <TableRow>
                                <TableCell colSpan={4} className='text-right px-4 py-2'>
                                    <Text className='text-white'>
                                        Updated: {currentDate} at {currentTime}
                                    </Text>
                                </TableCell>
                            </TableRow>
                        </Table>
                    </ScrollView>
                </CardContent>
            </Card>

            {/* Tabs Section (Moved Outside the Card) */}
            <View className='flex-row justify-center mt-2 mb-4 p-2 bg-[#007AFF] rounded-lg w-full gap-x-4 '>
                <TouchableOpacity
                    onPress={() => setActiveTab('Arrival')}
                    className={`flex-1 px-6 py-3 rounded-lg ${activeTab === 'Arrival' ? 'bg-white' : 'bg-[#007AFF]'}`}
                >
                    <Text className={`text-lg font-bold text-center ${activeTab === 'Arrival' ? 'text-[#007AFF]' : 'text-white'}`}>Arrival</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setActiveTab('Departure')}
                    className={`flex-1 px-6 py-3 rounded-lg ${activeTab === 'Departure' ? 'bg-white' : 'bg-[#007AFF]'}`}
                >
                    <Text className={`text-lg font-bold text-center ${activeTab === 'Departure' ? 'text-[#007AFF]' : 'text-white'}`}>Departure</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default TableArrival_Departure;
