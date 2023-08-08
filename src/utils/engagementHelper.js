// engagementHelper.js

import moment from "moment";

const engagementHelper = {};

engagementHelper.getChannelsWithMessagesOnMultipleDates = (
  messageCountList
) => {
  const channelCountMap = new Map();

  // Count the number of unique dates each channel has messages on
  for (const entry of messageCountList) {
    const channelId = entry.channelId;
    const timeBucket = entry.timeBucket.split("T")[0]; // Extract date part
    if (channelCountMap.has(channelId)) {
      channelCountMap.get(channelId).add(timeBucket); // if channelId found in channelCountMap, add timeBucket to the timeBucket Set.
    } else {
      channelCountMap.set(channelId, new Set([timeBucket])); // if channelId not in channelCountMap, add channelId with new Set for storing timeStamp
    }
  }

  // Filter channels with messages on more than one date
  const channelsWithMessagesOnMultipleDates = [];
  for (const [channelId, dateSet] of channelCountMap) {
    if (dateSet.size > 1) {
      // dateSet have more than 1 values push that channelId in channelsWithMessagesOnMultipleDates
      channelsWithMessagesOnMultipleDates.push(channelId);
    }
  }

  return channelsWithMessagesOnMultipleDates;
};

engagementHelper.engagementMessageOverTimeChartOptions = (
  messageCountList,
  channels
) => {
  const channelsWithMessagesOnMultipleDates =
    engagementHelper.getChannelsWithMessagesOnMultipleDates(messageCountList);

  // Filter the messageCountList to include only channels with messages on multiple dates
  const filteredMessageCountList = messageCountList.filter((entry) =>
    channelsWithMessagesOnMultipleDates.includes(entry.channelId)
  );

  // Generate the options for the chart
  const chartOptions = {
    chart: {
      type: "line",
      height: 400,
    },
    title: {
      text: "Engagement Message Over Time",
    },
    xAxis: {
      type: "datetime",
    },
    yAxis: {
      title: {
        text: "Message Count",
      },
    },
    tooltip: {
      formatter: function () {
        return `
          <b>${this.series.name}</b><br>
          ${this.y} messages on ${moment(this.x).format("D MMM")}<br>
           
        `;
      },
    },
    series: [],
  };

  // Add datasets for each channel with messages on multiple dates
  for (const channel of channels) {
    if (channelsWithMessagesOnMultipleDates.includes(channel.value)) {
      const channelData = filteredMessageCountList.filter(
        (entry) => entry.channelId === channel.value
      );
      const messageCounts = channelData.map((entry) => ({
        x: new Date(entry.timeBucket).getTime(),
        y: parseInt(entry.count),
      }));
      const dataset = {
        name: channel.name,
        data: messageCounts,
        marker: {
          enabled: true,
          radius: 4,
        },
      };
      chartOptions.series.push(dataset);
    }
  }

  return chartOptions;
};

export default engagementHelper;
