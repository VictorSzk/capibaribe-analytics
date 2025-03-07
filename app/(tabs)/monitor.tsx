import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText';
import { LineChart } from 'react-native-gifted-charts';

const lineData = [{value: 0},{value: 10},{value: 8},{value: 58},{value: 56},{value: 78},{value: 74},{value: 98}];
const lineData2 = [{value: 0},{value: 20},{value: 18},{value: 40},{value: 36},{value: 60},{value: 54},{value: 85}];
    

const MonitorScreen = () => {
  return (
    <ThemedView style={styles.page}>
      <ThemedView style={styles.panel}>
        <ThemedText type="title">Stocks</ThemedText>
        <LineChart
            areaChart
            curved
            data={lineData}
            data2={lineData2}
            height={250}
            showVerticalLines
            spacing={44}
            initialSpacing={0}
            color1="skyblue"
            color2="orange"
            textColor1="green"
            hideDataPoints
            dataPointsColor1="blue"
            dataPointsColor2="red"
            startFillColor1="skyblue"
            startFillColor2="orange"
            intersectionAreaConfig={{fillColor: 'black'}}
            startOpacity1={0.5}
            endOpacity1={0}
            startOpacity2={0}
            endOpacity2={0}
            />
      </ThemedView>
    </ThemedView>
  )
}



const styles = StyleSheet.create({
  page: {
    flex: 1,
    paddingTop: 30,
    paddingBottom: 50
  },
  panel: {
    flex: 1,
    width: '90%'
  }
})

export default MonitorScreen