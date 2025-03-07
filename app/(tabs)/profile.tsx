import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { EChartsInstance } from "echarts-for-react";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, ScrollView, Alert, Touchable } from "react-native";
import ECharts from "react-native-echarts-pro";
import OutsidePressHandler from "react-native-outside-press";

const option = {
  title: {
    text: 'Stacked Area Chart'
  },
  tooltip: {
    trigger: 'axis',
    confine: true,
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985'
      }
    }
  },
  legend: {
    show: false
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: 'Email',
      type: 'line',
      smooth: true,
      stack: 'Total',
      areaStyle: {},
      emphasis: {
        focus: 'series'
      },
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: 'Union Ads',
      type: 'line',
      smooth: true,
      stack: 'Total',
      areaStyle: {},
      emphasis: {
        focus: 'series'
      },
      data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
      name: 'Video Ads',
      type: 'line',
      smooth: true,
      stack: 'Total',
      areaStyle: {},
      emphasis: {
        focus: 'series'
      },
      data: [150, 232, 201, 154, 190, 330, 410]
    },
    {
      name: 'Direct',
      type: 'line',
      smooth: true,
      stack: 'Total',
      areaStyle: {},
      emphasis: {
        focus: 'series'
      },
      data: [320, 332, 301, 334, 390, 330, 320]
    },
    {
      name: 'Search Engine',
      type: 'line',
      smooth: true,
      stack: 'Total',
      label: {
        show: true,
        position: 'top'
      },
      areaStyle: {},
      emphasis: {
        focus: 'series'
      },
      data: [820, 932, 901, 934, 1290, 1330, 1320]
    }
  ]
};


export default function ProfileScreen() {
  const chartRef = useRef<EChartsInstance>(null);
  const backgroundColor = useThemeColor({}, 'background');
  const [dynamicOption, updateOption] = useState<any>(option);

  const handleOutsideClick = () => {
    chartRef.current.getInstance('dispatchAction', { type: 'hideTip' });
    chartRef.current.getInstance('dispatchAction', { type: 'downplay' });
  }

  return (
    <ThemedView style={style.page}>
      <OutsidePressHandler
        onOutsidePress={() => handleOutsideClick()}
        style={[{ backgroundColor }, style.panel]}>
        <ThemedText id="Title" type="title" style={{ zIndex: 1 }}>Stocks</ThemedText>
        <ThemedView style={{zIndex: 2}}>
          <ECharts
            ref={chartRef}
            option={dynamicOption}
            height={300}
          />
        </ThemedView>
      </OutsidePressHandler>
    </ThemedView>
  )
}

const style = StyleSheet.create({
  page: {
    flex: 1,
    paddingTop: 30,
    paddingBottom: 50
  },
  panel: {
    width: '90%',
    backgroundColor: 'transparent',
    alignSelf: "center",
  }
})