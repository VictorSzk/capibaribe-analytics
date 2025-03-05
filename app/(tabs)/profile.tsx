import { StyleSheet, Text, View, ScrollView } from "react-native";
import { LineChart } from "react-native-gifted-charts";


const lineData = [
  { value: 0, dataPointText: '0' },
  { value: 20, dataPointText: '20' },
  { value: 18, dataPointText: '18' },
  { value: 40, dataPointText: '40' },
  { value: 36, dataPointText: '36' },
  { value: 60, dataPointText: '60' },
  { value: 54, dataPointText: '54' },
  { value: 85, dataPointText: '85' }
];

export default function ProfileScreen() {

  return (
    <View style={style.page}>
      <View style={{backgroundColor: 'blue'}}>
      <LineChart
        initialSpacing={0}
        data={lineData}
        isAnimated
        spacing={30}
        textColor1="yellow"
        textShiftY={-8}
        textShiftX={-10}
        textFontSize={13}
        thickness={5}
        hideRules
        hideYAxisText
        yAxisColor="#0BA5A4"
        showVerticalLines
        verticalLinesColor="rgba(14,164,164,0.5)"
        xAxisColor="#0BA5A4"
        color="#0BA5A4"
      />
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  page: {
    height: '100%',
    width: '100%'
  },
})