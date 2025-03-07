import React, { useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

interface EChartsWebViewProps {
  option: any;
  onMessage?: (event: any) => void;
  width?: number | string;
  height?: number | string;
}

const CandleStick: React.FC<EChartsWebViewProps> = ({
  option,
  onMessage,
  width = '100%',
  height = 300,
}: EChartsWebViewProps) => {
  const webViewRef = useRef<WebView>(null);
  const [isWebViewReady, setIsWebViewReady] = useState(false);

  // HTML content with ECharts
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
        <style>
          body {
            margin: 0;
            padding: 0;
            overflow: hidden;
          }
          #chart {
            width: 100%;
            height: 100vh;
          }
        </style>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/echarts/5.4.0/echarts.min.js"></script>
      </head>
      <body>
        <div id="chart"></div>
        <script>
          // Initialize the chart
          const chart = echarts.init(document.getElementById('chart'));
          
          // Handle resize events
          window.addEventListener('resize', function() {
            chart.resize();
          });
          
          // Handle messages from React Native
          window.addEventListener('message', function(event) {
            const data = JSON.parse(event.data);
            if (data.type === 'setOption') {
              chart.setOption(data.payload);
            } else if (data.type === 'resize') {
              chart.resize();
            }
          });
          
          // Add click event listener
          chart.on('click', function(params) {
            window.ReactNativeWebView.postMessage(JSON.stringify({
              type: 'click',
              payload: params
            }));
          });
          
          // Notify React Native that the chart is ready
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: 'chartReady'
          }));
        </script>
      </body>
    </html>
  `;

  // Handle messages from WebView
  const handleMessage = (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.type === 'chartReady') {
        setIsWebViewReady(true);
      } else if (onMessage) {
        onMessage(data);
      }
    } catch (error) {
      console.error('Error parsing WebView message:', error);
    }
  };

  // Send option to WebView
  React.useEffect(() => {
    if (isWebViewReady && webViewRef.current) {
      webViewRef.current.postMessage(JSON.stringify({
        type: 'setOption',
        payload: option
      }));
    }
  }, [option, isWebViewReady]);

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        source={{ html: htmlContent }}
        onMessage={handleMessage}
        originWhitelist={['*']}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        scrollEnabled={false}
        bounces={false}
        style={styles.webview}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  webview: {
    flex: 1,
  },
});

export default CandleStick;