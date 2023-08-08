import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import messageCountList from "../data/messageCountList.json";
import engagementHelper from "../utils/engagementHelper";
import channels from "../data/channels.json";

function EngagementMessagesOverTime() {
  const options = engagementHelper.engagementMessageOverTimeChartOptions(
    messageCountList,
    channels
  );
  return <HighchartsReact highcharts={Highcharts} options={options} />;
}

export default EngagementMessagesOverTime;
