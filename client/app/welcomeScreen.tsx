import * as React from 'react';
import { View } from 'react-native';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';

export default function WelcomeScreen( { navigation }: any ) {
  return (
    <View className="flex-1 justify-center items-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Welcome</CardTitle>
        </CardHeader>
        <CardContent>
          <Text className="mb-4">
            Welcome to the app! Please explore our features and enjoy your stay.
          </Text>
          <Button title="Get Started" onPress={() => console.log('Get Started pressed')} />
        </CardContent>
      </Card>
    </View>
  );
}
