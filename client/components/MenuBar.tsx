import React from 'react';
import { View, Pressable } from 'react-native';
import { useNavigation } from 'expo-router';
import { Menubar, MenubarContent, MenubarItem, MenubarTrigger } from '~/components/ui/menubar';
import { Menu } from 'lucide-react-native';
import { Text } from '~/components/ui/text';

export function MenuBar() {
    const navigation = useNavigation();

    return (
        <View className='flex-row items-center gap-2 pr-2'>
            <Menu size={24} strokeWidth={1.5} color='black' onPress={() => console.log('U i a i i i ea o i')} className='text-foreground' />
        </View>
    );
}
