import React from 'react';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import messageCountList from '../utils/messageCountList.json';
import engagementHelper from "../utils/engagementHelper";
import channels from '../utils/channels.json';


function EngagementMessagesOverTime() {
    const options = engagementHelper.engagementMessageOverTimeChartOptions(messageCountList, channels)
  return (
    <HighchartsReact highcharts={Highcharts} options={options} />
  )
}

export default EngagementMessagesOverTime