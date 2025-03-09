import * as React from 'react';
import { View } from 'react-native';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Text } from '~/components/ui/text';

export default function ForgotPasswordScreen() {
    const [email, setEmail] = React.useState('');

    const handleForgotPassword = () => {
        console.log('forgot password', email);
    };

    return (
        <View className='p-5'>
            <Text className='text-4xl font-bold mb-2'>Forgot Password</Text>
            <Input placeholder='Email Address' value={email} onChangeText={setEmail} className='mb-5' />
            <Button onPress={handleForgotPassword}>
                <Text className='text-lg font-semibold'>Reset Password</Text>
            </Button>
        </View>
    );
}
