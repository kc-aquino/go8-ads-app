import * as React from 'react';
import { Image, View, StatusBar, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Text } from '~/components/ui/text';
import { Separator } from '~/components/ui/separator';
import { Eye, EyeOff, Apple, Facebook } from 'lucide-react-native';
import { login } from '~/lib/controllers/login_controller';
import { getUserRole, getUserData } from '~/lib/controllers/fetchers';
import { useColorScheme } from '~/lib/useColorScheme';

export default function Login() {
    const navigation = useNavigation();
    const [emailAddress, setEmailAddress] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [showPassword, setShowPassword] = React.useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const handleLogin = async () => {
        try {
            await login(emailAddress, password);
            const role = await getUserRole();
            const user = await getUserData();
            if (role === 'admin') {
                Alert.alert('This app is for users only. Please use the web app for admin access.');
            } else {
                Alert.alert(`Welcome: ${user.name}`);
                navigation.navigate('Landing');
            }
        } catch (error) {
            Alert.alert('Login Error', error.message.toString());
            console.error('Login error:', error);
        }
    };

    return (
        <View className='p-5'>
            <StatusBar hidden style='auto' />
            <Image source={useColorScheme().colorScheme === 'dark'
                 ? require('../assets/images/logo-adSpaceLight.png')
                 : require('../assets/images/logo-adSpaceDark.png')
            }
                className='w-full h-40 self-center mt-20 mb-10' 
            />
            <Text className='text-4xl font-bold mb-2'>Welcome!</Text>
            <View className='flex flex-col gap-5 mt-5 '>
            <Input
                placeholder='Email Address'
                value={emailAddress}
                onChangeText={setEmailAddress}
                keyboardType='email-address'
                autoCapitalize='none'
            />
            <View className='relative flex flex-row items-center gap-2'>
                <Input
                placeholder='Password'
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                className='flex-1 pr-10 h-10'
                />
                <Button
                variant='ghost'
                size='icon'
                style={{ position: 'absolute', right: 8, top: '50%', transform: [{ translateY: '-50%' }] }}
                onPress={togglePasswordVisibility}
                >
                {showPassword ? <Eye size={20} color='black' /> : <EyeOff size={20} color='black' />}
                </Button>
            </View>
            

            <Button variant='default' size='default' onPress={handleLogin}>
                <Text>Login</Text>
            </Button>

            <Separator className='mt-10' />
            <Text className='text-sm text-center text-gray-400 font-semibold'>Or continue with</Text>
            <View className='flex flex-row gap-5 justify-center '>
                <Button variant='default' size='icon' className='rounded-full bg-red-600'>
                <Text>G</Text>
                </Button>
                <Button variant='default' size='icon' className='rounded-full bg-black'>
                <Apple size={15} color='white' />
                </Button>
                <Button variant='default' size='icon' className='rounded-full'>
                <Facebook size={16} color='white' />
                </Button>
            </View>
            </View>
        </View>
    );
}
