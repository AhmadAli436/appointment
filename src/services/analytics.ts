
export interface ChartData {
    month: string;
    meetings: number;
    duration: number;
}

export interface TopPerformer {
    name: string;
    meetings: number;
    acceptanceRate: string;
    imageUrl: string;
}

export interface AnalyticsData {
    chartData: ChartData[];
    topPerformers: TopPerformer[];
}

const generateChartData = (): ChartData[] => {
    const months = ["January", "February", "March", "April", "May", "June"];
    return months.map(month => ({
        month,
        meetings: Math.floor(Math.random() * (350 - 50 + 1)) + 50,
        duration: Math.floor(Math.random() * (250 - 50 + 1)) + 50,
    }));
}

const generateTopPerformers = (): TopPerformer[] => {
    const names = ["Maria Garcia", "Alex Johnson", "David Smith", "Sarah Lee", "Tom Wilson"];
    return names.map(name => ({
        name,
        meetings: Math.floor(Math.random() * (100 - 40 + 1)) + 40,
        acceptanceRate: `${Math.floor(Math.random() * (98 - 85 + 1)) + 85}%`,
        imageUrl: `https://placehold.co/40x40.png`,
    })).sort((a,b) => b.meetings - a.meetings);
}

/**
 * Gets analytics data.
 * In a real application, this would query a database.
 */
export async function getAnalyticsData(): Promise<AnalyticsData> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    chartData: generateChartData(),
    topPerformers: generateTopPerformers(),
  };
}
