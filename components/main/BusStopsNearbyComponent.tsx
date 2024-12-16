import React from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import GetNearbyBusStops from '../getNearbyBusStops';
import BusStopComponent from './BusStopComponent'

const BusStopsNearbyComponent = () => {
  const [busStops, setBusStops] = React.useState<{
    label: string; code: string; distance: number, detail: string
}[]>([]);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  React.useEffect(() => {
    (async () => {
      try {
        const nearbyBusStops = await GetNearbyBusStops();
        const sortedStops = Object.entries(nearbyBusStops)
        .map(([code, [label, detail, distance]]) => ({ code, label, detail, distance }))
        .sort((a, b) => a.distance - b.distance);


        setBusStops(sortedStops);
      } catch (error) {
        if (error instanceof Error) {
          console.error('Failed to get nearby bus stops:', error.message);
          setErrorMsg(error.message);
        } else {
          console.error('An unknown error occurred:', error);
          setErrorMsg('An unknown error occurred.');
        }
      }
    })();
  }, []);

  if (errorMsg) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>{errorMsg}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {busStops.length > 0 ? (
        <FlatList
          data={busStops}
          keyExtractor={(item) => item.code}
          renderItem={({ item }) => (
            <View>
                <BusStopComponent BusStopCode={item.code} Distance={item.distance.toFixed(0)} Description={item.label} RoadName={item.detail}/>
            </View>
          )}
        />
      ) : (
        <Text style={styles.messageText}>No nearby bus stops found.</Text>
      
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // width: '100%', dk if need
    backgroundColor: 'blue',
    alignItems: 'center'
  },


  // ONLY WHEN ERROR
  errorText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  messageText: {
    fontSize: 16,
    color: 'gray',
  },
});

export default BusStopsNearbyComponent;
